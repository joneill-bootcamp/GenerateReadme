// Bring in required libraries 
const inquirer = require("inquirer");
const generateMarkDown = require("./utils/generateMarkdown.js");
const generateMarkDown1 = require("./utils/generateMarkdown.js");
const fs = require("fs");
const axios = require("axios");

// Define Questions
const questions = [{
        type: "input",
        message: "Please state name of the file you want to write this content to (newREAMD.md if left blank): ",
        name: "filename"
    }, {
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
        console.log("Success!, new README.md file content written to 'newREADME.md', please feel free to use.");
    });
}

// Main function
function init() {
    inquirer
        .prompt(questions)
        .then(function (response) {

            if (!response.fileName) {
                let filename = "newREADME.md"
            } else {
                let filename = response.fileName;
            }
            // Write responses to quetions
            writeToFile(filename, generateMarkDown(response));

            try { // Call GitHub API to obtain details on repo owner email
                axios.get('https://api.github.com/repos/' + response.gitHubUser + '/' + response.repo)
                    .then((response1) => {
                        let avatar_url = response1.data.owner.avatar_url;
                        appendToFile(filename, avatar_url);
                    });
            } catch (error) {
                console.log(error);
            }
            // try {
            //     // call GitHub API to obtain users email
            //     axios.get('https://api.github.com/users/' + response.gitHubUser)
            //         .then((response1) => {
            //             let email = response1.data.email
            //             appendToFile("newREADME.md", email);
            //         });
            // } catch (error) {
            //     console.log(error);
            // }
        });
}

init();