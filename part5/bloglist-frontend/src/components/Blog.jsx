import { useState } from 'react';

const Blog = ({ blog, currentUsername, updateLike, removeBlog }) => {
  const [isCompact, setIsCompact] = useState(true);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  // Add styles for paragraphs
  const paragraphStyle = {
    margin: 0,
    padding: '2px 0',
  };

  const toggleCompactness = () => {
    setIsCompact(!isCompact);
  };

  const handleLikeButton = (event) => {
    event.preventDefault();
    const updatedBlogObject = { ...blog, likes: blog.likes + 1 };
    updateLike(blog.id, updatedBlogObject);
  };

  const handleRemoveBlog = (event) => {
    event.preventDefault();
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlog(blog.id);
    }
  };
  // you don't need to use return if you use () instead of {}
  const compact = () => (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleCompactness}>view</button>
    </div>
  );
  const detailed = () => (
    <div style={blogStyle}>
      <p style={paragraphStyle}>
        {blog.title}
        <button onClick={toggleCompactness}>hide</button>
      </p>
      <p style={paragraphStyle}>{blog.url}</p>
      <p style={paragraphStyle}>
        {blog.likes}
        <button onClick={handleLikeButton}>like</button>
      </p>
      <p style={paragraphStyle}>{blog.author}</p>
      {currentUsername === blog.user.username ? (
        <button onClick={handleRemoveBlog}>remove</button>
      ) : null}
    </div>
  );
  return isCompact ? compact() : detailed();
};

export default Blog;
