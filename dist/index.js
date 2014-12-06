(function(){
  var React, App, time, nop, move, testHover, model, stack, cards, movers, i$, i, j, tmp, app, update;
  React = require('react');
  App = React.createFactory(require('./app/app'));
  require('./app/app.css');
  time = 0;
  nop = function(card){
    return card;
  };
  move = function(t0, duration, bgn, end, onEnd){
    return function(card, t){
      var dt, ratio, dx, dy;
      dt = t - t0;
      if (dt >= duration) {
        onEnd();
        return {
          value: card.value,
          position: end,
          hover: false,
          onClick: card.onClick
        };
      } else {
        ratio = dt / duration;
        dx = (end.x - bgn.x) * ratio;
        dy = (end.y - bgn.y) * ratio;
        return {
          value: card.value,
          position: {
            x: bgn.x + dx,
            y: bgn.y + dy
          },
          hover: true,
          onClick: card.onClick
        };
      }
    };
  };
  testHover = function(stack){
    var sum, i$, len$, num, r;
    sum = 0;
    for (i$ = 0, len$ = stack.length; i$ < len$; ++i$) {
      num = stack[i$];
      sum += num;
    }
    r = sum % 9;
    if (r === 0) {
      return 9;
    } else {
      return r;
    }
  };
  model = {
    stack: [1],
    cards: [],
    movers: []
  };
  stack = model.stack, cards = model.cards, movers = model.movers;
  for (i$ = 0; i$ < 9; ++i$) {
    (fn$.call(this, i$));
  }
  for (i$ = 0; i$ < 100; ++i$) {
    i = Math.floor(8 * Math.random());
    j = i + 1;
    console.log(i, j);
    tmp = cards[i].position;
    cards[i].position = cards[j].position;
    cards[j].position = tmp;
  }
  app = React.render(App({
    model: model
  }), document.getElementById('container'));
  update = function(t){
    var i$;
    time = t;
    for (i$ = 0; i$ < 9; ++i$) {
      (fn$.call(this, i$));
    }
    app.setProps({
      model: model
    });
    return requestAnimationFrame(update);
    function fn$(i){
      var card;
      card = movers[i](cards[i], time);
      card.hover || (card.hover = card.value === testHover(stack));
      cards[i] = card;
    }
  };
  requestAnimationFrame(update);
  function fn$(i){
    var value, card;
    value = i + 1;
    card = {
      value: value,
      position: {
        x: 110 * i,
        y: 100
      },
      hover: false,
      onClick: function(){
        var card, j, another, gap;
        card = cards[i];
        j = testHover(model.stack) - 1;
        another = cards[j];
        gap = Math.abs((card.position.x - another.position.x) / 110);
        movers[i] = move(time, 100 * gap, card.position, another.position, function(){
          return movers[i] = nop;
        });
        return movers[j] = move(time, 100 * gap, another.position, card.position, function(){
          movers[j] = nop;
          stack.push(card.value);
          return console.log(stack);
        });
      }
    };
    cards[i] = card;
    movers[i] = nop;
  }
}).call(this);
