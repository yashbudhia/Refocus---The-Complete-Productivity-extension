"use strict";
// import nodemailer from "nodemailer";
// import bcryptjs from "bcryptjs";
// import { User } from "@prisma/client";
// import { prisma } from "@/prisma";
Object.defineProperty(exports, "__esModule", { value: true });
// export default async function sendEmail({ email, userId }: any) {
//   try {
//     const hasedToken = await bcryptjs.hash(userId.toString(), 10);
//     const futureDate = new Date(Date.now() + 6 * 60 * 60 * 1000);
//     const updatedUser = await prisma.user.update({
//       where: { id: userId }, // Specify the user to update based on the unique identifier
//       data: {
//         verifyToken: hasedToken,
//         verifyTokenExpiry: futureDate,
//       },
//     });
//     var transport = nodemailer.createTransport({
//       host: "sandbox.smtp.mailtrap.io",
//       port: 2525,
//       auth: {
//         user: process.env.MAILTRAP_USER,
//         pass: process.env.MAILTRAP_PASS,
//       },
//     });
//     const mailOptions = {
//       from: "yeshbudhia@gmail.com",
//       to: email,
//       subject: "Verify your email",
//       html: `<p>Click <a href="${process.env.NEXTAUTH_URL}/verifyemail?token=${hasedToken}">here</a></p>`,
//     };
//     const mailresponse = await transport.sendMail(mailOptions);
//     return mailresponse;
//   } catch (error: any) {
//     throw new Error(error.message);
//   }
// }
