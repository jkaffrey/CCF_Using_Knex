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

          res.render('./index', {movies: data.rows});
        }
      });
    }
  });
});

router.get('/new', function(req, res) {

  res.render('./new');
});

router.get('/:id', function(req, res) {

  pg.connect(db_url, function(err, client, done) {

    done();
    if (err) console.log(err);
    else {

      client.query('SELECT * FROM movies WHERE id = $1', [req.params.id], function(err, data) {

        if (err) console.log(err);
        else {

          var movie = data.rows[0];
          if (!movie) res.redirect('');
          res.render('./preview', { movie: movie });
        }
      });
    }
  });
});

router.get('/:id/edit', function(req, res) {

  pg.connect(db_url, function(err, client, done) {

    done();
    if (err) console.log(err);
    else {

      client.query('SELECT * FROM movies WHERE id=$1', [req.params.id], function(err, data) {

        if (err) console.log(err);
        else {

          var movie = data.rows[0];
          if (!movie) {

            res.redirect('/');
          }

          res.render('edit', { movie: movie });
        }
      });
    }
  });
});

router.post('/', function(req, res) {

  pg.connect(db_url, function(err, client, done) {

    done();
    if (err) console.log(err);
    else {

      console.log(req.body);
      client.query('INSERT INTO movies VALUES(default, $1, $2, $3, $4, $5, $6, $7, $8)', [
        req.body.title,
        req.body.description,
        req.body.img_url,
        req.body.year,
        req.body.date_obtained,
        req.body.rating,
        req.body.notes,
        req.body.type
      ], function(err, data) {

        if (err) console.log(err);
        else {

          res.redirect('/');
        }
      });
    }
  });
});

router.post('/:id/edit', function(req, res) {

  pg.connect(db_url, function(err, client, done) {

    done();
    if (err) console.log(err);
    else {

      client.query('UPDATE movies SET ( title, description, img_url, year, date_obtained, rating, notes, type ) = ( $2, $3, $4, $5, $6, $7, $8, $9) WHERE id = $1', [
        req.params.id,
        req.body.title,
        req.body.description,
        req.body.img_url,
        req.body.year,
        req.body.date_obtained,
        req.body.rating,
        req.body.notes,
        req.body.type
      ], function(err, data) {

        if (err) console.log(err);
        else {

          res.redirect('/');
        }
      });
    }
  });
});

router.post('/:id/delete', function(req, res) {

  pg.connect(db_url, function(err, client, done) {

    done();
    if (err) console.log(err);
    else {

      client.query('DELETE FROM movies WHERE id = $1', [req.params.id], function(err, data) {

        if (err) console.log(err);
        else {

          res.redirect('/');
        }
      });
    }
  });
});

module.exports = router;
