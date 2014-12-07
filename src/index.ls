React = require 'react'
App   = React.createFactory require './app/app'
require './app/app.css'

##
# model and status
config =
  card:
    width:  100
    height: 140
    margin: 20
  speed: 100

time = 0

nop = (card) -> card
move = (t0, duration, bgn, end, onEnd) -> (card, t) ->
  dt = t - t0
  if dt >= duration
    onEnd!
    value: card.value
    position: end
    hover: no
    onClick: card.onClick
  else
    ratio = dt / duration
    dx = (end.x - bgn.x) * ratio
    dy = (end.y - bgn.y) * ratio
    value: card.value
    position:
      x: bgn.x + dx
      y: bgn.y + dy
    hover: yes
    onClick: card.onClick

create = ->
  stack = [1]
  cards = []
  movers = []
  model = { actived: stack.0, stack, cards, movers }
  swap = (t, i, j, onEnd) ->
    src = cards[i]
    dst = cards[j]
    gap = Math.abs do
      (src.position.x - dst.position.x) /
      (config.card.width + config.card.margin)
    movers[i] = move do
      t, config.speed * gap
      src.position
      dst.position
      ->
        movers[i] = nop
    movers[j] = move do
      t, config.speed * gap
      dst.position
      src.position
      ->
        movers[j] = nop
        onEnd!
  for let i til 9
    card =
      value: i or 9
      position:
        x: (config.card.width + config.card.margin) * i
        y: 0
      hover: no
      onClick: ->
        swap do
          time
          i, model.actived
          ->
            stack.push i
            model.actived = (model.actived + i) % 9
    cards[i]  = card
    movers[i] = nop
  model

shuffle = ({ cards }) ->
  for til 100
    i = Math.floor 8 * Math.random!
    j = i + 1
    tmp = cards[i].position
    cards[i].position = cards[j].position
    cards[j].position = tmp

##
# main
model = create!
shuffle model

app = React.render do
  App { model }
  document.getElementById \container

update = (t) ->
  { cards, movers } = model
  time := t
  for let i til 9
    card = movers[i] cards[i], time
    card.hover or= i is model.actived
    cards[i] = card
  app.setProps { model }
  requestAnimationFrame update
requestAnimationFrame update
