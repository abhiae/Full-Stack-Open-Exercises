const { test, describe } = require('node:test');
const assert = require('node:assert');
const totalLikes = require('../utils/list_helper').totalLikes;

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0,
    },
  ];
  const listWithMoreBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0,
    },
    {
      _id: '6724a2c36ce05e8f94d43e48',
      title: 'The Benefits of Using Mongoose with MongoDB',
      author: 'John Doe',
      url: 'https://www.example.com/blog/mongoose-benefits',
      likes: 10,
      __v: 0,
    },
    {
      _id: '6724a3036ce05e8f94d43e4b',
      title: 'Building a REST API with Node.js and Express',
      author: 'Jane Smith',
      url: 'https://www.example.com/blog/rest-api-nodejs-express',
      likes: 15,
      __v: 0,
    },
  ];
  test('of empty list is zero', () => {
    assert.strictEqual(totalLikes([]), 0);
  });
  test('when list has only one blog, equals the likes of that', () => {
    const result = totalLikes(listWithOneBlog);
    assert.strictEqual(result, 5);
  });

  test('of a bigger list is calculated right', () => {
    assert.strictEqual(totalLikes(listWithMoreBlog), 30);
  });
});
