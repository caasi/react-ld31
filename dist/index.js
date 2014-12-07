(function(){
  var React, CardProps, App, config, time, nop, move, create, shuffle, model, app, update;
  React = require('react');
  CardProps = require('./app/CardProps');
  App = React.createFactory(require('./app/App'));
  require('./app/App.css');
  config = {
    card: {
      width: 100,
      height: 140,
      margin: {
        right: 10,
        bottom: 14
      }
    },
    speed: 200
  };
  time = 0;
  nop = function(card){
    return card;
  };
  move = function(t0, duration, bgn, end, onMove, onEnd){
    return function(card, t){
      var dt, ratio, dx, dy;
      dt = t - t0;
      if (dt >= duration) {
        setTimeout(onEnd, 0);
        return CardProps({
          value: card.value,
          position: end,
          hover: false,
          pass: false,
          onClick: card.onClick
        });
      } else {
        setTimeout(onMove, 0);
        ratio = dt / duration;
        dx = (end.x - bgn.x) * ratio;
        dy = (end.y - bgn.y) * ratio;
        return CardProps({
          value: card.value,
          position: {
            x: bgn.x + dx,
            y: bgn.y + dy
          },
          hover: true,
          pass: false,
          onClick: card.onClick
        });
      }
    };
  };
  create = function(){
    var stack, cards, movers, model, i$;
    stack = [1];
    cards = [];
    movers = [];
    model = {
      actived: stack[0],
      stack: stack,
      cards: [cards],
      movers: movers
    };
    for (i$ = 0; i$ < 9; ++i$) {
      (fn$.call(this, i$));
    }
    return model;
    function fn$(i){
      movers[i] = nop;
      cards[i] = CardProps({
        value: i || 9,
        position: {
          x: (config.card.width + config.card.margin.right) * i,
          y: 0
        },
        hover: false,
        onClick: function(){
          var next, curr, i$, src, dst, results$ = [];
          next = model.cards.length;
          curr = next - 1;
          model.cards[next] = [];
          for (i$ in model.cards[curr]) {
            (fn$.call(this, i$, model.cards[curr][i$]));
          }
          src = model.cards[next][i];
          dst = model.cards[next][model.actived];
          stack.push(i);
          model.actived = (model.actived + i) % 9;
          for (i$ in model.cards[next]) {
            results$.push((fn1$.call(this, i$, model.cards[next][i$])));
          }
          return results$;
          function fn$(j, props){
            var x$;
            model.cards[next][j] = props.clone();
            x$ = props;
            x$.hover = false;
            x$.onClick = null;
          }
          function fn1$(j, card){
            return movers[j] = move(time, config.speed, card.position, {
              x: card === src
                ? dst.position.x
                : card === dst
                  ? src.position.x
                  : card.position.x,
              y: (config.card.height + config.card.margin.bottom) * next
            }, function(){
              return window.scrollTo(0, document.body.scrollHeight);
            }, function(){
              return movers[j] = nop;
            });
          }
        }
      });
    }
  };
  shuffle = function(arg$){
    var cards, i$, i, j, tmp, results$ = [];
    cards = arg$.cards;
    cards = cards[0];
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
  console.log(model);
  app = React.render(App(model), document.getElementById('container'));
  update = function(t){
    var cards, movers, pass, i$, len$, card, x$;
    cards = model.cards, movers = model.movers;
    cards = cards[cards.length - 1];
    time = t;
    pass = true;
    for (i$ = 0; i$ < 9; ++i$) {
      (fn$.call(this, i$));
    }
    console.log(pass);
    if (pass) {
      for (i$ = 0, len$ = cards.length; i$ < len$; ++i$) {
        card = cards[i$];
        x$ = card;
        x$.pass = true;
        x$.onClick = null;
      }
    } else {
      requestAnimationFrame(update);
    }
    return app.setProps(model);
    function fn$(i){
      var card;
      card = movers[i](cards[i], time);
      card.hover || (card.hover = i === model.actived);
      if (card.position.x !== (config.card.width + config.card.margin.right) * (card.value - 1)) {
        pass = false;
      }
      cards[i] = card;
    }
  };
  requestAnimationFrame(update);
}).call(this);
