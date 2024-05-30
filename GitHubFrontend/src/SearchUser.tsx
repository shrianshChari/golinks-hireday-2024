import { useState } from "react"

async function getData(user: string) {
  let response = await fetch('http://localhost:3000', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username: user })
  })
  let data = await response.json();

  return data;
}

export default function SearchUser() {

  const [username, setUsername] = useState("seantomburke")
  const [data, setData] = useState({})

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          getData(username)
            .then((response) => {
              setData(response)
            })
        }}
      >
        <label>Username:</label>

        <br />

        <input
          defaultValue={username}
          name="username"
          required
          onChange={(event) => {
            setUsername(event.target.value)
          }}
        >

        </input>

        <br />

        <button type="submit">Submit</button>
      </form>

      <p>{JSON.stringify(data, null, 4)}</p>
    </>
  )
}
