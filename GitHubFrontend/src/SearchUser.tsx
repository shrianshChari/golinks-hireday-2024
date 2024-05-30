import { useState } from "react"

interface ResponseData {
	username?: string,
	numRepos?: number
	totalForks?: number,
  totalStars?: number,
	languages?: { [key: string]: number },
}

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
  const [data, setData] = useState({} as ResponseData)

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

      {
        data['username'] ? <p><b>Username:</b> {data['username']}</p> : ''
      }
      {
        data['numRepos'] ? <p><b>Number of Repos:</b> {data['numRepos']}</p> : ''
      }
      {
        data['totalForks'] ? <p><b>Total Number of Forks:</b> {data['totalForks']}</p> : ''
      }
      {
        data['totalStars'] ? <p><b>Total Number of Stargazers:</b> {data['totalStars']}</p> : ''
      }
      {
        data['languages'] ?
        <>
          <p><b>Favorite Languages:</b></p>
          <ol>
            {Object.entries(data['languages']).map((value) => 
              <li key={value[0]}>{value[0]}: {value[1]}</li>
            )}
          </ol>
        </> : ''
      }
    </>
  )
}
