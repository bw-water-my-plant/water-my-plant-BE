const db = require('../database/dbConfig.js');

module.exports = {
    find,
    findById,
    add,
    update,
    remove
}

function find() {
    return db('plants');
}

function findById(id) {
    return db('plants')
    .where({ id })
    .first();
}

function add(plant) {
    return db('plants')
    .insert(plant, 'id')
    .then(ids => {
      return findById(ids[0]);
    });
}

function update (id, changes) {
    return db('plants')
    .where({ id })
    .update(changes);
}

function remove(id) {
    return db('plants')
    .where('id', id)
    .del();
}