function generateMarkdown(data) {
  return `
# ${data.title}

# ${data.description}

# ${data.installation}

# ${data.usage}

# ${data.contributing}

# ${data.tests}

# ${data.questions}

`;
}

function generateMarkdown1(data) {
  return `

# ${data} 

` + '\n';
}

module.exports = generateMarkdown;