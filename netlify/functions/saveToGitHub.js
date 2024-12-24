const fetch = require("node-fetch");
exports.handler = async function(event, context) {
  const { jobTitle, companyName, location, jobType, applyLink, jobHighlights, qualifications, benefits, responsibilities, jobDescription, equalOpportunityStatement } = JSON.parse(event.body);

  const yamlContent = `
jobTitle: ${jobTitle}
companyName: ${companyName}
location: ${location}
jobType: ${jobType}
applyLink: ${applyLink}
jobHighlights: ${jobHighlights.replace(/\n/g, '<br>')}
qualifications: ${qualifications}
benefits: ${benefits}
responsibilities: ${responsibilities}
jobDescription: ${jobDescription}
equalOpportunityStatement: ${equalOpportunityStatement}
  `;

  const response = await fetch('https://api.github.com/repos/roywikan/gawe/contents/content.yaml', {
    method: 'PUT',
    headers: {
      'Authorization': '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',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: 'Add content.yaml with form data',
      content: Buffer.from(yamlContent).toString('base64'),
      branch: 'main'
    })
  });

  const data = await response.json();

  if (response.ok) {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Data has been saved to content.yaml' })
    };
  } else {
    console.error(data);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to save data to content.yaml' })
    };
  }
};
