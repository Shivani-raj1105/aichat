const express = require('express');
const router = express.Router();

// Create a new chat session
router.post('/', async (req, res) => {
  try {
    const chat = {
      userId: req.body.userId,
      messages: [{
        role: 'assistant',
        content: 'Namaste! How can I help you today?',
        timestamp: new Date()
      }]
    };
    res.status(201).json(chat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add a message to chat
router.post('/:chatId/messages', async (req, res) => {
  try {
    const message = {
      role: req.body.role,
      content: req.body.content,
      timestamp: new Date()
    };
    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get chat history
router.get('/:chatId', async (req, res) => {
  try {
    // Return empty chat history since we're not using a database
    res.json({
      messages: [{
        role: 'assistant',
        content: 'Namaste! How can I help you today?',
        timestamp: new Date()
      }]
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// End chat session
router.put('/:chatId/end', async (req, res) => {
  try {
    // Since we're not using a database, just return a success response
    res.json({
      message: 'Chat session ended successfully',
      sessionEnd: new Date()
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router; 