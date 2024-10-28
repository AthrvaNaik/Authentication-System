import { mailtrapClient, sender } from "./mailtrap.config.js";
import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verification",
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.error(error);
    throw new error(error);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{email}]
  try {
    
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid:"1ea7f791-87af-426c-9a83-94dc7b38be28",
      template_variables: {
        "company_info_name": "Bosss Cafe",
        "name": name
      }
    })
    console.log(response);
  } catch (error) {
    
  }  
};
