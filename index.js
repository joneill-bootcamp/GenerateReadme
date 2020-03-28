// Bring in required libraries 
const inquirer = require("inquirer");
const generateMarkDown = require("./utils/generateMarkdown.js");
const api = require("./utils/api.js");
const fs = require("fs");

/* title, description, installation, and usage sections */


// Define constants
const questions = [{
        type: "input",
        message: "Please provide your GitHub username: ",
        name: "githubuser"
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
    }
];

function writeToFile(fileName, data) {

    fs.writeFile("log.txt", process.argv[2], function (err) {

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
        });
}

init();