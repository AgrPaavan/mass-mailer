import { google } from "googleapis";
import nodemailer from "nodemailer";
import content from "./content.js";

const CLIENT_ID = "";
const CLIENT_SECRET = "";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = "";

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const main = async () => {
  const accessToken = await oAuth2Client.getAccessToken();
  const accessToke = await oAuth2Client.refreshAccessToken;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "",
      // pass: "tmtynhxtywomwmug",
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken: accessToken,
    },
  });

  content.email.map(async (e) => {
    let info = await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>',
      to: e,
      subject: content.subject,
      // text: content.content,
      html: content.html,
    });
  });
};

main().catch((error) => console.log(error.message));
