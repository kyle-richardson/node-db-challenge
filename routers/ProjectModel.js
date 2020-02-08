const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

module.exports = {
  getProjects,
  getTasks,
  getResources,
  getProjectById,
  getResourcesByProject,
  getTasksByProject
};

const checkBoolean = obj => {
    return {
        ...obj,
        completed: !!obj.completed
    }
}

function getProjects() {
    return db('projects')
        .then(table=> table.map(ele=> checkBoolean(ele)) || null)
}

function getTasks() {
    return db('tasks as t')
        .join('projects as p', 't.project_id', 'p.id')
        .select( 't.*', 'p.project_name', 'p.description as project_description')
        .then(table=> table.map(ele=> checkBoolean(ele)) || null)
}

function getResources() {
    return db('resources')
}

function getTasksByProject(id) {
    return db('tasks')
        .where('tasks.project_id', id)
        .then(table=> table.map(ele=> checkBoolean(ele)) || null)
}

function getProjectById(id) {
    return db('projects')
        .where({ id: Number(id) })
        .first()
        .then(table=> checkBoolean(table) || null)
}

function getResourcesByProject(id) {
    return db('projects as p')
        .join('projects_resources_br as b', 'b.project_id', 'p.id')
        .join('resources as r', 'b.resource_id', 'r.id')
        .select('r.resource_name')
        .where('p.id', id)
        .then(table => table || null)
}

