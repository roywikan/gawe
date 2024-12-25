const fetch = require("node-fetch");
const initSqlJs = require('sql.js');
const fs = require('fs');

exports.handler = async function(event, context) {
  const {
    jobTitle, companyName, location, jobType, applyLink, currency, salary, timeworking, education,
    jobHighlights, qualifications, benefits, responsibilities, jobDescription, snippet,
    googleMapsIframe, jsonLDScript
  } = JSON.parse(event.body);

  // Initialize the database
  const SQL = await initSqlJs();
  const db = new SQL.Database();

  // Create table if it doesn't exist
  db.run(`
    CREATE TABLE IF NOT EXISTS job_data (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      jobTitle TEXT,
      companyName TEXT,
      location TEXT,
      jobType TEXT,
      applyLink TEXT,
      currency TEXT,
      salary TEXT,
      timeworking TEXT,
      education TEXT,
      jobHighlights TEXT,
      qualifications TEXT,
      benefits TEXT,
      responsibilities TEXT,
      jobDescription TEXT,
      snippet TEXT,
      googleMapsIframe TEXT,
      jsonLDScript TEXT
    );
  `);

  // Insert data into table
  const stmt = db.prepare(`
    INSERT INTO job_data (
      jobTitle, companyName, location, jobType, applyLink, currency, salary, timeworking, education,
      jobHighlights, qualifications, benefits, responsibilities, jobDescription, snippet,
      googleMapsIframe, jsonLDScript
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `);
  stmt.run([
    jobTitle, companyName, location, jobType, applyLink, currency, salary, timeworking, education,
    jobHighlights, qualifications, benefits, responsibilities, jobDescription, snippet,
    googleMapsIframe, jsonLDScript
  ]);
  stmt.free();

  // Export the database to a binary array
  const binaryArray = db.export();
  const buffer = Buffer.from(binaryArray);

  // Save the database to a file
  fs.writeFileSync('/tmp/job_data.sqlite', buffer);

  // Upload the file to GitHub
  const response = await fetch('https://api.github.com/repos/roywikan/gawe/contents/job_data.sqlite', {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: 'Add job_data.sqlite with form data',
      content: buffer.toString('base64'),
      branch: 'main'
    })
  });

  const data = await response.json();

  if (response.ok) {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Data has been saved to job_data.sqlite' })
    };
  } else {
    console.error(data);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to save data to job_data.sqlite' })
    };
  }
};
