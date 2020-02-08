exports.seed = function(knex) {
  return knex('projects').insert([
    {
      project_name: 'node db 1',
      completed: true
    },
    {
      project_name: 'node db 2',
      description: 'this one was ez pz',
      completed: true
    },
    {
      project_name: 'node api 1',
      description: 'wowza, hard one here'
    },
    {
      project_name: 'node api 2'
    }
  ]);
};
