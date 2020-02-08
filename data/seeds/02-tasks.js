exports.seed = function(knex) {
  return knex("tasks").insert([
      {
          project_id: 1,
          task_name: 'finish endpoints',
          description: 'get and post need to be finished',
          completed: false
      },
      {
          project_id: 1,
          task_name: 'test front end',
          description: 'test with react-testing-library'
      },
      {
          project_id: 2,
          task_name: 'add to portfolio',
          description: 'add using react',
          completed: true
      },
      {
          project_id: 3,
          task_name: 'get it graded',
          description: 'talk to tl'
      }
  ]);
};
