import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Contact Form
  app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const emailUser = process.env.EMAIL_USER?.trim();
    const emailPass = process.env.EMAIL_PASS?.trim();

    console.log('Attempting to send email...');
    console.log('EMAIL_USER defined:', !!emailUser);
    console.log('EMAIL_PASS defined:', !!emailPass);

    if (!emailUser || !emailPass) {
      console.error('CRITICAL: Email credentials missing in environment variables');
      return res.status(500).json({ 
        error: 'Server configuration error: Missing credentials',
        details: 'Please ensure EMAIL_USER and EMAIL_PASS are set in AI Studio Secrets.'
      });
    }

    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: emailUser,
          pass: emailPass,
        },
      });

      // Verify connection configuration
      try {
        await transporter.verify();
        console.log('Transporter verified successfully');
      } catch (verifyError: any) {
        console.error('Transporter verification failed:', verifyError);
        
        let friendlyMessage = 'Invalid login credentials.';
        if (verifyError.message?.includes('535-5.7.8')) {
          friendlyMessage = 'Gmail rejected the login. This usually means you need to use a 16-character App Password, not your regular password. Ensure 2-Step Verification is enabled on your Google Account.';
        }

        return res.status(500).json({ 
          error: 'Email verification failed', 
          details: friendlyMessage,
          rawError: verifyError.message
        });
      }

      const mailOptions = {
        from: emailUser,
        to: 'mrfishhasnoname@gmail.com',
        subject: `New Message from Portfolio: ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      };

      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Failed to send email' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
