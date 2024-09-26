const express = require('express');
const router = express.Router();
const { Spot, Review, User, ReviewImage } = require('../../db/models');
const { requireAuth, respondWith403, respondWithSuccessfulDelete } = require('../../utils/auth');


// GET all reviews of the current user:
router.get('/current', requireAuth, async (req, res) => {
    try {
      const reviews = await Review.findAll({
        where: { userId: req.user.id },
        include: [
          {
            model: User,
            attributes: ['id', 'firstName', 'lastName']
          },
          {
            model: Spot,
            attributes: [
              'id', 'ownerId', 'address', 'city', 'state', 'country',
              'lat', 'lng', 'name', 'price', 'previewImage'
            ]
          },
          {
            model: ReviewImage,
            attributes: ['id', 'url']
          }
        ]
     });

      res.json({ Reviews: reviews });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
});

// Get all Reviews by a Spot's id
router.get('/spots/:spotId/reviews', async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    const reviews = await Review.findAll({
      where: { spotId: req.params.spotId },
      include: [
        { model: User, attributes: ['id', 'firstName', 'lastName'] },
        { model: ReviewImage, attributes: ['id', 'url'] }
      ]
    });

    res.json({ Reviews: reviews });
});

// Create a Review for a Spot based on the Spot's id
router.post('/spots/:spotId/reviews', requireAuth, async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId);
  if (!spot) {
    return res.status(404).json({ message: "Spot couldn't be found" });
  }

  const existingReview = await Review.findOne({
    where: { spotId: req.params.spotId, userId: req.user.id }
  });
  if (existingReview) {
    return res.status(500).json({ message: "User already has a review for this spot" });
  }

  const { review, stars } = req.body;
  if (!review || !stars || stars < 1 || stars > 5) {
    return res.status(400).json({
      message: "Bad Request",
      errors: {
        review: "Review text is required",
        stars: "Stars must be an integer from 1 to 5"
      }
    });
  }

  const newReview = await Review.create({
    userId: req.user.id,
    spotId: req.params.spotId,
    review,
    stars
  });

  res.status(201).json(newReview);
});

// Add an Image to a Review based on the Review's id
router.post('/reviews/:reviewId/images', requireAuth, async (req, res) => {
    const review = await Review.findByPk(req.params.reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review couldn't be found" });
    }

    if (review.userId !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const imageCount = await ReviewImage.count({ where: { reviewId: req.params.reviewId } });
    if (imageCount >= 10) {
      return res.status(403).json({ message: "Maximum number of images for this resource was reached" });
    }

    const { url } = req.body;
    const newImage = await ReviewImage.create({ reviewId: req.params.reviewId, url });

    res.status(201).json({ id: newImage.id, url: newImage.url });
});

// Edit a Review
router.put('/reviews/:reviewId', requireAuth, async (req, res) => {
    const review = await Review.findByPk(req.params.reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review couldn't be found" });
    }

    if (review.userId !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

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
});

// Delete a Review
router.delete('/reviews/:reviewId', requireAuth, async (req, res) => {
    const review = await Review.findByPk(req.params.reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review couldn't be found" });
    }

    if (review.userId !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await review.destroy();
    res.json({ message: "Successfully deleted" });
});


module.exports = router;
