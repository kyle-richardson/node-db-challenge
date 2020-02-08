const express = require('express');

const db = require('./ProjectModel.js');

const router = express.Router();

router.get('/', (req, res) => {
    db.getTasks()
        .then(tasks => {
            res.status(200).json(tasks);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get tasks', error: err });
        });
  });

router.get('/:id', (req, res) => {
    const {id} = req.params
    db.getTaskById(id)
        .then(task=> {
            res.status(200).json(task)
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get task', error: err });
        });
})

router.post('/', (req, res) => {
    const newTask = req.body
    db.addTask(newTask)
        .then(promise => {
            res.status(200).json(promise);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to add task' , error: err});
        });
});
module.exports = router;