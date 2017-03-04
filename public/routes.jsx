'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

var Layout = require('./views/layout.jsx');
var App = require('./views/app.jsx');

var routes = module.exports = (
  <Router>
    <Route path='/' component={Layout}>
      <IndexRoute component={App} />
    </Route>
  </Router>
);
