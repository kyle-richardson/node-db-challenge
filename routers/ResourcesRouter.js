const express = require('express');

const db = require('./ProjectModel.js');

const router = express.Router();

router.get('/', (req, res) => {
    db.getResources()
        .then(resources => {
            res.status(200).json(resources);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get resources', error: err });
        });
  });

router.get('/:id', async (req, res) => {
    const {id} = req.params
    try {
        const resourceObj = 
        {
            ...await db.getResourceById(id),
            projects_that_use: await db.getProjectsByResource(id),
        }
        res.status(200).json(resourceObj)
    }
    catch {
        res.status(500).json({ message: 'failed to get resource'})
    }
});

router.post('/', (req, res) => {
    const newResource = req.body
    db.addResource(newResource)
        .then(promise => {
            res.status(200).json(promise);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to add resource' , error: err});
        });
});

module.exports = router;