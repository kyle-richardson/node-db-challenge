const express = require('express');

const db = require('./ProjectModel.js');

const router = express.Router();

router.get('/', (req, res) => {
    db.getTasks()
        .then(tasks => {
            res.status(200).json(tasks);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get tasks' });
        });
  });

module.exports = router;