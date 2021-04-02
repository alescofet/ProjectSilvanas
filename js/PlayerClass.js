class Player{
    constructor(){
        this.img = ``
        this.width = 50
        this.height = 50
        this.x = 0
        this.y = 0
    }
    drawSelf(){
        ctx.drawImage(loadedImages.car, this.x, this.y, this.width, this.height)
      }

    moveUp(){
        this.y -= 10
      }

    moveDown(){
        this.y += 10
      }
}