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
        hover: false,
        onClick: function(){}
      };
    },
    render: function(){
      var this$ = this;
      return div({
        className: "card " + (this.props.hover ? 'hover' : ''),
        style: {
          left: this.props.position.x,
          top: this.props.position.y
        },
        onClick: function(){
          return this$.props.onClick.apply(this$, arguments);
        }
      }, this.props.value);
    }
  });
  module.exports = Card;
}).call(this);
