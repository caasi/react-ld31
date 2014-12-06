React = require 'react'
Card  = React.createFactory require './Card'

App = React.createClass do
  displayName: 'React.App'
  getInitialState: ->
    color: \red
  render: ->
    Card do
      position:
        x: 100
        y: 100

module.exports = App
