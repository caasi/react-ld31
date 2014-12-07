(function(){
  var React, Card, div, CardList;
  React = require('react');
  Card = React.createFactory(require('./Card'));
  div = React.DOM.div;
  CardList = React.createClass({
    getDefaultProps: function(){
      return {
        cards: []
      };
    },
    render: function(){
      var i, props;
      return div({
        className: 'card-list'
      }, (function(){
        var ref$, results$ = [];
        for (i in ref$ = this.props.cards) {
          props = ref$[i];
          results$.push(Card((props.key = i, props)));
        }
        return results$;
      }.call(this)));
    }
  });
  module.exports = CardList;
}).call(this);
