import { useState } from 'react';
const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  });

  const handleCreateBlog = (event) => {
    event.preventDefault();

    createBlog(newBlog);
    setNewBlog({ title: '', author: '', url: '' });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewBlog((blog) => ({ ...blog, [name]: value }));
  };

  return (
    <>
      <h2>Create New</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          Title
          <input
            type="text"
            name="title"
            value={newBlog.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          Author
          <input
            type="text"
            name="author"
            value={newBlog.author}
            onChange={handleInputChange}
          />
        </div>
        <div>
          Url
          <input
            type="text"
            name="url"
            value={newBlog.url}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default BlogForm;
