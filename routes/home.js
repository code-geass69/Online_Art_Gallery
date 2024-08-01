const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/contact', (req, res) => {
    res.render('contact');
});

router.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).send('All fields are required');
    }

    const contact = new Contact({ name, email, message });

    try {
        await contact.save();
        res.status(201).send('Contact information saved successfully');
    } catch (error) {
        console.error('Error saving contact information:', error);
        res.status(500).send('Error saving contact information');
    }
});

module.exports = router;
