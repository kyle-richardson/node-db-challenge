const express = require('express');

const ProjectRouter = require('./routers/ProjectRouter.js');
const TasksRouter = require('./routers/TasksRouter.js');
const ResourcesRouter = require('./routers/ResourcesRouter.js');

const server = express();

server.use(express.json());
server.use('/api/projects', ProjectRouter)
server.use('/api/tasks', TasksRouter)
server.use('/api/resources', ResourcesRouter)

module.exports = server;