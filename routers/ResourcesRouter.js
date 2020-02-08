const express = require('express');

const db = require('./ProjectModel.js');

const router = express.Router();

router.get('/', (req, res) => {
    db.getResources()
        .then(resources => {
            res.status(200).json(resources);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get resources' });
        });
  });

module.exports = router;