exports.seed = function(knex) {
  return knex('resources').insert([
    {resource_name: 'macbook air'},
    {resource_name: 'projector'},
    {resource_name: 'conference room'},
    {resource_name: 'breakout room'},
    {resource_name: 'desk'},
    {resource_name: 'printer'},

  ]);
};
