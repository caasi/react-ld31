React = require 'react'
App   = React.createFactory require './app/app'
require './app/app.css'

##
# model and status
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

test-hover = (stack) ->
  sum = 0
  for num in stack => sum += num
  r = sum % 9
  if r is 0 then 9 else r

model =
  stack: [1]
  cards: []
  movers: []

{ stack, cards, movers } = model
for let i til 9
  value = i + 1
  card =
    value: value
    position:
      x: 110 * i
      y: 100
    hover: no
    onClick: ->
      card = cards[i]
      j = test-hover(model.stack) - 1
      another = cards[j]
      gap = Math.abs (card.position.x - another.position.x) / 110
      movers[i] = move do
        time, 100 * gap
        card.position
        another.position
        ->
          movers[i] = nop
      movers[j] = move do
        time, 100 * gap
        another.position
        card.position
        ->
          movers[j] = nop
          stack.push card.value
          console.log stack
  cards[i]  = card
  movers[i] = nop
# shuffle
for til 100
  i = Math.floor 8 * Math.random!
  j = i + 1
  console.log i, j
  tmp = cards[i].position
  cards[i].position = cards[j].position
  cards[j].position = tmp

##
# main
app = React.render do
  App { model }
  document.getElementById \container

update = (t) ->
  time := t
  for let i til 9
    card = movers[i] cards[i], time
    card.hover or= card.value is test-hover stack
    cards[i] = card
  app.setProps { model }
  requestAnimationFrame update
requestAnimationFrame update
