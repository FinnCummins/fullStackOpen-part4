const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    let sum = 0;
    blogs.forEach(post => {
        sum += post.likes
    });
    return sum
}

const favoriteBlog = (blogs) => {
    let mostLiked = 0
    let currentMostLiked = null

    blogs.forEach(post => {
        if (post.likes >= mostLiked)
        {
            mostLiked = post.likes
            currentMostLiked = post
        }
    })

    return currentMostLiked
    ?
    {
        title: currentMostLiked.title,
        author: currentMostLiked.author,
        likes: currentMostLiked.likes
    }
    : null
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}