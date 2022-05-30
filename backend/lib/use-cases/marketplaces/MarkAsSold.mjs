import fetch from 'node-fetch';
import Base from '../../use-cases/Base.mjs';
import { dumpAdvert } from '../../utils/dumps.mjs';
import Product from '../../domain-model/Product.mjs';
import Statistic from '../../domain-model/Statistic.mjs';
import Currency from '../../domain-model/Currency.mjs';
import Source from '../../domain-model/Source.mjs';

export default class MarkAsSold extends Base {
    async validate(data = {}) {
        const rules = {
            olx_access_token : [ 'string' ],
            ria_access_token : [ 'string' ],
            advert           : [ 'required' ],
            ria_user_id      : [ 'string' ]
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
            console.log(advert);
            const product = await Product.findOne({
                where : {
                    title : advert.title
                }
            });

            if (!product) {
                console.log(advert.source);
                const source = await Source.findOne({ where: { source: advert.source } });
                const currency = await Currency.findOne({ where: { currency: advert.currency } });

                // console.log(currency)
                await Product.create({
                    title       : advert.title,
                    description : advert.description,
                    image       : advert.image,
                    price       : advert.price,
                    status      : 'SOLD',
                    sourceId    : source.id,
                    currencyId  : currency.id,

                    Statistic : {
                        ...advert.statistics
                    }
                }, {
                    include : [ {
                        model : Statistic
                    } ]
                });
            }
        }

        return {
            data : {
                status : 1
            }
        };
    }
}
