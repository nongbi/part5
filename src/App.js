import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  // useEffect(() => {
  //   blogService
  //     .getAll()
  //     .then(blogs =>
  //       setBlogs( blogs )
  //   )  
  // }, [])

  const handleLogin = async event => {
    event.preventDefault()
    console.log('login info', username, password)
    try {
      const user = await loginService.login({
        username, password
      })
      blogService.setToken(user.token)
      setUser(user)
      const blogs = await blogService.getAll()
      setBlogs(blogs)
      setUsername('')
      setPassword('')
    } catch(error) {
      console.log(error)
    }
  }

  if(user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <h4>{user.name} logged in</h4>
      {
        blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />)
      }
    </div>
  )
}

export default App
