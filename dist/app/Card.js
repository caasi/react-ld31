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
        pass: false,
        onClick: null
      };
    },
    render: function(){
      var this$ = this;
      return div({
        className: 'card' + (this.props.pass ? ' pass' : '') + (this.props.hover ? ' hover' : '') + (!this.props.onClick ? ' disabled' : ''),
        style: {
          left: this.props.position.x,
          top: this.props.position.y
        },
        onClick: function(){
          var ref$;
          return typeof (ref$ = this$.props).onClick === 'function' ? ref$.onClick.apply(this$, arguments) : void 8;
        }
      }, this.props.value);
    }
  });
  module.exports = Card;
}).call(this);
