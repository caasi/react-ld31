(function(){
  var CardProps;
  CardProps = (function(){
    CardProps.displayName = 'CardProps';
    var prototype = CardProps.prototype, constructor = CardProps;
    function CardProps(arg$){
      var this$ = this instanceof ctor$ ? this : new ctor$;
      this$.value = arg$.value, this$.position = arg$.position, this$.hover = arg$.hover, this$.pass = arg$.pass, this$.onClick = arg$.onClick;
      return this$;
    } function ctor$(){} ctor$.prototype = prototype;
    prototype.clone = function(){
      return CardProps({
        value: this.value,
        position: {
          x: this.position.x,
          y: this.position.y
        },
        hover: this.hover,
        pass: this.pass,
        onClick: this.onClick
      });
    };
    return CardProps;
  }());
  module.exports = CardProps;
}).call(this);
