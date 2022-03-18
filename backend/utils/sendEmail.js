const nodeMailer = require("nodemailer");
var { google } = require("googleapis");
var OAuth2 = google.auth.OAuth2;

const sendEmail = async (options) => {
  const myOAuth2Client = new OAuth2(
    process.env.EMAIL_CLIENT_ID,
    process.env.EMAIL_CLIENT_SECRET,
    process.env.EMAIL_CLIENT_URL
  );

  myOAuth2Client.setCredentials({
    refresh_token: process.env.EMAIL_REFRESH_TOKEN,
  });

  const myAccessToken = myOAuth2Client.getAccessToken();

  const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL_USER, //your gmail account you used to set the project up in google cloud console"
      clientId: process.env.EMAIL_CLIENT_ID,
      clientSecret: process.env.EMAIL_CLIENT_SECRET,
      refreshToken: process.env.EMAIL_REFRESH_TOKEN,
      accessToken: myAccessToken, //access token variable we defined earlier
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
