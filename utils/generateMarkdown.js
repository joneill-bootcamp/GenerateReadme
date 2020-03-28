function generateMarkdown(data, user, repo) {
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

module.exports = generateMarkdown;