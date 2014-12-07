React = require 'react'
Card  = React.createFactory require './Card'

{ div } = React.DOM

CardList = React.createClass do
  getDefaultProps: ->
    cards: []
  render: ->
    div do
      className: 'card-list'
      for i, props of @props.cards
        Card props <<< key: i

module.exports = CardList
