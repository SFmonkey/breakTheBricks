var Ball = function(game) {
  var img = game.imageByName('ball')
  var o = {
    image: img.image,
    x: 200,
    y: 490,
    speedX: 5,
    speedY: 5,
    fired: false,
    fire: function(){
      o.fired = true
    },
    move: function() {
      if(o.fired){
        if(o.x < 0 || o.x > 600){
          o.speedX = -o.speedX
        }
        if(o.y < 0 || o.y > 600){
          o.speedY = -o.speedY
        }
        o.x += o.speedX
        o.y += o.speedY
      }
    },
    rebound: function() {
      o.speedY *= -1
    },
    hasPoint: function(x, y) {
      var xIn = x > o.x && x <= o.x + o.image.width
      var yIn = y > o.y && y <= o.y + o.image.height

      return xIn && yIn
    }
  }
  return o;
}
