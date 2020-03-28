// Bring in required libraries 
const inquirer = require("inquirer");
const generateMarkDown = require("./utils/generateMarkdown.js");
const generateMarkdown1 = require("./utils/generateMarkdown.js");
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

// Write to file, remove old file
function writeToFile(fileName, data) {

    fs.writeFile(fileName, data, function (err) {

        if (err) {
            return console.log(err);
        }
        console.log("Success!");
    });
}

// Append to nominated file
function appendToFile(fileName, data) {

    fs.appendFile(fileName, data, function (err) {

        if (err) {
            return console.log(err);
        }
        console.log("Success!");
    });
}

// Main function
function init() {
    inquirer
        .prompt(questions)
        .then(function (response) {

            // Write responses to quetions
            writeToFile("README.md", generateMarkDown(response));

            // Call GitHub API to obtain details on repo owner email
            axios.get('https://api.github.com/repos/' + response.gitHubUser + '/' + response.repo)
                .then((response1) => {
                    let avatar_url = response1.data.owner.avatar_url;
                    appendToFile("README.md", avatar_url);
                });

            // call GitHub API to obtain users email
            axios.get('https://api.github.com/users/' + response.gitHubUser)
                .then((response1) => {
                    let email = response1.data.email
                    appendToFile("README.md", email);
                });
        });
}

init();