(function(){
  var React, App, config, time, nop, move, create, shuffle, model, app, update;
  React = require('react');
  App = React.createFactory(require('./app/app'));
  require('./app/app.css');
  config = {
    card: {
      width: 100,
      height: 140,
      margin: 20
    },
    speed: 100
  };
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
  create = function(){
    var stack, cards, movers, model, swap, i$;
    stack = [1];
    cards = [];
    movers = [];
    model = {
      actived: stack[0],
      stack: stack,
      cards: cards,
      movers: movers
    };
    swap = function(t, i, j, onEnd){
      var src, dst, gap;
      src = cards[i];
      dst = cards[j];
      gap = Math.abs((src.position.x - dst.position.x) / (config.card.width + config.card.margin));
      movers[i] = move(t, config.speed * gap, src.position, dst.position, function(){
        return movers[i] = nop;
      });
      return movers[j] = move(t, config.speed * gap, dst.position, src.position, function(){
        movers[j] = nop;
        return onEnd();
      });
    };
    for (i$ = 0; i$ < 9; ++i$) {
      (fn$.call(this, i$));
    }
    return model;
    function fn$(i){
      var card;
      card = {
        value: i || 9,
        position: {
          x: (config.card.width + config.card.margin) * i,
          y: 0
        },
        hover: false,
        onClick: function(){
          return swap(time, i, model.actived, function(){
            stack.push(i);
            return model.actived = (model.actived + i) % 9;
          });
        }
      };
      cards[i] = card;
      movers[i] = nop;
    }
  };
  shuffle = function(arg$){
    var cards, i$, i, j, tmp, results$ = [];
    cards = arg$.cards;
    for (i$ = 0; i$ < 100; ++i$) {
      i = Math.floor(8 * Math.random());
      j = i + 1;
      tmp = cards[i].position;
      cards[i].position = cards[j].position;
      results$.push(cards[j].position = tmp);
    }
    return results$;
  };
  model = create();
  shuffle(model);
  app = React.render(App({
    model: model
  }), document.getElementById('container'));
  update = function(t){
    var cards, movers, i$;
    cards = model.cards, movers = model.movers;
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
      card.hover || (card.hover = i === model.actived);
      cards[i] = card;
    }
  };
  requestAnimationFrame(update);
}).call(this);
