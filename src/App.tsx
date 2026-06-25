import { useState,useEffect } from 'react'
import './App.css'

function App() {

  return (
    <>
      
      <GetAPI />


    </>
  )
}


interface user {
  name: string;
  email: string;
}

function GetAPI() {
  const [data, setData] = useState<user | null>(null)
  const apiUrl = import.meta.env.VITE_API_URL + '/'

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
          <p>Name: {data.name}</p>
          <p>Email: {data.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}
export default App
