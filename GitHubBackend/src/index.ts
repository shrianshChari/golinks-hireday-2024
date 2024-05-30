import { Octokit } from "octokit";
import * as dotenv from 'dotenv';

dotenv.config()

const octokit = new Octokit({
	auth: process.env.GITHUB_TOKEN
})

/* const user = await octokit.request("GET /users/{username}", {
	username: "shrianshChari"
}) */

/* const data = await octokit.paginate("GET /users/{username}/repos", {
	username: "shrianshChari",
});

console.log(data.map((repo) => repo.language))

const languages = data.map((repo) => repo.language);

let languageCount: { [key: string]: number } = {}

for (let language of languages) {
	if (language) {
		languageCount[language] = languageCount[language] ? languageCount[language] + 1 : 1;
	}
}

console.log(Object.fromEntries(Object.entries(languageCount).sort((a, b) => a[1] - b[1]).reverse())) */

const data2 = await octokit.request({
	method: "GET",
	url: "/repos/{owner}/{repo}",
	owner: "smogon",
	repo: "damage-calc",
})

console.log(data2)

/* const data2 = await octokit.request("GET /repos/{owner}/{repo}/languages", {
	owner: "shrianshChari",
	repo: "dotfiles",
})

console.log(data2) */
