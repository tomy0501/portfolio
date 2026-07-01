import { useState,useEffect } from 'react'
import './App.css'

function App() {

  return (
    <>
      
      <GetAPI />
      <TestLogin />
      <TestCookie />
    </>
  )
}


interface user {
  username: string;
  email: string;
}

function GetAPI() {
  const [data, setData] = useState<user | null>(null)
  const apiUrl = "./api/user"

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error))
  }, [apiUrl])
  
  return (
    <div>
      <h2>API Response:</h2>
      {data ? (
        <div>
          <p>Name: {data.username}</p>
          <p>Email: {data.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

function TestLogin() {
  const email = import.meta.env.VITE_EMAIL
  const password = import.meta.env.VITE_PASSWORD
  const apiUrl = "./auth/login"

  useEffect(() => {
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => console.log('Login response:', data))
      .catch((error) => console.error('Error during login:', error))
  }, [email, password, apiUrl])

  return (
    <div>
      <h2>Login Test</h2>
      <p>Check the console for login response.</p>
    </div>
  )
}

function TestCookie() {
  const apiUrl = "./api/test"

  useEffect(() => {
    fetch(apiUrl, {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => console.log('Cookie test response:', data))
      .catch((error) => console.error('Error during cookie test:', error))
  }, [apiUrl])

  return (
    <div>
      <h2>Cookie Test</h2>
      <p>Check the console for cookie test response.</p>
    </div>
  )
}
export default App
