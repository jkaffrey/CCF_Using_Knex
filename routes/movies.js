'use strict';

var express = require('express'),
    router  = express.Router(),
    pg      = require('pg'),
    db_url  = process.env.DATABASE_URL || 'postgres://localhost:5432/movie_inventory_crud';

module.exports = router;
