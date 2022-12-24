const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let likes = 0;

    blogs.forEach(blog => {
        likes += blog.likes
    });

    return likes
}

const favoriteBlog = (blogs) => {
    return blogs.length === 0
    ? {}
    : blogs.reduce((maxLikes, blog) => blog.likes > maxLikes ? blog.likes : maxLikes, blogs[0].likes)
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return {}
    } else {
        let counts = blogs.reduce((count, blog) => {
            count[blog.author] = (count[blog.author] || 0) + 1
            return count
        }, {})
        let maxCount = Math.max(...Object.values(counts))
        let mostOccurent = Object.keys(counts).filter(author => counts[author] === maxCount)
        return {
            author: mostOccurent[0],
            blogs: maxCount
        }
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}
  