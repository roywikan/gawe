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

    const edgeFunctionUrl = 'https://cdvcdzinhz.sqlite.cloud:8090/v2/functions/function-insert';
    const headers = {
      'Authorization': `Bearer ${process.env.SQLITECLOUD_TOKEN}`,
      'Content-Type': 'application/json'
    };

    const data = {
      jobTitle, slug, companyName, location, jobType, applyLink, currency, salary, timeworking, education,
      jobHighlights, qualifications, benefits, responsibilities, jobDescription, snippet,
      googleMapsIframe, jsonLDScript
    };

    const response = await fetch(edgeFunctionUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      console.error('Failed to insert data:', await response.text());
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
