const express = require('express');
const router = express.Router();
const { Spot, SpotImage } = require('../../../db/models');

// GET /spots
router.get('/api/spots', async (req, res) => {
    try {
      const spots = await Spot.findAll();
      res.status(200).json({ Spots: spots });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
// GET all spots owned by Current User
router.get('/api/spots/current', async (req, res) => {
    try {
      const spots = await Spot.findAll({ where: { ownerId: req.user.id } });
      res.status(200).json({ Spots: spots });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


// Get details of a spot from an id
router.get('/api/spots/:spotId', async (req, res) => {
    try {
      const spot = await Spot.findByPk(req.params.spotId, {
        include: [
          { model: SpotImage },
          { model: User, as: 'Owner', attributes: ['id', 'firstName', 'lastName'] },
        ],
      });
      if (!spot) {
        return res.status(404).json({ message: "Spot couldn't be found" });
      }
      res.status(200).json(spot);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
});

// Create a spot
router.post('/api/spots', async (req, res) => {
    try {
      const newSpot = await Spot.create({
        ...req.body,
        ownerId: req.user.id,
      });
      res.status(201).json(newSpot);
    } catch (err) {
      console.error(err);
      res.status(400).json({
        message: 'Bad Request',
        errors: err.errors,
      });
    }
});
module.exports = router;
