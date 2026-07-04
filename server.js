const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB Atlas
const mongoURI = process.env.MONGO_URI || "mongodb+srv://islomovikromjon7_db_user:Salom2026@cluster0.xvzwh5a.mongodb.net/nexara?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoURI)
  .then(() => console.log('✅ Nexara MongoDB connected successfully!'))
  .catch((err) => console.error('❌ Nexara MongoDB connection error:', err));

// Schema for Nexara Contact Messages
const nexaraMessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  company: { type: String, default: 'Noma\'lum' },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const NexaraMessage = mongoose.model('NexaraMessage', nexaraMessageSchema);

// Schema for Nexara Careers Applications
const nexaraApplicationSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  portfolio: { type: String, required: true },
  message: { type: String, default: '' },
  date: { type: Date, default: Date.now }
});

const NexaraApplication = mongoose.model('NexaraApplication', nexaraApplicationSchema);

// API: Save Contact Message
app.post('/api/contact', async (req, res) => {
  try {
    const { name, company, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'Ism, email va xabar to\'ldirilishi shart!' });
    }

    const newMsg = new NexaraMessage({
      name,
      company: company || 'Noma\'lum',
      email,
      subject,
      message
    });

    await newMsg.save();

    // Background email forwarding to user's real email
    try {
      await fetch("https://formsubmit.co/ajax/ikoshdev@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Name: name,
          Company: company || 'Noma\'lum',
          Email: email,
          Subject: `NEXARA Hamkorlik: ${subject}`,
          Message: message
        })
      });
    } catch (mailErr) {
      console.error('Error forwarding email to FormSubmit:', mailErr);
    }

    res.status(201).json({ success: true, message: 'Xabar muvaffaqiyatli saqlandi!' });
  } catch (error) {
    console.error('Error saving nexara message:', error);
    res.status(500).json({ success: false, error: 'Server xatoligi yuz berdi.' });
  }
});

// API: Get All Messages (for Developer CLI Terminal)
app.get('/api/messages', async (req, res) => {
  try {
    const messages = await NexaraMessage.find().sort({ date: -1 });
    res.status(200).json({ success: true, messages });
  } catch (error) {
    console.error('Error fetching nexara messages:', error);
    res.status(500).json({ success: false, error: 'Server xatoligi.' });
  }
});

// API: Clear All Messages (for Developer CLI Terminal clearinbox)
app.delete('/api/messages', async (req, res) => {
  try {
    await NexaraMessage.deleteMany({});
    res.status(200).json({ success: true, message: 'Barcha xabarlar o\'chirildi!' });
  } catch (error) {
    console.error('Error clearing nexara messages:', error);
    res.status(500).json({ success: false, error: 'Server xatoligi.' });
  }
});

// API: Save Careers Application
app.post('/api/apply', async (req, res) => {
  try {
    const { jobTitle, name, email, portfolio, message } = req.body;

    if (!jobTitle || !name || !email || !portfolio) {
      return res.status(400).json({ success: false, error: 'Barcha majburiy maydonlar to\'ldirilishi shart!' });
    }

    const newApply = new NexaraApplication({
      jobTitle,
      name,
      email,
      portfolio,
      message: message || ''
    });

    await newApply.save();

    // Background email forwarding to user's real email
    try {
      await fetch("https://formsubmit.co/ajax/ikoshdev@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Type: "NEXARA VAKANSIYA ARIZASI",
          Position: jobTitle,
          CandidateName: name,
          CandidateEmail: email,
          PortfolioLink: portfolio,
          Message: message || 'Noma\'lum'
        })
      });
    } catch (mailErr) {
      console.error('Error forwarding application email to FormSubmit:', mailErr);
    }

    res.status(201).json({ success: true, message: 'Ariza muvaffaqiyatli topshirildi!' });
  } catch (error) {
    console.error('Error saving career application:', error);
    res.status(500).json({ success: false, error: 'Server xatoligi yuz berdi.' });
  }
});

// API: Get All Applications (for Developer CLI Terminal)
app.get('/api/applications', async (req, res) => {
  try {
    const applications = await NexaraApplication.find().sort({ date: -1 });
    res.status(200).json({ success: true, applications });
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ success: false, error: 'Server xatoligi.' });
  }
});

// API: Clear All Applications (for Developer CLI Terminal clearapplications)
app.delete('/api/applications', async (req, res) => {
  try {
    await NexaraApplication.deleteMany({});
    res.status(200).json({ success: true, message: 'Barcha arizalar o\'chirildi!' });
  } catch (error) {
    console.error('Error clearing applications:', error);
    res.status(500).json({ success: false, error: 'Server xatoligi.' });
  }
});

// Serve static assets from project root
app.use(express.static(path.join(__dirname)));

// Fallback all routes to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start listening
app.listen(port, () => {
  console.log(`🚀 Nexara server is running on port ${port}`);
});
