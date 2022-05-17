export function dumpAdvert({
    advert,
    olxEnabled = false,
    rozetkaEnabled = false
}) {
    if (olxEnabled) {
        return {
            id           : advert.id,
            status       : advert.status,
            title        : advert.title,
            description  : advert.description,
            price        : `${advert.price.value} ${advert.price.currency}`,
            image        : advert.images[0]?.url,
            createdAt    : advert.created_at,
            validTo      : advert.valid_to,
            statistics   : advert.statistics.data
        };
    }

    return {}
}