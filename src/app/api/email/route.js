import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const {
      lastName,
      firstName,
      email,
      countryCode,
      phoneNumber,
      destination,
      country,
    } = await req.json();

    // Validate required fields
    if (!lastName || !firstName || !email) {
      return new Response(
        JSON.stringify({ message: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Email template
    const emailTemplate = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <div style="text-align: center; padding-bottom: 20px;">
          <h1 style="color: #0f5a5a;">New Traveller Enquiry</h1>
        </div>
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px;">
          <h3 style="margin: 0; color: #333;">Traveller Details</h3>
          <p style="margin: 5px 0; color: #555;"><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p style="margin: 5px 0; color: #555;"><strong>Email:</strong> ${email}</p>
          <p style="margin: 5px 0; color: #555;"><strong>Contact Number:</strong> ${countryCode} ${
      phoneNumber || "Not provided"
    }</p>
          <p style="margin: 5px 0; color: #555;"><strong>Destination:</strong> ${
            destination || "Not specified"
          }</p>
          <p style="margin: 5px 0; color: #555;"><strong>Country:</strong> ${
            country || "Not specified"
          }</p>
        </div>
        <div style="text-align: center; padding-top: 20px;">
          <p style="color: #777;">Thank you for your enquiry. We will get back to you soon!</p>
        </div>
      </div>
    `;

    // Set up nodemailer transporter with Zoho SMTP
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465,
      secure: true, // Use SSL
      auth: {
        user: process.env.ZOHO_EMAIL,
        pass: process.env.ZOHO_PASSWORD,
      },
    });

    // Verify transporter configuration
    await transporter.verify();
     //console.log("Transporter configuration is valid.");

    // Send email
    await transporter.sendMail({
      from: `"VisitGCC" <${process.env.ZOHO_EMAIL}>`,
      to: process.env.FROM_EMAIL, // Consider making this configurable via env
      subject: "New Traveller Enquiry Submission",
      html: emailTemplate,
    });
     //console.log("Email sent successfully.");

    return new Response(
      JSON.stringify({ message: "Enquiry submitted successfully!" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in POST handler:", error);
    return new Response(
      JSON.stringify({
        message: "Failed to submit enquiry.",
        error: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
