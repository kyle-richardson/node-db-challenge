
exports.up = function(knex) {
    return knex.schema
    .createTable('projects', tbl => {
        tbl.increments()
        tbl.string('project_name', 128)
            .unique()
            .notNullable()
        tbl.string('description', 128)
        tbl.boolean('completed')
            .defaultTo(false)
    })
    .createTable('tasks', tbl => {
        tbl.increments()
        tbl.string('description', 128)
            .notNullable()
        tbl.string('notes', 128)
        tbl.boolean('completed')
            .defaultTo(false)
        tbl.integer('project_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('projects')
    })
    .createTable('resources', tbl => {
        tbl.increments();
        tbl.string('resource_name', 128)
            .notNullable()
        tbl.string('description', 128)
        
    })
    .createTable('projects_resources_br', tbl => {
        tbl.integer('project_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('projects')
        tbl.integer('resource_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('resources')
        tbl.primary(['project_id', 'resource_id'])
    })

};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('projects_resources_br')
    .dropTableIfExists('resources')
    .dropTableIfExists('tasks')
    .dropTableIfExists('projects')
};
