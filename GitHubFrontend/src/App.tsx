import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SearchUser from './SearchUser'

interface ResponseData {
	username: string,
	numRepos: number
	totalForks: number,
	languages: { [key: string]: number },
}

function App() {
  const [userInfo, setUserInfo] = useState({})

  return (
    <>
      <h1>Find Cool GitHub info!</h1>

      <SearchUser />
    </>
  )
}

export default App
