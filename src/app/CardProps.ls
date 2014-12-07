class CardProps
  ({ @value, @position, @hover, @pass, @onClick }) ~>
  clone: ->
    CardProps do
      value: @value
      position:
        x: @position.x
        y: @position.y
      hover: @hover
      pass: @pass
      onClick: @onClick

module.exports = CardProps
