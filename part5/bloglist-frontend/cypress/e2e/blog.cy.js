describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const newUser = {
      username:"newuser",
      name: "New User",
      password: "password",
      blogs: []
    }
    cy.request("POST", "http://localhost:3001/api/users", newUser)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.get("#login-form")
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type("newuser")
      cy.get('#password').type("password")
      cy.get('#login-form').submit()

      cy.contains("Logout")
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type("wrongusername")
      cy.get('#password').type("wrongpassword")
      cy.get('#login-form').submit()

      cy.contains("Invalid username or password")
    })
  })

  describe("When logged in", () => {
    beforeEach(()=> {
      cy.login({username:"newuser", password:"password"})
    })

    it('A blog can be created', function() {
      cy.get(".togglable").click()

      cy.get("#content").type("New Blog")
      cy.get("#author").type("New Author")
      cy.get("#url").type("/example_url")

      cy.get("#blog-form").submit()

      cy.contains("New Blog Added")
    })

    describe("If there are multiple blogs", () => {
      beforeEach(()=> {
        const blogs = [
          {
            title: "Test Blog 1",
            author: "Test Author 1",
            url: "testblog/1"
          },
          {
            title: "Test Blog 2",
            author: "Test Author 2",
            url: "testblog/2"
          },
          {
            title: "Test Blog 3",
            author: "Test Author 3",
            url: "testblog/3"
          },
        ]

        blogs.forEach((blog) => {
          cy.addBlog(blog)
        })
      })
  
      it('User can like a blog', ()=> {
        cy.contains("Test Blog 1")
        .contains("Show").click()

        cy.contains("Like").click()
      })
    })
  })

})