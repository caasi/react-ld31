React = require 'react'
Card  = React.createFactory require './Card'

{ div } = React.DOM

App = React.createClass do
  displayName: 'React.App'
  getDefaultProps: ->
    model:
      cards: []
  getInitialState: ->
    color: \red
  render: ->
    div do
      className: 'app'
      for i, props of @props.model.cards
        Card props <<< key: i

module.exports = App
