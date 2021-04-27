const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');
const bcrypt = require('bcryptjs');

// User model
const User = require('../models/User');
const Adoption = require('../models/Adoption');

// Welcome Page
router.get('/', (req, res) => res.render('welcome'));
// dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => res.render('dashboard', {
    name: req.user.name
}));

// contact
router.get('/Contact', ensureAuthenticated, (req, res) => res.render('Contact', {
    name: req.user.name
}));

// lost
router.get('/Adoption', ensureAuthenticated, (req, res) => res.render('Adoption', {
    name: req.user.name
}));
// lost
router.post('/Adoption', (req, res) => {
    const { name, email, text, } = req.body;

const newAdoption = new Adoption({
                  name,
                  email,
                  text 
                });
                        // save user
                        newAdoption.save()
                        .then(user => {
                            req.flash('succes_msg', 'You are now registered and can log in');
                            res.redirect('/dashboard');
                        })
                        .catch(err => console.log(err));
            }
);
module.exports = router;
