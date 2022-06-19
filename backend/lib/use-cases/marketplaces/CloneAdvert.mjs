import fetch from 'node-fetch';
import Base from '../../use-cases/Base.mjs';
import { dumpAdvert } from '../../utils/dumps.mjs';

export default class CloneAdvert extends Base {
    async validate(data = {}) {
        const rules = {
            olx_access_token : [ 'string' ],
            ria_access_token : [ 'string' ],
            advert           : [ 'required' ],
            ria_user_id      : [ 'string' ],
            cnt              : [ 'required', 'integer' ]
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
            const sourceData = {
                title           : advert.title,
                description     : advert.description,
                category_id     : advert.sourceData.category_id,
                advertiser_type : advert.sourceData.advertiser_type,
                contact         : advert.sourceData.contact,
                location        : advert.sourceData.location,
                images          : advert.sourceData.images,
                price           : advert.sourceData.price,
                attributes      : advert.sourceData.attributes?.map(el => {
                    delete el.values;

                    return el;
                })
            };

            for (let i = 1; i <= cnt; i++) {
                sourceData.description = `${advert.description} ${i}`;

                console.log(sourceData);
                try {
                    const res = await fetch('https://www.olx.ua/api/partner/adverts', {
                        method  : 'POST',
                        headers : {
                            'Content-Type'  : 'application/json',
                            'Authorization' : `Bearer ${olx_access_token}`,
                            'Version'       : '2.0'
                        },
                        body : JSON.stringify(sourceData)
                    });

                    const x = await res.json();

                } catch (e) {
                    console.log(e);
                    console.log(e?.error?.validation);
                    throw e;
                }
            }
        }

        return {
            data : {
                status : 1
            }
        };
    }
}
