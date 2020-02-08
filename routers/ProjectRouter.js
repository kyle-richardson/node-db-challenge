const express = require('express');

const db = require('./ProjectModel.js');

const router = express.Router();

router.get('/', (req, res) => {
    db.getProjects()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get projects' });
        });
  });

router.get('/:id', async (req, res) => {
    const {id} = req.params
    try {
        const projectObj = 
        {
            ...await db.getProjectById(id),
            tasks: await db.getTasksByProject(id),
            resources: await db.getResourcesByProject(id)
        }
        res.status(200).json(projectObj)
    }
    catch {
        res.status(500).json({ error: 'server error'})
    }
})

module.exports = router;