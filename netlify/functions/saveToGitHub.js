const fetch = require("node-fetch");

exports.handler = async function(event, context) {
  const {
    jobTitle, slug, companyName, location, jobType, applyLink, currency, salary, timeworking, education,
    jobHighlights, qualifications, benefits, responsibilities, jobDescription, snippet,
    googleMapsIframe, jsonLDScript
  } = JSON.parse(event.body);

  // Define the API endpoint and headers
  const apiUrl = 'https://api.sqlitecloud.io/v1/projects/cdvcdzinhz/databases/gaweDB.sqlite';
  const headers = {
    'Authorization': `Bearer ${process.env.SQLITECLOUD_TOKEN}`,
    'Content-Type': 'application/json'
  };

  // Create table if it doesn't exist
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS job_data (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      jobTitle TEXT,
      slug TEXT,
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
  `;
  
  await fetch(apiUrl, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ query: createTableQuery })
  });

  // Insert data into table
  const insertDataQuery = `
    INSERT INTO job_data (
      jobTitle, slug, companyName, location, jobType, applyLink, currency, salary, timeworking, education,
      jobHighlights, qualifications, benefits, responsibilities, jobDescription, snippet,
      googleMapsIframe, jsonLDScript
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;
  
  const values = [
    jobTitle, slug, companyName, location, jobType, applyLink, currency, salary, timeworking, education,
    jobHighlights, qualifications, benefits, responsibilities, jobDescription, snippet,
    googleMapsIframe, jsonLDScript
  ];

  await fetch(apiUrl, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ query: insertDataQuery, values: values })
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Data has been saved to SQLiteCloud' })
  };
};
