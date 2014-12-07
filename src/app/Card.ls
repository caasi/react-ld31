React = require 'react'

{ div } = React.DOM

Card = React.createClass do
  getDefaultProps: ->
    value: 0
    position:
      x: 0
      y: 0
    hover: no
    pass: no
    onClick: null
  render: ->
    div do
      className: 'card' +
        (if     @props.pass    then ' pass'     else '') +
        (if     @props.hover   then ' hover'    else '') +
        (unless @props.onClick then ' disabled' else '')
      style:
        left: @props.position.x
        top:  @props.position.y
      onClick: ~> @props.onClick? ...
      @props.value

module.exports = Card
