import crypto from 'crypto';
import fetch from 'node-fetch';
import Base from '../../use-cases/Base.mjs';
import { dumpAdvert } from '../../utils/dumps.mjs';
import Product from '../../domain-model/Product.mjs';
import Statistic from '../../domain-model/Statistic.mjs';
import Currency from '../../domain-model/Currency.mjs';
import Source from '../../domain-model/Source.mjs';
import Detail from "../../domain-model/Detail.mjs";

export default class MarkAsSold extends Base {
    async validate(data = {}) {
        const rules = {
            olx_access_token : [ 'string' ],
            ria_access_token : [ 'string' ],
            advert           : [ 'required' ],
            ria_user_id      : [ 'string' ],
            cnt              : [ 'integer' ]
        };

        return this.doValidation(data, rules);
    }

    async execute({
        advert,
        cnt,
        olx_access_token,
        ria_access_token,
        ria_user_id
    }) {
        if (advert.source === 'OLX') {
            const product = await Product.findOne({
                where : {
                    title : advert.title
                },
                include : [ Statistic ]
            });

            const productId = product?.id || crypto.randomUUID();

            if (product) {
                await product.update({
                    count     : product.count + cnt
                });

                await Statistic.update({
                    advert_views    : 100,
                    phone_views     : product.Statistic.phone_views + (advert.statistics.phone_views - product.Statistic.phone_views),
                    users_observing : product.Statistic.users_observing + (advert.statistics.users_observing - product.Statistic.users_observing)

                }, {
                    where : {
                        productId : product.id
                    }
                });
            } else {
                const source = await Source.findOne({ where: { source: advert.source } });
                const currency = await Currency.findOne({ where: { currency: advert.currency } });

                await Statistic.create({
                    ...advert.statistics,
                    Product : {
                        id: productId,
                        title       : advert.title,
                        description : advert.description,
                        image       : advert.image,
                        price       : advert.price,
                        status      : 'SOLD',
                        sourceId    : source.id,
                        currencyId  : currency.id,
                        count       : cnt
                    }
                }, {
                    include : [ {
                        model : Product
                    } ]
                });
            }

            await Detail.create({
                productId: productId,
                count: cnt
            })
        }

        return {
            data : {
                status : 1
            }
        };
    }
}
