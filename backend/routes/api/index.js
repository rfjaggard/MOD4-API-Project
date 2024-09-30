// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spotsRouter.js')
const reviewImagesRouter = require('./reviewImagesRouter.js');
const spotImagesRouter = require('./spotImagesRouter.js');
const reviewsRouter = require('./reviewsRouter.js');
const { restoreUser } = require("../../utils/auth.js");

// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null
router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/spots', spotsRouter);

router.use('/review-images', reviewImagesRouter);

router.use('/spot-images', spotImagesRouter)

router.use('/reviews', reviewsRouter);

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;
