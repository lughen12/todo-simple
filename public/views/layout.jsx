'use strict';

var React = require('react');

module.exports = React.createClass({

  render: function render() {

    return (
      <html>
        <head>
          <meta charSet='utf-8' />
          <title>
            {this.props.title}
          </title>

          <link rel='stylesheet' type='text/css' href='../bower_components/bootstrap/dist/css/bootstrap.min.css'/>
          <link rel='stylesheet' type='text/css' href='../css/main.css'/>
        </head>
        <body>
          {this.props.children}

          <script src='../bower_components/jquery/dist/jquery.min.js'></script>
          <script src='../bower_components/bootstrap/dist/js/bootstrap.min.js'></script>
          <script src='/bundle.js'></script>

        </body>
      </html>
    );
  }
});
