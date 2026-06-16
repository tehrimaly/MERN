// Force Node to use a reliable public DNS resolver (fixes Node v24+ SRV network bugs on Windows)
require('node:dns/promises').setServers(['8.8.8.8', '1.1.1.1']);

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Import Database Models
const Car = require('./models/Car');
const Contact = require('./models/Contact');
const Subscriber = require('./models/Subscriber');

// Hardcoded seed data for initial setup
const initialCars = require('./data/cars');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ===== DATABASE CONNECTION & SEEDING =====
const connectOptions = {
  serverSelectionTimeoutMS: 10000, // Wait 10 seconds before timing out
  socketTimeoutMS: 45000,          // Close sockets after 45 seconds of inactivity
};

mongoose.connect(process.env.MONGO_URI, connectOptions)
  .then(async () => {
    console.log('🔌 MongoDB Connected Successfully to Cloud Atlas.');
    
    // Auto-seed data if database inventory collection is empty
    const carCount = await Car.countDocuments();
    if (carCount === 0) {
      console.log('📦 Inventory collection is empty. Seeding initial luxury fleet data...');
      await Car.insertMany(initialCars);
      console.log('✅ Database successfully seeded!');
    }
  })
  .catch(err => {
    console.error('❌ MongoDB Connection Error:', err.message);
  });

// ===== REST API ROUTES =====

/**
 * @route   GET /api/cars
 * @desc    Fetch filtered vehicles directly out of MongoDB via queries
 */
app.get('/api/cars', async (req, res) => {
  try {
    const { category, brand, price, fuel, trans } = req.query;
    let queryFilter = {};

    if (category && category !== 'all') {
      queryFilter.category = category;
    }
    if (brand && brand.trim() !== '') {
      queryFilter.brand = { $regex: new RegExp(`^${brand.trim()}$`, 'i') };
    }
    if (price && !isNaN(price)) {
      queryFilter.priceNum = { $lte: parseInt(price) };
    }
    if (fuel && fuel.trim() !== '') {
      queryFilter.specs = { $regex: new RegExp(fuel.trim(), 'i') };
    }
    if (trans && trans.trim() !== '') {
      queryFilter.specs = { $regex: new RegExp(trans.trim(), 'i') };
    }

    const cars = await Car.find(queryFilter);
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: 'Database error reading vehicle directory.' });
  }
});

/**
 * @route   POST /api/contact
 * @desc    Save client submission forms into MongoDB permanent storage
 */
app.post('/api/contact', async (req, res) => {
  try {
    const { fname, lname, femail, fcar, fmessage } = req.body;

    if (!fname || !femail) {
      return res.status(400).json({ error: 'First Name and Email are required.' });
    }

    const newContactLog = new Contact({ fname, lname, femail, fcar, fmessage });
    await newContactLog.save();

    console.log(`[DB SAVED]: Consultation logged for ${fname}`);
    res.status(201).json({ success: true, message: 'Consultation logged in secure database.' });
  } catch (error) {
    res.status(500).json({ error: 'Database error storing lead contact form.' });
  }
});

/**
 * @route   POST /api/newsletter
 * @desc    Add fresh unique email profiles to subscribers list
 */
app.post('/api/newsletter', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Please provide a valid structural email address.' });
    }

    // Check if duplicate subscription email already exists
    const existingSubscriber = await Subscriber.findOne({ email: email.toLowerCase() });
    if (existingSubscriber) {
      return res.status(400).json({ error: 'This email is already registered.' });
    }

    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    console.log(`[DB SAVED]: New mailing subscriber saved: ${email}`);
    res.status(201).json({ success: true, message: 'Mailing subscription permanently recorded.' });
  } catch (error) {
    res.status(500).json({ error: 'Database error handling newsletter sign-up.' });
  }
});

// App Startup
app.listen(PORT, () => {
  console.log(`======================================================`);
  console.log(`  AutoLux Database Server Engine Active on Port: ${PORT}`);
  console.log(`======================================================`);
});