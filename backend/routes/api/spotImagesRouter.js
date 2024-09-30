const express = require('express');
const router = express.Router();
const { Spot, SpotImages } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
// const models = require('../../db/models');
// Delete a Spot Image
router.delete('/:imageId', requireAuth, async (req, res) => {
    try {
        const spotImage = await SpotImages.findByPk(req.params.imageId, {
            include: [{
                model: Spot,
                attributes: ['ownerId']
            }]
        });

        if (!spotImage) {
            return res.status(404).json({ message: "Spot Image couldn't be found" });
        }

        if (spotImage.Spot.ownerId !== req.user.id) {
            return res.status(403).json({ message: "Forbidden" });
        }

        await SpotImages.destroy({
            where: {id: req.params.imageId}
        });
        res.status(200).json({ message: "Successfully deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
