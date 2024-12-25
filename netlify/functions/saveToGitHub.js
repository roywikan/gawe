import fetch from "bun-fetch";
import crypto from "crypto";

async function verifySignature(req) {
  const payload = await req.json();
  const signature = crypto
    .createHmac('sha256', process.env.WEBHOOK_SECRET)
    .update(JSON.stringify(payload))
    .digest('hex');
  return signature === req.headers['x-sqlitecloud-signature'];
}

export async function handler(request) {
  try {
    const isVerified = await verifySignature(request);
    if (!isVerified) {
      return {
        data: { message: 'Invalid signature' },
        statusCode: 403
      };
    }

    const {
      jobTitle, slug, companyName, location, jobType, applyLink, currency, salary, timeworking, education,
      jobHighlights, qualifications, benefits, responsibilities, jobDescription, snippet,
      googleMapsIframe, jsonLDScript
    } = request.data;

    if (!process.env.SQLITECLOUD_TOKEN) {
      throw new Error('SQLITECLOUD_TOKEN is not defined');
    }

    const apiUrl = `https://nlocdwihnz.sqlite.cloud:8860?apikey=${process.env.SQLITECLOUD_TOKEN}`;
    const headers = {
      'Authorization': `Bearer ${process.env.SQLITECLOUD_TOKEN}`,
      'Content-Type': 'application/json'
    };

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

    const createTableResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ query: createTableQuery })
    });

    if (!createTableResponse.ok) {
      console.error('Failed to create table:', await createTableResponse.text());
      throw new Error('Failed to create table');
    }

    const insertDataQuery = `
      INSERT INTO job_data (
        jobTitle, slug, companyName, location, jobType, applyLink, currency, salary, timeworking, education,
        jobHighlights, qualifications, benefits, responsibilities, jobDescription, snippet,
        googleMapsIframe, jsonLDScript
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

    const values = [
      jobTitle, slug, companyName, location, jobType, applyLink, currency, salary, timeworking, education,
      jobHighlights, qualifications, benefits, responsibilities, jobDescription, snippet,
      googleMapsIframe, jsonLDScript
    ];

    const insertDataResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ query: insertDataQuery, values: values })
    });

    if (!insertDataResponse.ok) {
      console.error('Failed to insert data:', await insertDataResponse.text());
      throw new Error('Failed to insert data');
    }

    return {
      data: { message: 'Data has been saved to SQLiteCloud' }
    };
  } catch (error) {
    console.error('Error:', error.message);
    return {
      data: { message: 'Failed to save data' }
    };
  }
}
