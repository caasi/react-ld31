React     = require 'react'
CardProps = require './app/CardProps'
App       = React.createFactory require './app/App'
require './app/App.css'

##
# model and status
config =
  card:
    width:  100
    height: 140
    margin:
      right:  10
      bottom: 14
  speed: 200

time = 0

nop = (card) -> card
move = (t0, duration, bgn, end, onMove, onEnd) -> (card, t) ->
  dt = t - t0
  if dt >= duration
    setTimeout onEnd, 0
    CardProps do
      value: card.value
      position: end
      hover: no
      pass: no
      onClick: card.onClick
  else
    setTimeout onMove, 0
    ratio = dt / duration
    dx = (end.x - bgn.x) * ratio
    dy = (end.y - bgn.y) * ratio
    CardProps do
      value: card.value
      position:
        x: bgn.x + dx
        y: bgn.y + dy
      hover: yes
      pass: no
      onClick: card.onClick

create = ->
  stack = [1]
  cards = []
  movers = []
  model = { actived: stack.0, stack, cards: [cards], movers }
  for let i til 9
    movers[i] = nop
    cards[i] = CardProps do
      value: i or 9
      position:
        x: (config.card.width + config.card.margin.right) * i
        y: 0
      hover: no
      onClick: ->
        next = model.cards.length
        curr = next - 1
        model.cards[next] = []
        for let j, props of model.cards[curr]
          model.cards[next][j] = props.clone!
          props
            ..hover = no
            ..onClick = null
        src = model.cards[next][i]
        dst = model.cards[next][model.actived]
        stack.push i
        model.actived = (model.actived + i) % 9
        for let j, card of model.cards[next]
          movers[j] = move do
            time, config.speed
            card.position
            {
              x:
                if card is src
                  dst.position.x
                else if card is dst
                  src.position.x
                else
                  card.position.x
              y: (config.card.height + config.card.margin.bottom) * next
            }
            -> window.scrollTo 0, document.body.scrollHeight
            -> movers[j] = nop
  model

shuffle = ({ cards }) ->
  cards = cards.0
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
console.log model

app = React.render do
  App model
  document.getElementById \container

update = (t) ->
  { cards, movers } = model
  cards = cards[*-1] # last row
  time := t
  pass = true
  for let i til 9
    card = movers[i] cards[i], time
    card.hover or= i is model.actived
    if card.position.x isnt (config.card.width + config.card.margin.right) * (card.value - 1)
      pass := false
    cards[i] = card
  console.log pass
  if pass
    for card in cards
      card
        ..pass = yes
        ..onClick = null
  else
    requestAnimationFrame update
  app.setProps model
requestAnimationFrame update
