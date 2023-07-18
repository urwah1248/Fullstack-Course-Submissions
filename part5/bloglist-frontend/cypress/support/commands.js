Cypress.Commands.add('login', ({username, password}) => {
    cy.request('POST', 'http://localhost:3001/api/login', {
        username, password
      }).then(response => {
        localStorage.setItem('loggedBloglistUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
    })
})

Cypress.Commands.add('addBlog', ({ title, author, url }) => {
    cy.request({
        url: 'http://localhost:3001/api/blogs',
        method: 'POST',
        body: { title, author, url },
        headers: {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('loggedBloglistUser')).token}`
        }
    })

    cy.visit('http://localhost:3000')
})