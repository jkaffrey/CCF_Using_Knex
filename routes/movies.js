'use strict';

var express = require('express'),
    router  = express.Router(),
    pg      = require('pg'),
    db_url  = process.env.DATABASE_URL || 'postgres://localhost:5432/movie_inventory_crud';

router.get('/', function(req, res) {

  pg.connect(db_url, function(err, client, done) {

    done();
    if (err) console.log(err);
    else {

      client.query('SELECT * FROM movies', function(err, data) {

        if (err) console.log(err);
        else {

          console.log(data.rows);
          res.render('./index', {movies: data.rows});
        }
      });
    }
  });
});

router.get('/new', function(req, res) {

});

router.get('/:id/edit', function(req, res) {

});

router.post('/', function(req, res) {

});

router.post('/:id/edit', function(req, res) {

});

router.post('/:id/delete', function(req, res) {

});

module.exports = router;
