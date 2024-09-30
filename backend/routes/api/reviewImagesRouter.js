const express = require('express');
const router = express.Router();
const { Review, ReviewImages } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

// Delete a Review Image
router.delete('/:imageId', requireAuth, async (req, res) => {
    try {
        const reviewImage = await ReviewImages.findByPk(req.params.imageId, {
            include: [{
                model: Review,
                attributes: ['userId']
            }]
        });

        if (!reviewImage) {
            return res.status(404).json({ message: "Review Image couldn't be found" });
        }

        if (reviewImage.Review.userId !== req.user.id) {
            return res.status(403).json({ message: "Forbidden" });
        }

        await reviewImage.destroy();
        res.status(200).json({ message: "Successfully deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
