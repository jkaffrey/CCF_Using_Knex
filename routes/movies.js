'use strict';

var express = require('express'),
knex = require('../db/knex.js'),
router  = express.Router();
// pg      = require('pg'),
// db_url  = process.env.DATABASE_URL || 'postgres://localhost:5432/movie_inventory_crud';

function Movies() {

  return knex('movies');
}

function sortBy(toSort, queryObj) {

  var soryBy = Object.keys(queryObj)[0];
  var aD = (queryObj[soryBy] === 'asc' ? 1 : -1);
  return toSort.sort(function(a, b) {

    var aVar, bVar;

    switch (soryBy) {
      case 'title': aVar = a.title.toLowerCase(); bVar = b.title.toLowerCase(); break;
      case 'year': aVar = a.year; bVar = b.year; break;
      case 'date': aVar = a.date_obtained.toLowerCase(); bVar = b.date_obtained.toLowerCase(); break;
      case 'rating': aVar = a.rating; bVar = b.rating; break;
      case 'type': aVar = a.type.toLowerCase; bVar = b.type.toLowerCase(); break;
    }

    if (aVar > bVar) return -1 * aD;
    else if (aVar < bVar) return 1 * aD;
    else return 0;
  });
}

router.get('/', function(req, res) {

  Movies().select().then(function(data) {

    res.render('./index', { movies: data });
  });
  // pg.connect(db_url, function(err, client, done) {
  //
  //   done();
  //   if (err) console.log(err);
  //   else {
  //
  //
  //     client.query('SELECT * FROM movies', function(err, data) {
  //
  //       if (err) console.log(err);
  //       else {
  //
  //         if (Object.keys(req.query).length === 0) {
  //           res.render('./index', {movies: data.rows});
  //         }
  //         else {
  //           res.render('./index', {movies: sortBy(data.rows, req.query)});
  //         }
  //       }
  //     });
  //   }
  // });
});

router.get('/new', function(req, res) {

  res.render('./new');
});

router.get('/:id', function(req, res) {

  Movies().where('id', req.params.id).then(function(data) {

    res.render('./preview', { movie: data });
  }, function(err) {

    console.log(err);
  });
  // pg.connect(db_url, function(err, client, done) {
  //
  //   done();
  //   if (err) console.log(err);
  //   else {
  //
  //     client.query('SELECT * FROM movies WHERE id = $1', [req.params.id], function(err, data) {
  //
  //       if (err) console.log(err);
  //       else {
  //
  //         var movie = data.rows[0];
  //         if (!movie) res.redirect('');
  //         res.render('./preview', { movie: movie });
  //       }
  //     });
  //   }
  // });
});

router.get('/:id/edit', function(req, res) {

  Movies().where('id', req.params.id).then(function(data) {

    console.log(data);
    res.render('edit', { movie: data[0] });
  }, function(err) {

    console.log(err);
  });
  // pg.connect(db_url, function(err, client, done) {
  //
  //   done();
  //   if (err) console.log(err);
  //   else {
  //
  //     client.query('SELECT * FROM movies WHERE id=$1', [req.params.id], function(err, data) {
  //
  //       if (err) console.log(err);
  //       else {
  //
  //         var movie = data.rows[0];
  //         if (!movie) {
  //
  //           res.redirect('/');
  //         }
  //
  //         res.render('edit', { movie: movie });
  //       }
  //     });
  //   }
  // });
});

router.post('/', function(req, res) {

  Movies().insert({
    title: req.body.title,
    description: req.body.description,
    img_url: req.body.img_url,
    year: req.body.year,
    date_obtained: req.body.date_obtained,
    rating: req.body.rating,
    notes: req.body.notes,
    type: req.body.type
  }).then(function(data) {

    console.log(data);
    res.redirect('/');
  }, function(err) {

    console.log('ERROR: ' + err);
  });
  // pg.connect(db_url, function(err, client, done) {
  //
  //   done();
  //   if (err) console.log(err);
  //   else {
  //
  //     console.log(req.body);
  //     client.query('INSERT INTO movies VALUES(default, $1, $2, $3, $4, $5, $6, $7, $8)', [
  //       req.body.title,
  //       req.body.description,
  //       req.body.img_url,
  //       req.body.year,
  //       req.body.date_obtained,
  //       req.body.rating,
  //       req.body.notes,
  //       req.body.type
  //     ], function(err, data) {
  //
  //       if (err) console.log(err);
  //       else {
  //
  //         res.redirect('/');
  //       }
  //     });
  //   }
  // });
});

router.post('/:id/edit', function(req, res) {

  console.log(req.body);
  Movies().where({ id: req.params.id }).update({
    id: req.params.id,
    title: req.body.title,
    description: req.body.description,
    img_url: req.body.img_url,
    year: req.body.year,
    date_obtained: req.body.date_obtained,
    rating: req.body.rating,
    notes: req.body.notes,
    type: req.body.type
  }).then(function(data) {

    res.redirect('/');
  });
  // pg.connect(db_url, function(err, client, done) {
  //
  //   done();
  //   if (err) console.log(err);
  //   else {
  //
  //     client.query('UPDATE movies SET ( title, description, img_url, year, date_obtained, rating, notes, type ) = ( $2, $3, $4, $5, $6, $7, $8, $9) WHERE id = $1', [
  //       req.params.id,
  //       req.body.title,
  //       req.body.description,
  //       req.body.img_url,
  //       req.body.year,
  //       req.body.date_obtained,
  //       req.body.rating,
  //       req.body.notes,
  //       req.body.type
  //     ], function(err, data) {
  //
  //       if (err) console.log(err);
  //       else {
  //
  //         res.redirect('/');
  //       }
  //     });
  //   }
  // });
});

router.post('/:id/delete', function(req, res) {

  Movies().where({id: req.params.id}).del().then(function(data) {

    console.log(data);
    res.redirect('/');
  });
  // pg.connect(db_url, function(err, client, done) {
  //
  //   done();
  //   if (err) console.log(err);
  //   else {
  //
  //     client.query('DELETE FROM movies WHERE id = $1', [req.params.id], function(err, data) {
  //
  //       if (err) console.log(err);
  //       else {
  //
  //         res.redirect('/');
  //       }
  //     });
  //   }
  // });
});

module.exports = router;
