import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState(null);

  // log
  // console.log('blogs', blogs);
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewBlog((blog) => ({ ...blog, [name]: value }));
  };

  const handleCreateBlog = (event) => {
    event.preventDefault();

    blogService.addBlog(newBlog).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      setNewBlog({ title: '', author: '', url: '' });
      setNotificationMessage(
        `a new blog ${returnedBlog.title} by ${returnedBlog.author}`
      );
      setTimeout(() => {
        setNotificationMessage(null);
      }, 3500);
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
          <Blog key={blog.id} blog={blog} />
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

  const createBlog = () => {
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

  // const notification = (message, isError) => {
  //   let style = null;
  //   if (isError) {
  //     style = {
  //       color: 'red',
  //       background: 'lightgrey',
  //       fontSize: 20,
  //       borderStyle: 'solid',
  //       padding: 10,
  //       marginBottom: 10,
  //     };
  //   } else {
  //     style = {
  //       color: 'green',
  //       background: 'lightgrey',
  //       fontSize: 20,
  //       borderStyle: 'solid',
  //       padding: 10,
  //       marginBottom: 10,
  //     };
  //   }

  //   if (errorMessage === null) return null;
  //   return <p style={style}>{message}</p>;
  // };

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
          {createBlog()}
          {blogView()}
        </div>
      )}
    </div>
  );
};

export default App;
