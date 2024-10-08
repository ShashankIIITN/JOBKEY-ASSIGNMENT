import { createTransport } from "nodemailer";

export const sendEmail = async (recipientEmail, subject, message) => {
	try {
		let transporter = createTransport({
			service: "gmail",
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS,
			},
		});

		let mailOptions = {
			from: process.env.EMAIL_USER,
			to: recipientEmail,
			subject: subject,
			text: message,
		};

		let info = await transporter.sendMail(mailOptions);
		console.log("Email sent: " + info.response);
	} catch (error) {
		console.error("Error sending email: ", error);
	}
};
