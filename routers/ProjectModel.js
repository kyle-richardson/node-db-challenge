const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

module.exports = {
  getProjects,
  getTasks,
  getProjectById,
  getResourcesByProject,
  getTasksByProject
};

function getProjects() {
    return db('projects');
}

function getTasks() {
    return db('tasks');
}

function getTasksByProject(id) {
    return db('tasks')
        .where('tasks.project_id', id)
        .then(tasks=> tasks || null)
}

function getProjectById(id) {
    return db('projects')
        .where({ id: Number(id) })
        .first()
        .then(project => project || null)
}

function getResourcesByProject(id) {
    return db('projects as p')
        .join('projects_resources_br as b', 'b.project_id', 'p.id')
        .join('resources as r', 'b.resource_id', 'r.id')
        .select('p.project_name', 'r.resource_name')
        .where('p.id', id)
        .then(table => table || null)
}
// function getShoppingList(recipe_id) {
//     return db('recipes as r')
//         .join('ingredients as i', 'r.id', 'i.recipe_id')
//         .join('measurements as m', 'i.measure_id', 'm.id')
//         .select('i.id', 'r.recipe_name', 'i.item_name', 'i.quantity', 'm.measurement_name')
//         .where('r.id', recipe_id)
//         .then(table=> table || null)
// }

// function getInstructions(recipe_id) {
//     return db('recipes as r')
//         .join('instructions as i', 'r.id', 'i.recipe_id')
//         .select('i.id','r.recipe_name','i.step_number', 'i.step')
//         .where('r.id', recipe_id)
//         .orderBy('i.step_number', 'asc')
//         .then(table=> table || null)
// }
// function getRecipesForIngredient(ingred_id) {
//     return db('recipes as r')
//         .join('instructions as i', 'r.id', 'i.recipe_id')
//         .select('r.recipe_name as recipe')
//         .where('i.id', ingred_id)
//         .then(table=> table || null)
// }
