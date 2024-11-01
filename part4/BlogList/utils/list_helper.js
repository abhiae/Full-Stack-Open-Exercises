const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let sum = 0;
  blogs.forEach((blog) => {
    sum += blog.likes;
  });
  if (blogs.length === 0 || blogs === undefined) return 0;
  else return sum;
};

const favouriteBlog = (blogs) => {
  if (blogs.length === 0) return null;
  let mostLikedBlog = blogs[0];
  for (let i = 1; i < blogs.length; i++) {
    if (blogs[i].likes > mostLikedBlog.likes) {
      mostLikedBlog = blogs[i];
    }
  }
  const { title, author, likes } = mostLikedBlog;
  return { title, author, likes };
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
};
