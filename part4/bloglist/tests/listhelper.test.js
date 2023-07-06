const listHelper = require('../utils/listhelper')
const blogs = [
    {
        id:"32145",
        title:"Design Patterns",
        author:"Muhammad Urwah",
        url:"https://designpatterns.com/",
        likes:3
    },
    {
        id:"32146",
        title:"Talwind CSS",
        author:"Mark Jones",
        url:"https://tailwindcss.com/",
        likes:12
    },
    {
        id:"32147",
        title:"Node js",
        author:"Unknown",
        url:"https://nodejs.prg/",
        likes:5
    },
    {
        id:"32148",
        title:"fullstackopen",
        author:"Martin Lukkimen",
        url:"https://fullstackopen.com/",
        likes:2
    },
    {
        id:"32149",
        title:"Devster",
        author:"Muhammad Urwah",
        url:"https://muhammadurwah.netlify.app/",
        likes:11
    },
]
const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

test('Result of Listhelper', ()=>{
    expect(listHelper.dummy([])).toBe(1)
})

describe('total likes', () => {
  
    test('when list has only one blog, equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      expect(result).toBe(5)
    })

})

describe('Favorite Blog', () => {
    test('in an empty list', () => {
        const result = listHelper.favoriteBlog([])
    
        expect(result).toEqual({})
    })

    test('in list of a single blog', () => {
        const blog = blogs[0]
        const maximum = listHelper.favoriteBlog([blog])
        const favorite = blogs.find(blog => blog.likes === maximum)
        expect(favorite).toEqual(blog)
    })

    test('in a list of multiple blogs', () => {
        const maximum = listHelper.favoriteBlog(blogs)
        const favorite = blogs.find(blog => blog.likes === maximum)
        expect(favorite).toEqual(blogs[1])
    })
})

describe('Author with most blogs ',() => {
    test('in an empty list', ()=>{
        const result = listHelper.mostBlogs([])

        expect(result).toEqual({})
    })

    test('in a list of single blog', ()=>{
        const result = listHelper.mostBlogs([blogs[0]])

        expect(result).toEqual({
            author: blogs[0].author,
            blogs: 1
        })
    })

    test('in a list of multiple blogs', ()=>{
        const result = listHelper.mostBlogs(blogs)

        expect(result).toEqual({
            author: "Muhammad Urwah",
            blogs: 2
        })
    })
} )

describe('Author with most likes, ',() => {
    test('in an empty list', ()=>{
        const result = listHelper.mostLikes([])

        expect(result).toEqual({})
    })

    test('in a list of single blog', ()=>{
        const result = listHelper.mostLikes([blogs[0]])

        expect(result).toEqual({
            author: blogs[0].author,
            likes: 3
        })
    })

    test('in a list of multiple blogs', ()=>{
        const result = listHelper.mostLikes(blogs)

        expect(result).toEqual({
            author: "Muhammad Urwah",
            likes: 11+3
        })
    })
} )

