import Base from '../../use-cases/Base.mjs';
import {dumpAdvert} from "../../utils/dumps.mjs";

export default class GetAdverts extends Base {
    async validate(data = {}) {
        const rules = {
            olx_access_token    : [ 'string' ],
            olxEnabled          : [ 'required', 'boolean' ]
        };

        return this.doValidation(data, rules);
    }

    async execute({olxEnabled, olx_access_token}) {
        let adverts = [];
        if (olxEnabled) {
            try {
                const response = await fetch ('https://www.olx.ua/api/partner/adverts', {
                    method  : 'GET',
                    headers : {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${olx_access_token}`,
                        'Version': '2.0'
                    }
                });

                const olxAdverts = await response.json();

                for (const advert of olxAdverts.data) {
                    const res = await fetch (`https://www.olx.ua/api/partner/adverts/${advert.id}/statistics`, {
                        method  : 'GET',
                        headers : {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${olx_access_token}`,
                            'Version': '2.0'
                        }
                    });

                    advert.statistics = await res.json()
                }

                const dumpOlxAdverts = olxAdverts.data.map(advert => dumpAdvert({advert, olxEnabled: true}))

                adverts = [...dumpOlxAdverts]

            } catch (e) {
                throw e;
            }
        }

        console.log(adverts);

        return {
            data : adverts
        };
    }
}
