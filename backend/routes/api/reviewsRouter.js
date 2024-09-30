const express = require('express');
// const { Spot, Review, SpotImages, User, sequelize, ReviewImage, Booking } = require('../../db/models');
const { Spot, Reviews, User, ReviewImages } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();
const models  = require('../../db/models');

// GET all reviews of the current user
router.get('/current', async (req, res) => {
    try {
      const reviews = await models.Reviews.findAll({ where: { userId: req.user.id } });
      res.status(200).json({ Reviews: reviews });
    } catch (error) {
        console.error(error);
      res.status(500).json({ error: 'Failed to fetch reviews' });
    }
  });

// GET all reviews by a Spot's id
router.get('/spots/:spotId/reviews', async (req, res) => {
    try {
      const reviews = await models.Reviews.findAll({ where: { spotId: req.params.spotId } });
      res.status(200).json({ Reviews: reviews });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch reviews' });
    }
  });

  // Create a review for a spot based on the spot id
  router.post('/spots/:spotId/reviews', async (req, res) => {
    try {
      const { spotId, userId, review, stars } = req.body;
      const newReview = await models.Reviews.create({ spotId, userId, review, stars });
      res.status(201).json({ Reviews: newReview });
    } catch (error) {
        console.error(error);
      res.status(500).json({ error: 'Failed to create review' });
    }
  });

  // Add an image to a review based on the review's id
  router.post('/:reviewId/images', async (req, res) => {
    try {
      const review = await Reviews.findByPk(req.params.reviewId);
      if (!review) {
        return res.status(404).json({ message: "Review couldn't be found"});
      }

      // if (review.userId !== req.user.id) {
      //   return res.status(403).json({ message: "Forbidden" });
      // }

      const imageCount = await ReviewImages.count({ where: { reviewId: req.params.reviewId } });
      if (imageCount >= 10) {
        return res.status(403).json({ message: "Maximum number of images for this resource was reached" });
      }

      const { url } = req.body;
      const newImage = await ReviewImages.create({ reviewId: req.params.reviewId, url });

      res.status(201).json({ id: newImage.id, url: newImage.url });

    } catch (error) {
        console.error(error);
      res.status(500).json({ error: 'Failed to add image to review' });
    }
  });

  // Edit a review
  router.put('/:reviewId', async (req, res) => {
    try {
      const review = await Reviews.findByPk(req.params.reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review couldn't be found" });
    }

    // if (review.userId !== req.user.id) {
    //   return res.status(403).json({ message: "Forbidden" });
    // }

    const { review: reviewText, stars } = req.body;
    if (!reviewText || !stars || stars < 1 || stars > 5) {
      return res.status(400).json({
        message: "Bad Request",
        errors: {
          review: "Review text is required",
          stars: "Stars must be an integer from 1 to 5"
        }
      });
    }
    review.review = reviewText;
    review.stars = stars;
    await review.save();

    res.json(review);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update review' });
    }
  });

  // Delete a review
  router.delete('/:reviewId', async (req, res) => {
    try {
      const result = await Reviews.destroy({ where: { id: req.params.reviewId } });
      if (result) {
        res.json({ message: 'Review deleted successfully' });
      } else {
        res.status(404).json({ error: 'Review not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete review' });
    }
  });

  module.exports = router;
