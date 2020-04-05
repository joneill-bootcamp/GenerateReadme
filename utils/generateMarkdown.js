const generateMarkdown = ({
  title,
  description,
  name,
  email,
  avatar_url,
  node_id,
  full_name,
  html_url,
  starred_url
}) => `
# ${title}
=========

# Description
${description}

# Repo Link
>${html_url}

This project was build by ${name}, who can be reached at ${email}

Here's the Avatar for the repo owner.
![Image description](${avatar_url})

# Table of Contents
1. [Installation](##Installation)
2. [Usage](##Usage)
3. [License](##License)
4. [Contributing](##Contributing)
5. [Tests](##Tests)
6. [Questions](##Questions)

## Installation

Clone the repo 
> git clone ${html_url}

Run the following command
> npm install 

## Usage

To execute this tool
> npm run start

## License

This project is licensed under the terms of the **MIT** license.

## Contributing

## Tests

Enter the following command 

npm run test

## Questions

Please direct your questions to 


`;

module.exports = generateMarkdown;