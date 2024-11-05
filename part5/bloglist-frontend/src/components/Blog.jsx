import { useState } from 'react';

const Blog = ({ blog }) => {
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
        <button>like</button>
      </p>
      <p style={paragraphStyle}>{blog.author}</p>
      {blog.title} {blog.author}
      <button>view</button>
    </div>
  );
  return isCompact ? compact() : detailed();
};

export default Blog;
