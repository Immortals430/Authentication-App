const express = require('express');
const router = express.Router();
const homeController = require('../controller');
const passport = require('passport');

router.get('/', passport.checkAuthentication, homeController.home);
router.get('/signInPage', homeController.signInPage);
router.get('/signUpPage', homeController.signUpPage);
router.post('/signIn', passport.authenticate('local', { failureRedirect: '/signInPage', failureFlash: 'Invalid Username password'}), homeController.signIn);
router.post('/signUp', homeController.signUp);
router.get('/signOut', homeController.signOut);
router.post('/forgotPassword', homeController.forgotPassword);
router.get('/passUpdatePage/:token', homeController.passUpdatePage);
router.post('/updatePassword/', homeController.updatePassword);


// google oauth routes
router.get('/googleSignIn', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/users/auth/google/callback', passport.authenticate('google', { failureRedirect: '/signInPage', failureFlash: 'Failed to sign in' }), homeController.signIn);


module.exports = router;