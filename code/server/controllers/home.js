/*
 * server/controllers/home.js
 */

'use strict';

var app = require('../app');

function index(req, res) {
  res.render('home/index');
}

function dashboard(req, res) {
  res.render('home/dashboard', {
    hello: 'Your history, options and statistics here'
  });
}

function page(req, res) {
  res.render('home/page', {
    layout: 'static',
    documentTitle: 'About',
    navTitle: 'About'
  });
}

function task(req, res, next) {
  app.bbq.create('Test.Add', {
    a: 1,
    b: 2
  }).save(function (err) {
    if (err) { return next(err); }
    res.send('Scheduled task. (`node worker` to process)');
  });
}

// Public API
exports.index = index;
exports.dashboard = dashboard;
exports.page = page;
exports.task = task;
