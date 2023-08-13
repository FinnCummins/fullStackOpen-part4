const _ = require('lodash');

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

const mostBlogs = (blogs) => {
    let currentAuthor = null

    const authors = []

    blogs.forEach(blog => {
        authors.push(blog.author)
    })

    const totalAuthorPosts = _.countBy(authors);

    for (const key in totalAuthorPosts) {
        if (currentAuthor != null) {
            if (totalAuthorPosts[key] > currentAuthor.blogs) {
                currentAuthor = {
                    author: key,
                    blogs: totalAuthorPosts[key]
                }
            }
        }
        else {
            currentAuthor = {
                author: key,
                blogs: totalAuthorPosts[key]
            }
        }
    }

    return currentAuthor
}

const mostLikes = (blogs) => {
    let currentAuthor = null

    const authors = []
    
    blogs.forEach(blog => {
        const author = blog.author
        authors.push({
            author : blog.author,
            likes: blog.likes
        })
    })

    const set = []
    const condensedList = []

    authors.forEach(author => {
            if (set.includes(author.author)) {
                condensedList.forEach(item => {
                    if (item.author === author.author) {
                        item.likes += author.likes
                    }
                })
            }
            else {
                set.push(author.author)
                condensedList.push({
                    author: author.author,
                    likes: author.likes
                })
            }
        }
    )

    let answer = null

    condensedList.forEach(item => {
        if (answer != null) {
            if (item.likes >= answer.likes) {
                answer = item
            }
        }
        else {
            answer = item
        }
    })

    return answer
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}