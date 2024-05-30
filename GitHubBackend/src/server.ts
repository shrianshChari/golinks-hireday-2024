import { Octokit } from "octokit";
import * as dotenv from 'dotenv';
import express, { Express, Request, Response } from "express";
import cors from "cors";
import bodyParser from 'body-parser';

dotenv.config()

const app: Express = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

const octokit = new Octokit({
	auth: process.env.GITHUB_TOKEN
})

interface ResponseData {
	username: string,
	numRepos: number
	totalForks: number,
	totalStars: number,
	languages: { [key: string]: number },
}


app.post("/", async (request: Request, response: Response) => {
	const username: string = request.body.username;

	const user = await octokit.request("GET /users/{username}", {
		username: username
	});

	let num_public_repos = user.data.public_repos;
	const num_private_repos = user.data.owned_private_repos || 0;

	const publicRepos = await octokit.paginate('GET /users/{username}/repos', {
		username: username
	});

	const languages = publicRepos.map((repo) => repo.language);

	let languageCount: { [key: string]: number } = {}

	for (let language of languages) {
		if (language) {
			languageCount[language] = languageCount[language] ? languageCount[language] + 1 : 1;
		}
	}

	languageCount = Object.fromEntries(Object.entries(languageCount)
		.sort((a, b) => a[1] - b[1]).reverse())

	const forkCounts = publicRepos.map((repo) => repo.forks_count).map((count) => count ? count : 0);
	let totalForks = 0;
	forkCounts.forEach((count) => {
		totalForks += count;
	});

	const starCounts = publicRepos.map((repo) => repo.stargazers_count).map((count) => count ? count : 0);
	let totalStars = 0;
	starCounts.forEach((count) => {
		totalStars += count;
	});


	const responseData: ResponseData = {
		username: username,
		numRepos: num_public_repos + num_private_repos,
		languages: languageCount,
		totalForks: totalForks,
		totalStars: totalStars
	}

	console.log(JSON.stringify(responseData));

	response.json(responseData);
});

app.listen(port, () => {
	console.log(`[server] Server is running at http://localhost:${port}`);
})
