const generateMarkdown = ({
  html_url,
  repos_url,
  name,
  email,
  company,
  blog,
  location
}) => `
# ${html_url}

# ${repos_url}

## ${name}

## ${email}

## ${company}

## ${blog}

## ${location}

`;

module.exports = generateMarkdown;