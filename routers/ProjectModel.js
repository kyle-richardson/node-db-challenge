const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

module.exports = {
  getProjects,
  getTasks,
  getResources,
  getProjectById,
  getResourcesByProject,
  getTasksByProject,
  addTask,
  addResource,
  addProject,
  getResourceById,
  getTaskById,
  getProjectsByResource
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

function addProject(project) {
    return db('projects')
        .insert(project)
        .then(ind => getProjectById(ind) || null)
}

function getTasks() {
    return db('tasks as t')
        .join('projects as p', 't.project_id', 'p.id')
        .select( 't.*', 'p.project_name', 'p.description as project_description')
        .then(table=> table.map(ele=> checkBoolean(ele)) || null)
}

function addTask(task) {
    return db('tasks')
        .insert(task)
        .then(ind=> getTaskById(ind)||null)
}

//need to add array of projects that use the resource
function getResources() {
    return db('resources')
}

function addResource(resource) {
    return db('resources')
        .insert(resource)
        .then(ind=> getResourceById(ind)||null)
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

function getTaskById(id) {
    return db('tasks as t')
        .join('projects as p', 't.project_id', 'p.id')
        .select( 't.*', 'p.project_name', 'p.description as project_description')
        .where('t.id', id)
        .first()
        .then(table=> checkBoolean(table) || null)
    }

function getResourceById(id) {
    return db('resources as r')
        .where('r.id', id)
        .first()
}

function getProjectsByResource(res_id){
    return db('resources as r')
        .join('projects_resources_br as b', 'b.resource_id', 'r.id')
        .join('projects as p', 'b.project_id', 'p.id')
        .select('p.project_name')
        .where('r.id', res_id)
        .then(table => table || null)
}

function getResourcesByProject(prj_id) {
    return db('projects as p')
        .join('projects_resources_br as b', 'b.project_id', 'p.id')
        .join('resources as r', 'b.resource_id', 'r.id')
        .select('r.resource_name')
        .where('p.id', prj_id)
        .then(table => table || null)
}

