
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const Metric = require('../models/Metric');

// @route    POST api/metrics
// @desc     Add new metric
// @access   Private
router.post(
  '/',
  [
    auth,
    [
      check('steps', 'Steps are required').not().isEmpty(),
      check('sleep', 'Sleep is required').not().isEmpty(),
      check('calories', 'Calories are required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { steps, sleep, calories } = req.body;

    try {
      const newMetric = new Metric({
        user: req.user.id,
        steps,
        sleep,
        calories
      });

      const metric = await newMetric.save();

      res.json(metric);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    GET api/metrics
// @desc     Get all metrics
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const metrics = await Metric.find({ user: req.user.id }).sort({ date: -1 });
    res.json(metrics);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
    