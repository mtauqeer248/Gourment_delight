const functions = require("firebase-functions");
const admin = require("firebase-admin");
const sgMail = require("@sendgrid/mail");

admin.initializeApp();

sgMail.setApiKey(functions.config().sendgrid.apikey); // Add your SendGrid API key

// Cloud Function to send acknowledgment email
exports.sendReservationEmail = functions.firestore
  .document("reservations/{reservationId}")
  .onCreate((snap, context) => {
    const reservation = snap.data();
    
    const msg = {
      to: reservation.email, // Send email to user's email
      from: "your-email@example.com", // Your email address
      subject: "Reservation Confirmation",
      text: `Dear ${reservation.name},\n\nThank you for your reservation!\nYour reservation at ${reservation.time} on ${reservation.date} for ${reservation.seats} people is confirmed. We look forward to seeing you soon!\n\nBest regards,\nYour Restaurant Name`,
      html: `<p>Dear ${reservation.name},</p><p>Thank you for your reservation!</p><p>Your reservation at ${reservation.time} on ${reservation.date} for ${reservation.seats} people is confirmed. We look forward to seeing you soon!</p><p>Best regards,<br>Your Restaurant Name</p>`,
    };

    // Send the email
    return sgMail.send(msg)
      .then(() => {
        console.log("Email sent successfully to: ", reservation.email);
      })
      .catch((error) => {
        console.error("Error sending email: ", error);
      });
  });
