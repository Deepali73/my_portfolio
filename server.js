import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Contact form endpoint
app.post('/api/contact', (req, res) => {
  try {
    const { name, email, subject, message, timestamp, id } = req.body;
    
    // Create message object
    const messageData = {
      id,
      name,
      email,
      subject,
      message,
      timestamp,
      receivedAt: new Date().toISOString()
    };

    // Read existing messages from JSON file
    const messagesFilePath = path.join(__dirname, 'contact-messages.json');
    let messages = [];
    
    if (fs.existsSync(messagesFilePath)) {
      const fileContent = fs.readFileSync(messagesFilePath, 'utf8');
      messages = JSON.parse(fileContent);
    }

    // Add new message
    messages.push(messageData);

    // Write back to JSON file
    fs.writeFileSync(messagesFilePath, JSON.stringify(messages, null, 2));

    console.log('New contact message received:', messageData);
    
    res.status(200).json({ 
      success: true, 
      message: 'Message saved successfully',
      id: id 
    });

  } catch (error) {
    console.error('Error saving contact message:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to save message' 
    });
  }
});

// Get all messages endpoint (for admin purposes)
app.get('/api/contact', (req, res) => {
  try {
    const messagesFilePath = path.join(__dirname, 'contact-messages.json');
    
    if (fs.existsSync(messagesFilePath)) {
      const fileContent = fs.readFileSync(messagesFilePath, 'utf8');
      const messages = JSON.parse(fileContent);
      res.status(200).json({ success: true, messages });
    } else {
      res.status(200).json({ success: true, messages: [] });
    }
  } catch (error) {
    console.error('Error reading messages:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to read messages' 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Contact messages will be saved to: ${path.join(__dirname, 'contact-messages.json')}`);
}); 