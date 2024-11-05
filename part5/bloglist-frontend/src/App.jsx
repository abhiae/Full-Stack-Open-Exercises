import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState(null);

  // log
  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(blogs);
      // sort blogs initially
      blogs.sort((a, b) => b.likes - a.likes);
    });
  }, []);

  // csort blogs after change in blogs
  useEffect(() => {
    blogs.sort((a, b) => b.likes - a.likes);
  }, [blogs]);

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser');

    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem('loggedInUser', JSON.stringify(user));

      blogService.setToken(user.token);

      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      console.log('Wrong Credentials');
      setErrorMessage('Wrong username or password');
      setTimeout(() => {
        setErrorMessage(null);
      }, 2500);
    }
  };

  const addBlog = (blogObject) => {
    blogService.addBlog(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      setNotificationMessage(
        `a new blog ${returnedBlog.title} by ${returnedBlog.author}`
      );
      setTimeout(() => {
        setNotificationMessage(null);
      }, 3500);
    });
  };

  const increaseLike = (id, updatedBlogObject) => {
    blogService.updateLike(id, updatedBlogObject).then((returnedBlog) => {
      setBlogs(blogs.map((blog) => (blog.id === id ? returnedBlog : blog)));
    });
  };

  const deleteBlog = (id) => {
    blogService.deleteBlog(id).then(() => {
      setBlogs(blogs.filter((blog) => blog.id !== id));
    });
  };
  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <h2>Log in to Application</h2>
        <Notification message={errorMessage} isError={true} />
        <Notification message={notificationMessage} isError={false} />
        <div>
          Username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => {
              setUsername(target.value);
            }}
          />
        </div>
        <div>
          Password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => {
              setPassword(target.value);
            }}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    );
  };

  const blogView = () => {
    return (
      <div>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateLike={increaseLike}
            removeBlog={deleteBlog}
            currentUsername={user.username}
          />
        ))}
      </div>
    );
  };

  const logOutButton = () => {
    return (
      <button
        onClick={() => {
          window.localStorage.removeItem('loggedInUser');
          window.location.reload();
        }}
      >
        logout
      </button>
    );
  };

  return (
    <div>
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <h1>Blogs</h1>
          <Notification message={errorMessage} isError={true} />
          <Notification message={notificationMessage} isError={false} />
          <p>
            {user.name} logged-in {logOutButton()}{' '}
          </p>
          <Togglable buttonLabel="new blog">
            <BlogForm createBlog={addBlog} />
          </Togglable>
          {blogView()}
        </div>
      )}
    </div>
  );
};

export default App;
