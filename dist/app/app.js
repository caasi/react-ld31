(function(){
  var React, Card, App;
  React = require('react');
  Card = React.createFactory(require('./Card'));
  App = React.createClass({
    displayName: 'React.App',
    getInitialState: function(){
      return {
        color: 'red'
      };
    },
    render: function(){
      return Card({
        position: {
          x: 100,
          y: 100
        }
      });
    }
  });
  module.exports = App;
}).call(this);
