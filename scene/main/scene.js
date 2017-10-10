var Scene = function(game) {
  var s = {
    game: game,
  }

  //init
  var ball = Ball(game)
  var bottom = Bottom(game)
  var score = 0
  var enableDrag = false

  blocks = loadLevel(2, game)

  game.registerAction('a',function(){
    bottom.moveLeft()
  })

  game.registerAction('d',function(){
    bottom.moveRight()
  })

  game.registerAction('f',function(){
    ball.fire()
  })

  s.draw = function() {
    // draw background
    game.context.fillStyle = '#553'
    game.context.fillRect(0, 0, 600, 600)

    game.drawImage(bottom)
    game.drawImage(ball)

    for (var i = 0; i < blocks.length; i++) {
      var block = blocks[i]
      if(block.alive){
        game.drawImage(block)
      }
    }

    // draw text

    game.context.fillText('分数: ' + score, 10, 580)
  }

  s.update = function() {
    if (window.paused) {
      return
    }
    ball.move()

    // 判断游戏结束
    if (ball.y > bottom.y) {
        // 跳转到 游戏结束 的场景
        var end = SceneEnd.new(game)
        game.replaceScene(end)
    }
    // 判断相撞
    if(bottom.collide(ball)){
      ball.speedY *= -1;
    }
    // 判断 ball 和 blocks 相撞
    for (var i = 0; i < blocks.length; i++) {
      var block = blocks[i]
      if(block.collide(ball)){
        log('block 相撞')
        block.kill()
        ball.rebound()
        score += 100
      }
    }
  }

  // mouse event

  game.canvas.addEventListener('mousedown',function(event) {
    var x = event.offsetX
    var y = event.offsetY
    if(ball.hasPoint(x,y)){
      enableDrag = true
    }
  })
  game.canvas.addEventListener('mousemove',function(event) {
    var x = event.offsetX
    var y = event.offsetY
    if(enableDrag){
      ball.x = x
      ball.y = y
    }
  })
  game.canvas.addEventListener('mouseup',function(event) {
    enableDrag = false
  })

  return s
}
