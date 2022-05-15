export const convertDate = (posts) => {
    if (!posts.length) {
        updateDate(posts)
    } else {
        for (let i = 0; i < posts.length; i++) {
            updateDate(posts[i])
        }
    }
}

function updateDate(post){
    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        timezone: 'UTC',
        hour: 'numeric',
        minute: 'numeric',
    };

    let date = new Date(post.createdAt)
    let update = new Date(post.updatedAt)
    post.createdAt = date.toLocaleString("en-US", options);
    post.updatedAt = update.toLocaleString("en-US", options);
}