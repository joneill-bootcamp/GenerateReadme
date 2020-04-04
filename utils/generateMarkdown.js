const generateMarkdown = ({
  title,
  description,
  name,
  email
}) => `
#${title}
=========

#Description
${description}

This project was build by ${name}, who can be reached at ${email}

#Table of Contents
1. [Installation](##Installation)
2. [Usage](##Usage)
3. [License](##License)
4. [Contributing](##Contributing)
5. [Tests](##Tests)
6. [Questions](##Questions)

##Installation

Clone the repo 
> git clone XXXXXXX

Run the following command
> npm install 

##Usage

To execute this tool
> npm run start

##License

This project is licensed under the terms of the **MIT** license.

##Contributing

##Tests

Enter the following command 

npm run test

##Questions

Please direct your questions to joneill-bootcamp@supersoftware.biz


`;

module.exports = generateMarkdown;