class Game {
  constructor(images, callback) {
    this.images = images
    this.callback = callback
    this.scene = null
    this.actions = {}
    this.keydowns = {}
    this.canvas = document.getElementById("canvas")
    this.context = canvas.getContext('2d')
    // event
    var self = this
    window.addEventListener('keydown',event => {
      this.keydowns[event.key] = true
    })
    window.addEventListener('keyup',event => {
      this.keydowns[event.key] = false
    })
    this.init()
  }

  static instance(...args) {
      this.i = this.i || new this(...args)
      return this.i
  }

  drawImage(img) {
    this.context.drawImage(img.image,img.x,img.y)
  }

  // update
  update() {
      this.scene.update()
  }
  // draw
  draw() {
      this.scene.draw()
  }
  //
  registerAction(key, callback) {
      this.actions[key] = callback
  }

  runLoop() {
    var g = this
    //events
    var actions = Object.keys(g.actions)
    for (var i = 0; i < actions.length; i++) {
      var key = actions[i]
      if(g.keydowns[key]){
        g.actions[key]()
      }
    }
    // update
    g.update()
    // clamp

    // clear
    g.context.clearRect(0,0,g.canvas.width,g.canvas.height)
    // draw
    g.draw()
    // next run loop
    setTimeout(function() {
      g.runLoop()
    },1000/window.fps)
  }

  imageByName (name) {
    var g = this
    var img = g.images[name]
    var image = {
      w: img.width,
      h: img.height,
      image: img,
    }
    return image
  }

  runWithScene (scene) {
      var g = this
      g.scene = scene
      // 开始运行程序
      setTimeout(function(){
          g.runLoop()
      }, 1000/window.fps)
  }

  replaceScene (scene) {
      this.scene = scene
  }
  _start (scene) {
    this.callback(this)
  }

  init() {
      var g = this
      var loads = []
      // 预先载入所有图片
      var names = Object.keys(g.images)
      for (var i = 0; i < names.length; i++) {
          let name = names[i]
          var path = g.images[name]
          let img = new Image()
          img.src = path
          img.onload = function() {
              // 存入 g.images 中
              g.images[name] = img
              // 所有图片都成功载入之后, 调用 run
              loads.push(1)
              log('load images', loads.length, names.length)
              if (loads.length == names.length) {
                  log('load images', g.images)
                  g._start()
              }
          }
      }
  }
}
