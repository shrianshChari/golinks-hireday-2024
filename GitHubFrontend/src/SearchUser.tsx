import { useState } from "react"

export default function SearchUser() {
  const [username, setUsername] = useState("seantomburke")
  const [data, setData] = useState({})

  async function 

  return (
    <>
      <form method="get" action="http://localhost:3000/">
        <label>Username:</label>

        <br />

        <input
          defaultValue={username}
          name="username"
          required
        >

        </input>

        <button type="submit">Submit</button>
      </form>

      <p>{data.toString()}</p>
    </>
  )
}
