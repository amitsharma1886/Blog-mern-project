router.post('/', async (req, res) => {
  const { postId, reviewer, rating, comment } = req.body;
  const review = new Review({ postId, reviewer, rating, comment });
  await review.save();
  res.status(201).json(review);
});

router.get('/:postId', async (req, res) => {
  const reviews = await Review.find({ postId: req.params.postId });
  res.json(reviews);
});
