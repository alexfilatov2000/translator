export function dumpAdvert({
    advert,
    olxEnabled = false,
    autoriaEnabled = false
}) {
    console.log({autoriaEnabled})
    const defaultAdvert = {
        id          : null,
        url         : null,
        status      : null,
        title       : null,
        description : null,
        price       : null,
        image       : null,
        source      : null,
        sourceURL   : null,
        createdAt   : null,
        expireDate  : null,
        statistics  : { advert_views: 0, phone_views: 0, users_observing: 0 }
    };

    if (olxEnabled) {
        defaultAdvert.id          = advert.id;
        defaultAdvert.url         = advert.url
        defaultAdvert.status      = advert.status;
        defaultAdvert.title       = advert.title;
        defaultAdvert.description = advert.description;
        defaultAdvert.price       = `${advert.price.value} ${advert.price.currency}`;
        defaultAdvert.image       = advert.images[0]?.url;
        defaultAdvert.source      = 'OLX'
        defaultAdvert.sourceURL   = 'https://drive.google.com/uc?id=15tkcvdbRxGT-aWnXh-R1GqDf16b_XOjL';
        defaultAdvert.createdAt   = advert.created_at;
        defaultAdvert.expireDate  = advert.valid_to;
        defaultAdvert.statistics  = advert.statistics.data;
    }

    if (autoriaEnabled) {
        defaultAdvert.id          = advert.id;
        defaultAdvert.url         = `https://auto.ria.com/uk${advert.linkToView}`
        defaultAdvert.status      = 'active';
        defaultAdvert.title       = `${advert.title} ${advert.autoData.year}`;
        defaultAdvert.description = advert.autoData.description;
        defaultAdvert.price       = `${advert.USD} USD`;
        defaultAdvert.image       = advert.photoData.seoLinkF
        defaultAdvert.source      = 'AutoRIA'
        defaultAdvert.sourceURL   = 'https://drive.google.com/uc?id=1YGkRuohRqBjrGPlf3ShDvbxfUwbqrVjZ'
        defaultAdvert.createdAt   = advert.addDate;
        defaultAdvert.expireDate  = advert.expireDate;

        defaultAdvert.statistics.advert_views = advert.statistics.views;
        defaultAdvert.statistics.phone_views = advert.statistics.clicks;
        defaultAdvert.statistics.users_observing = advert.statistics.notepadCount;
    }

    return defaultAdvert;
}
