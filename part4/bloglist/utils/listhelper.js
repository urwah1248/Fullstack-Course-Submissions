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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}
  