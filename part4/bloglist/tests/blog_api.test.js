const mongoose = require('mongoose')
const app = require('../app')
const api = require('supertest')(app)
const Blog = require('../models/blog')
const listhelper = require('../utils/listhelper')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

beforeAll(async () => {
    await User.deleteMany({});
    const data = {
        username: "newuser",
        name: "New User",
        password: "newpassword"
    }
    const userr = await api.post('/api/users').send(data)
})
beforeEach(async () => {
    // Clear the database before each test
    await Blog.deleteMany({});
    await Blog.insertMany(listhelper.initialBlogs)
  });
  
afterAll(async () => {
    // Close the Mongoose connection after all tests
    await mongoose.connection.close();
});

const generateToken = async () => {
    const user = {
        username: "newuser",
        password: "newpassword"
    }
    const res = await api.post("/api/login").send(user)
    return res.body.token
}

describe('When there is initially some blogs saved, ', () => {

    //Exercise 4.8
    test('all Blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    //Exercise 4.9
    test('ID of the returned blogs is defined', async () => {
        const res = await api.get('/api/blogs')
        res.body.map(blog => expect(blog.id).toBeDefined())
    })

    //Exercise 4.13
    test('Deletes a blog post', async () => {
        // Make a POST request to create the new blog post
        const token = await generateToken()
        const newBlogPost = {
            title: 'Test Blog Post',
            url: '/1234',
            likes: 10,
            author: "Muhammad Urwah"
        };

        const blog = await api
            .post('/api/blogs')
            .send(newBlogPost)
            .set("Authorization", `Bearer ${token}`)

        const blogPostId = blog.body.id

        // // Make a DELETE request to delete the blog post
        const deleteResponse = await api
            .delete(`/api/blogs/${blogPostId}`)
            .set("Authorization", `Bearer ${token}`)
            .expect(204);

        // // Verify that the blog post no longer exists in the system
        const deletedBlogPost = await Blog.findById(blogPostId);
        expect(deletedBlogPost).toBeNull();
    })

    //Exercise 4.14
    test("Updates a blog", async () => {
        const token = await generateToken()
        const newBlogPost = {
            title: 'Test Blog Post',
            url: '/1234',
            likes: 10,
            author: "Muhammad Urwah"
        };

        const blog = await api
            .post('/api/blogs')
            .send(newBlogPost)
            .set("Authorization", `Bearer ${token}`)

        const blogPostId = blog.body.id

        const updatedBlog = {
          title: "Wordpress using Docker Desktop"
        };

        const updateResponse = await api
          .put(`/api/blogs/${blogPostId}`)
          .set("Authorization", `Bearer ${token}`)
          .send(updatedBlog)
          .expect(200);

        const updatedBlogPost = updateResponse.body;
        expect(updatedBlogPost.title).toBe(updatedBlog.title);
      });
})

describe('When adding new blogs using, ', () => {
//Exercise 4.10
    test('All the data', async () => {
        const token = await generateToken()

        const allBlogs = await api.get('/api/blogs')
        const initialCount = Number(allBlogs.body.length.toString())
        const newBlogPost = {
            title: 'Test Blog Post',
            url: '/1234',
            likes: 10,
            author: "Muhammad Urwah"
        };
    
        const response = await api
        .post('/api/blogs')
        .send(newBlogPost)
        .set("Authorization", `Bearer ${token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/);
    
        // Verify that the total number of blogs is increased by one
        const totalBlogs = await Blog.countDocuments();
        expect(totalBlogs).toBe(initialCount+1);
    
        // Verify that the content of the blog post is saved correctly to the database
        const savedBlogPost = await Blog.findById(response.body.id);
        expect(savedBlogPost.title).toBe(newBlogPost.title);
        expect(savedBlogPost.url).toBe(newBlogPost.url);
    });

    //Exercise 4.11
    test('All required data without providing Likes', async () => {
        const token = await generateToken()
        const newBlogPost = {
            title: 'Test Blog Post',
            url: '/1234',
        };

        const response = await api
            .post('/api/blogs')
            .set("Authorization", `Bearer ${token}`)
            .send(newBlogPost)
            .expect(201)

        // Verify that the likes property defaults to 0
        expect(response.body.likes).toBe(0);
    });

    //Exercise 4.12
    test('Without required Data', async () => {
        const token = await generateToken()
        await api
            .post('/api/blogs')
            .set("Authorization", `Bearer ${token}`)
            .send({likes:50})
            .expect(400)
    })

    //Ex 4.23
    test('All the data, Without Token', async () => {
        const newBlogPost = {
            title: 'Test Blog Post',
            url: '/1234',
            likes: 10,
            author: "Muhammad Urwah"
        };
    
        await api
        .post('/api/blogs')
        .send(newBlogPost)
        .expect(401)
        .expect('Content-Type', /application\/json/);
    })
})
