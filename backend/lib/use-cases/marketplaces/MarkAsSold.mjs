import crypto from 'crypto';
import Base from '../../use-cases/Base.mjs';
import Product from '../../domain-model/Product.mjs';
import Statistic from '../../domain-model/Statistic.mjs';
import Currency from '../../domain-model/Currency.mjs';
import Source from '../../domain-model/Source.mjs';
import Detail from '../../domain-model/Detail.mjs';

export default class MarkAsSold extends Base {
    async validate(data = {}) {
        const rules = {
            advert : [ 'required' ],
            cnt    : [ 'integer' ]
        };

        return this.doValidation(data, rules);
    }

    async execute({
        advert,
        cnt
    }) {
        const product = await Product.findOne({
            where : {
                title  : advert.title,
                userId : this.context.userId
            },
            include : [ Statistic ]
        });

        const productId = product?.id || crypto.randomUUID();

        if (product) {
            await product.update({
                count : product.count + cnt
            });

            await Statistic.update({
                advert_views    : product.Statistic.advert_views + (advert.statistics.advert_views - product.Statistic.advert_views),
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
                    id          : productId,
                    title       : advert.title,
                    description : advert.description,
                    image       : advert.image,
                    price       : advert.price,
                    status      : 'SOLD',
                    sourceId    : source.id,
                    currencyId  : currency.id,
                    count       : cnt,
                    userId      : this.context.userId
                }
            }, {
                include : [ {
                    model : Product
                } ]
            });
        }

        await Detail.create({
            productId,
            count : cnt
        });


        return {
            data : {
                status : 1
            }
        };
    }
}
