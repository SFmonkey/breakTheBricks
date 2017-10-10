var Block = function(position, game) {
  var p = position
  var img = game.imageByName('block')
  var o = {
    image: img.image,
    x: p[0],
    y: p[1],
    w: img.w,
    h: img.h,
    alive: true,
    lifes: p[2] || 1,
    kill: function() {
      o.lifes --
      if (o.lifes < 1) {
        o.alive = false
      }
    },
    collide: function(ball) {
      return o.alive && (rectIntersects(o, ball) || rectIntersects(ball, o))
    },
  }
  return o;
}
