const express = require('express');
const router = express.Router();
// console.log("before import");
// const { Spot } = require('../../db/models');
// // console.log("after import, Spot:", Spot);
// const { SpotImage } = require('../../db/models/SpotImages.js');
const { Spots, Review, SpotImages, User, sequelize, ReviewImage, Booking } = require('../../db/models');
const { requireAuth, respondWith403, respondWithSuccessfulDelete } = require('../../utils/auth');
// models  = require('../../db/models');
models  = require('../../db/models');

// Middleware function to log request details
// const logRequestDetails = (req, res, next) => {
//   console.log(`${req.method} ${req.url}`);
//   next();
// };

// Apply the middleware to the spotsRouter
// router.use(logRequestDetails);

// GET /spots
router.get('/', async (req, res) => {
    try {
      const spots = await models.Spot.findAll();
      res.status(200).json({ Spots: spots });
    }
    catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error'

      });
    }
  });
// GET all spots owned by Current User
router.get('/current', async (req, res) => {
    try {
      // const { ownerId } = req.query;
      // if (!ownerId) {
      //   return res.status(400).json({ message: "ownerId is required" });
      // }

      const spot = await models.Spot.findAll({ where: { ownerId: req.user.id } });
      res.status(200).json({ Spots: spot });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }

  });


// Get details of a spot from an id
router.get('/:spotId', async (req, res) => {
    try {
      // const { User } = req.query;
      // if (!User) {
      //   return res.status(400).json({ message: "Id is required" })
      // }
      const spot = await models.Spot.findByPk(req.params.spotId, {
        include: [
          // { model: SpotImages },
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
router.post('/', async (req, res) => {
    try {
      const newSpot = await models.Spot.create({
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
router.put('/:spotId', requireAuth, async (req, res) => {
  try {
    const spot = await models.Spot.findByPk(req.params.spotId);
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
router.delete('/:spotId', requireAuth, async (req, res) => {
  try {
    const spot = await models.Spot.findByPk(req.params.spotId);
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

// Add an image to a Spot based on Spot's id
router.post('/:spotId/images', requireAuth, async (req, res) => {
  const { spotId } = req.params;
  const { url, preview } = req.body;
  try {
    const existingImage = await SpotImages.findOne({ where: { spotId, preview } });

    if (existingImage) {
      return res.status(400).json({ error: 'A spot image with the same spotId and preview already exists' });
    }

    const newImage = await SpotImages.create({ spotId, url, preview });
    res.status(201).json({ message: 'Spot image added successfully', data: newImage });

    if (!Spots) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    if (Spots.ownerId !== req.user.id) {
      console.error(Spots.ownerId !== req.user.id);
      return res.status(403).json({ message: "Forbidden" });
    }

    res.status(201).json({
      id: newImage.id,
      url: newImage.url,
      preview: newImage.preview
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
