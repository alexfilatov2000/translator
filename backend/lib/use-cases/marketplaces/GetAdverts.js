import Base from '../../use-cases/Base.mjs';
import {dumpAdvert} from "../../utils/dumps.mjs";

export default class GetAdverts extends Base {
    async validate(data = {}) {
        const rules = {
            olx_access_token    : [ 'string' ],
            ria_access_token    : [ 'string' ],
            autoriaEnabled      : [ 'boolean' ],
            olxEnabled          : [ 'boolean' ],
            ria_user_id         : [ 'string' ],
        };

        return this.doValidation(data, rules);
    }

    async execute({
        olxEnabled,
        autoriaEnabled,
        olx_access_token,
        ria_access_token,
        ria_user_id
    }) {
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

        if (autoriaEnabled) {
            try {
                const response = await fetch(`https://developers.ria.com/auto/used/autos/ids?api_key=${ria_access_token}&user_id=${ria_user_id}`, {
                    method  : 'GET',
                    headers : {
                        'Content-Type' : 'application/json'
                    }
                });

                const advertIds = await response.json();
                const advertActiveIds = advertIds.active.moderated;

                const advertsInfo = [];
                for (const advertId of advertActiveIds) {
                    const resAdvertInfo = await fetch(`https://developers.ria.com/auto/used/autos/${advertId}?api_key=${ria_access_token}&user_id=${ria_user_id}`, {
                        method  : 'GET',
                        headers : {
                            'Content-Type' : 'application/json'
                        }
                    });

                    const resStatistic = await fetch(`https://developers.ria.com/auto/used/autos/${advertId}/statistic?api_key=${ria_access_token}&user_id=${ria_user_id}`, {
                        method  : 'GET',
                        headers : {
                            'Content-Type' : 'application/json'
                        }
                    });
                    const advertInfo = await resAdvertInfo.json();
                    const statistics = await resStatistic.json();
                    console.log(statistics);
                    advertsInfo.push({...advertInfo, statistics});
                }

                console.log(advertsInfo)
            } catch (e) {
                throw e;
            }
        }

        // console.log(adverts);

        return {
            data : adverts
        };
    }
}
