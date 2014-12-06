React = require 'react'

{ div } = React.DOM

Card = React.createClass do
  getDefaultProps: ->
    value: 0
    position:
      x: 0
      y: 0
    hover: no
    onClick: ->
  render: ->
    div do
      className: "card #{if @props.hover then 'hover' else ''}"
      style:
        left: @props.position.x
        top:  @props.position.y
      onClick: ~> @props.onClick ...
      @props.value

module.exports = Card
