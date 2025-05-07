const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");

const app = express();
app.use(cors());
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/api/send", async (req, res) => {
  const { email } = req.body;

  try {
    await resend.emails.send({
      from: "Plovrr <hello@plovrr.com>",
      to: "hello@plovrr.com",
      subject: "New Plovrr Beta Signup",
      html: `<p>New email signup: <strong>${email}</strong></p>`,
    });

    res.status(200).json({ message: "Email sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
