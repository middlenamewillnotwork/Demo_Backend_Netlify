// Netlify Function: submit-form
// This function accepts POST requests with JSON body containing fullName, mobile, email

exports.handler = async function(event, context) {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ success: false, message: 'Method Not Allowed' })
    };
  }

  try {
    // Parse JSON body
    const body = event.body ? JSON.parse(event.body) : {};
    const { fullName, mobile, email } = body;

    // Validate required fields
    if (!fullName || !mobile || !email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, message: 'Missing required fields' })
      };
    }

    // Basic validation: mobile digits 10-15, email pattern
    const mobileOk = /^\d{10,15}$/.test(mobile);
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!mobileOk || !emailOk) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, message: 'Invalid mobile or email format' })
      };
    }

    // Here you could save the data to a database or send an email.
    // For this beginner example we just return success.
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Form submitted successfully' })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: 'Server error' })
    };
  }
};
