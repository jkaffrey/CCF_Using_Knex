'use strict';

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/movie_inventory_crud'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }

};
