// Bring in required libraries 
const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");
const utils = require("util")

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
        message: "Please provide a title for the project: ",
        name: "title"
    },
    {
        type: "input",
        message: "Please provide a short description of project: ",
        name: "description"
    }
];

const writeToFile = async (filename, data) => {
    try {
        await asyncWriteFile(filename, data);
        console.log("Writen to file succesfully");
    } catch (e) {
        console.log("Error: ", e);
    }
}

const init = async () => {
    const {
        gitHubUser,
        title,
        description
    } = await inquirer.prompt(questions)

    try {
        const {
            data: {
                html_url,
                repos_url,
                name,
                email,
                company,
                blog,
                location
            }
        } = await axios.get(`https://api.github.com/users/${gitHubUser}`)

        const genereatedMarkdown = generateMarkDown({
            html_url,
            repos_url,
            name,
            email,
            company,
            blog,
            location
        })

        await asyncWriteFile("log.txt", genereatedMarkdown)

        console.log("Successfullt writen to file!")
    } catch (e) {
        console.log("Error - Init: ", e)
    }
    console.log("Code ran and exiting!")
}

init()