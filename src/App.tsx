// import { useState,useEffect } from 'react'
import './App.css'

function App() {

  return (
    <>
      
      {/* <GetAPI /> */}
      {/* <TestLogin /> */}
      {/* <TestCookie /> */}
      <TestRefresh />
    </>
  )
}


// interface user {
//   username: string;
//   email: string;
// }

// function GetAPI() {
//   const [data, setData] = useState<user | null>(null)
//   const apiUrl = "./api/user"

//   useEffect(() => {
//     fetch(apiUrl)
//       .then((response) => response.json())
//       .then((data) => setData(data))
//       .catch((error) => console.error('Error fetching data:', error))
//   }, [apiUrl])
  
//   return (
//     <div>
//       <h2>API Response:</h2>
//       {data ? (
//         <div>
//           <p>Name: {data.username}</p>
//           <p>Email: {data.email}</p>
//         </div>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   )
// }

// function TestLogin() {
//   const email = import.meta.env.VITE_EMAIL
//   const password = import.meta.env.VITE_PASSWORD
//   const apiUrl = "./auth/login"

//   useEffect(() => {
//     fetch(apiUrl, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       credentials: 'include',
//       body: JSON.stringify({ email, password }),
//     })
//       .then((response) => response.json())
//       .then((data) => console.log('Login response:', data))
//       .catch((error) => console.error('Error during login:', error))
//   }, [email, password, apiUrl])

//   return (
//     <div>
//       <h2>Login Test</h2>
//       <p>Check the console for login response.</p>
//     </div>
//   )
// }

// function TestCookie() {
//   const apiUrl = "./api/testJWT"

//   useEffect(() => {
//     fetch(apiUrl, {
//       method: 'GET',
//       credentials: 'include',
//     })
//       .then((response) => {
//         if (response.status === 401) {
//           tokenRefresh().then((success) => {
//             if (success) {
//               fetch(apiUrl, {
//                 method: 'GET',
//                 credentials: 'include',
//               })
//                 .then((response) => response.json())
//                 .then((data) => console.log('Cookie test response after refresh:', data))
//                 .catch((error) => console.error('Error during cookie test after refresh:', error))
//             }else {
//               console.error('Token refresh failed, cannot test cookie')
//             }
//           })
//         }else if (response.ok) {
//           return response.json().then((data) => console.log('Cookie test response:', data))
//         } else {
//           throw new Error('Error during cookie test')
//         }
//       })
//   }, [apiUrl])

//   return (
//     <div>
//       <h2>Cookie Test</h2>
//       <p>Check the console for cookie test response.</p>
//     </div>
//   )
// }

async function tokenRefresh() : Promise<boolean> {
  const apiUrl = "./auth/refresh"
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      credentials: 'include',
    })
    if (!response.ok) {
      throw new Error('Token refresh failed')
    }
    console.log('Token refreshed successfully')
    return true
  } catch (error) {
    console.error('Error during token refresh:', error)
    return false
  }
}

function TestRefresh() {
  tokenRefresh().then((success) => {
    if (success) {
      console.log('Token refresh test successful')
    } else {
      console.error('Token refresh test failed')
    }
  })
  return (
    <div>
      <h2>Token Refresh Test</h2>
      <p>Check the console for token refresh test response.</p>
    </div>
  )
}
export default App
