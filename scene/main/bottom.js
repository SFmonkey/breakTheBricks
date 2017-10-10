var Bottom = function(game) {
  var img = game.imageByName('bottom')
  var o = {
    image: img.image,
    x: 200,
    y: 500,
    speed: 5,
    moveLeft: function() {
      o.move(o.x - o.speed)
    },
    moveRight: function() {
      o.move(o.x + o.speed)
    },
    move: function(x) {
      if (x < 0){
        x = 0
      }
      if (x > 600 - o.image.width) {
        x = 600 - o.image.width
      }
      o.x = x
    },
    coincide: function(x, x1, x2) {
      return x >= x1 && x <= x2
    },
    collide: function(ball) {
      var b = ball
      if (o.coincide(o.x, b.x, b.x + b.image.width) || o.coincide(b.x, o.x, o.x + o.image.width)) {
        if(o.coincide(o.y, b.y, b.y + b.image.height) || o.coincide(b.y, o.y, o.y + o.image.height)){
          return true
        }
      }
      return false
    }
  }
  return o;
}
