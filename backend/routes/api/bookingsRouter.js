const express = require('express');
const router = express.Router();
const { Spot, Review, SpotImages, User, sequelize, ReviewImage, Booking } = require('../../db/models');
const { requireAuth, respondWith403, respondWithSuccessfulDelete } = require('../../utils/auth');
const models  = require('../../db/models');

//GET all Bookings owned by current user
router.get('/current', async (req, res) => {
    try {
      const bookings = await Booking.findAll({where: {userId: req.user.id}});
      res.status(200).json({ Bookings: bookings });
    }
    catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error'

      });
    }
  });

  module.exports = router;