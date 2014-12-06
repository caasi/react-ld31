(function(){
  var React, Card, div, App;
  React = require('react');
  Card = React.createFactory(require('./Card'));
  div = React.DOM.div;
  App = React.createClass({
    displayName: 'React.App',
    getDefaultProps: function(){
      return {
        model: {
          cards: []
        }
      };
    },
    getInitialState: function(){
      return {
        color: 'red'
      };
    },
    render: function(){
      var i, props;
      return div({
        className: 'app'
      }, (function(){
        var ref$, results$ = [];
        for (i in ref$ = this.props.model.cards) {
          props = ref$[i];
          results$.push(Card((props.key = i, props)));
        }
        return results$;
      }.call(this)));
    }
  });
  module.exports = App;
}).call(this);
