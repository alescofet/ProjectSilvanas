class Enemy{
    constructor(){ 
    this.img = ``
    this.width = 50
    this.height = 50
    this.x = ctx.canvas.width-75
    this.y = 175 + enemySeparation
    }
    drawSelf(){
        ctx.drawImage(loadedImages.enemy, this.x, this.y, this.width, this.height)
    }
}