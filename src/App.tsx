import { useState,useEffect } from 'react'
import './App.css'

function App() {

  return (
    <>
      
      <GetAPI />


    </>
  )
}

interface ApiResponse {
    message: string;
  }

function GetAPI() {
  const [data, setData] = useState<ApiResponse | null>(null)
  const apiUrl = import.meta.env.VITE_API_URL + 'ping'

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error))
  }, [apiUrl])
  
  return (
    <div>
      <h2>API Response:</h2>
      {data ? <p>{data.message}</p> : <p>Loading...</p>}
    </div>
  )
}
export default App
