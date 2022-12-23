const listhelper = require('../utils/listhelper').dummy

test('Result of Listhelper', ()=>{
    const blogs = []

    expect(listhelper(blogs)).toBe(1)
})