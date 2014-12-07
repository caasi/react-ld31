React     = require 'react'
CardList  = React.createFactory require './CardList'

{ div } = React.DOM

App = React.createClass do
  displayName: 'React.App'
  getDefaultProps: ->
    cards: []
  getInitialState: ->
    color: \red
  render: ->
    div do
      className: 'app'
      for i, cards of @props.cards
        CardList { key: i, cards }

module.exports = App
