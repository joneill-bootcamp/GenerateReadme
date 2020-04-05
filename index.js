// Bring in required libraries 
const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");
const utils = require("util");

const generateMarkDown = require("./utils/generateMarkdown.js");

const asyncWriteFile = utils.promisify(fs.writeFile);

// Define Questions
const questions = [{
        type: "input",
        message: "Please provide your GitHub username: ",
        name: "gitHubUser"
    },
    {
        type: "input",
        message: "Please provide the repo name: ",
        name: "repoName"
    },
    {
        type: "input",
        message: "Please provide a title for the project: ",
        name: "title"
    },
    {
        type: "input",
        message: "Please provide a short description of project: ",
        name: "description"
    }
];

const init = async () => {
    const {
        gitHubUser,
        repoName,
        title,
        description
    } = await inquirer.prompt(questions)

    try {
        const {
            data: {
                name,
                email,
                avatar_url
            }
        } = await axios.get(`https://api.github.com/users/${gitHubUser}`);

        const {
            data: {
                node_id,
                full_name,
                owner: {
                    html_url,
                    starred_url
                }
            }
        } = await axios.get(`https://api.github.com/repos/${gitHubUser}/${repoName}`);

        const genereatedMarkdown = generateMarkDown({
            title,
            description,
            name,
            email,
            avatar_url,
            node_id,
            full_name,
            html_url,
            starred_url
        })

        await asyncWriteFile("log.txt", genereatedMarkdown)

        console.log("Successfully writen to file!")
    } catch (e) {
        console.log("Error - Init: ", e)
    }
    console.log("Code ran and exiting!")
}

init()