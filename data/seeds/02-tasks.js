exports.seed = function(knex) {
  return knex("tasks").insert([
      {
          project_id: 1,
          description: 'get and post need to be finished',
          completed: false
      },
      {
          project_id: 1,
          description: 'test with react-testing-library'
      },
      {
          project_id: 2,
          description: 'add too portfolio using react',
          completed: true
      },
      {
          project_id: 3,
          description: 'talk to tl about grading'
      }
  ]);
};
