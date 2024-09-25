const express = require('express');
const router = express.Router();
const { Spot } = require('../../db/models/spot');
const { SpotImage } = require('../../db/models/SpotImages');

// Middleware function to log request details
const logRequestDetails = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

// Apply the middleware to the spotsRouter
router.use(logRequestDetails);

// GET /spots
router.get('/spots', async (req, res) => {
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

// Edit a spot
router.put('/api/spots/:spotId', /*requireAuth,*/ async (req, res) => {
  try {
    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }
    if (spot.ownerId !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await spot.update(req.body);
    res.status(200).json(spot);
  } catch (err) {
    console.error(err);
    res.status(400).json({
      message: 'Bad Request',
      errors: err.errors,
    });
  }
});

// Delete a spot
router.delete('/api/spots/:spotId', /*requireAuth,*/ async (req, res) => {
  try {
    const spot = await Spot.findByPk(req.params.spotId);
    if(!spot) {
      return res.status(404).json({ message: "Spot couldn't be found"})
    }
    if (spot.ownerId!== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await spot.destroy();
    res.status(200).json({ message: "Successfully deleted"})
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
