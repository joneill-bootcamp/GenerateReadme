// Bring in required libraries 
const inquirer = require("inquirer");
const generateMarkDown = require("./utils/generateMarkdown.js");
const fs = require("fs");
const axios = require("axios");


// Define Questions
const questions = [{
        type: "input",
        message: "Please provide your GitHub username: ",
        name: "gitHubUser"
    },
    {
        type: "input",
        message: "Please enter the name of the REPO you with to generate README.md for : ",
        name: "repo"
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
    },

    {
        type: "input",
        message: "How do we install the project once cloned? ",
        name: "installation"
    },

    {
        type: "input",
        message: "How do we run/use this application? ",
        name: "usage"
    },

    {
        type: "input",
        message: "How does one contribute to this project? ",
        name: "contributing"
    },

    {
        type: "input",
        message: "How do we test this application? ",
        name: "tests"
    },

    {
        type: "input",
        message: "Where do I submit questions about this project? ",
        name: "questions"
    }
];

function writeToFile(fileName, data) {

    fs.writeFile("log.txt", data, function (err) {

        if (err) {
            return console.log(err);
        }
        console.log("Success!");
    });
}

function init() {

    inquirer
        .prompt(questions)
        .then(function (response) {
            // process responses

            console.log(response);
            console.log(generateMarkDown(response));
            //console.log(getUser(response.githubuser));

            axios.get('https://api.github.com/repos/' + response.gitHubUser + '/' + response.repo)
                .then((REPOresponse) => {
                    console.log(REPOresponse.data);
                });
            axios.get('https://api.github.com/users/' + response.gitHubUser)
                .then((USERresponse) => {
                    console.log(USERresponse.data);
                });
        });
}

init();