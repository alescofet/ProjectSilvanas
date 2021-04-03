class Player{
  constructor(){
      this.img = ``
      this.width = 100
      this.height = 100
      this.x = 0
      this.y = (ctx.canvas.height/3)*2
  }
  drawSelf(){
      ctx.drawImage(loadedImages.player, this.x, this.y, this.width, this.height)
    }

  moveUp(){
      this.y -= 10
    }

  moveDown(){
      this.y += 10
    }
  
}