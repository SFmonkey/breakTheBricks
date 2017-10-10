var loadLevel = function (n, game) {
  var blocks = []
  n = n - 1
  var level = levels[n]
  for (var i = 0; i < level.length; i++) {
    var p = level[i]
    var b = Block(p, game)
    blocks.push(b)
  }
  return blocks
}

var enableDebugMode = function(enable, game) {
  if (!enable) {
    return
  }
  window.paused = false
  window.addEventListener('keydown', function(event) {
    var k = event.key
    if(k == 'p'){
      window.paused = !window.paused
    }else if ('123456'.includes(k)) {
      blocks = loadLevel(Number(k), game)
    }
  })

  // control
  document.querySelector('#J_ballSpeed').addEventListener('input', function(event){
    var input = event.target
    log(input.value)
    window.fps = Number(input.value)
  })
}

var _main = function() {
  var images = {
    ball: 'img/ball.png',
    bottom: 'img/bottom.png',
    block: 'img/block.png',
  }

  var game = Game.instance(images, function(g) {

    var s = SceneTitle.new(g)
    g.runWithScene(s)
  })

  enableDebugMode(true, game)
}

_main()
