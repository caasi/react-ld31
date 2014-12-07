(function(){
  var React, CardList, div, App;
  React = require('react');
  CardList = React.createFactory(require('./CardList'));
  div = React.DOM.div;
  App = React.createClass({
    displayName: 'React.App',
    getDefaultProps: function(){
      return {
        cards: []
      };
    },
    getInitialState: function(){
      return {
        color: 'red'
      };
    },
    render: function(){
      var i, cards;
      return div({
        className: 'app'
      }, (function(){
        var ref$, results$ = [];
        for (i in ref$ = this.props.cards) {
          cards = ref$[i];
          results$.push(CardList({
            key: i,
            cards: cards
          }));
        }
        return results$;
      }.call(this)));
    }
  });
  module.exports = App;
}).call(this);
