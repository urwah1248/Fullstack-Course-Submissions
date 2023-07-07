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

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return {}
    } else {
        let allLikes = blogs.reduce((like, blog) => {
            like[blog.author] = (like[blog.author] || 0) + blog.likes
            return like
        }, {})
        let maxCount = Math.max(...Object.values(allLikes))
        let mostLiked = Object.keys(allLikes).filter(author => allLikes[author] === maxCount)
        return {
            author: mostLiked[0],
            likes: maxCount
        }
    }
}

const initialBlogs = [
    {
        title: "Use Wordpress with Docker",
        author: "Muhammad Urwah",
        url: "/01",
        likes: 5,
        userId: "64a7f3410e5058f73108a11f"
    },
    {
        title: "Make an AI website using OpenAI",
        author: "Muhammad Urwah",
        url: "/02",
        likes: 11,
        userId: "64a7f3410e5058f73108a11f"
    }
]

const initialUsers = [
    {
        _id:{$oid:"64a7e85369c9ccbe29ba850c"},
        username:"validuser",
        name:"Valid Name",
        passwordHash:"$2b$10$CYJQXRAKDUWx.dXz0FmJXOn9d1uGl610ogh8II/5lsD/PEXVcDTkO",
        blogs:[{$oid:"64a7ea71507568f857f7a5f8"}],
        __v:{$numberInt:1}
    }
]

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
    initialBlogs,
    initialUsers
}