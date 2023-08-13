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

module.exports = {
    dummy,
    totalLikes
}