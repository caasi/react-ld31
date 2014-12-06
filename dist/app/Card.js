(function(){
  var React, div, Card;
  React = require('react');
  div = React.DOM.div;
  Card = React.createClass({
    getDefaultProps: function(){
      return {
        value: 0,
        position: {
          x: 0,
          y: 0
        },
        hover: false
      };
    },
    render: function(){
      return div({
        className: "card " + (this.props.hover ? 'hover' : ''),
        style: {
          left: this.props.position.x,
          top: this.props.position.y
        }
      }, this.props.value);
    }
  });
  module.exports = Card;
}).call(this);
