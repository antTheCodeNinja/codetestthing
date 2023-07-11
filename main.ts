namespace SpriteKind {
    export const Pipe = SpriteKind.create()
    export const Point = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (aLast100) {
        myPlayer.setVelocity(0, -180)
        pause(100)
        myPlayer.setVelocity(0, 50)
        aLast100 = false
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Pipe, function (sprite, otherSprite) {
    game.gameOver(false)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Point, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    sprites.destroy(otherSprite)
    music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
})
function spawnPipe () {
    Pipe = sprites.create(assets.image`Pipe`, SpriteKind.Pipe)
    Pipe.setPosition(160, randint(40, 80))
    Pipe.setVelocity(-30, 0)
    Pipe.setFlag(SpriteFlag.AutoDestroy, true)
    Pipe2 = sprites.create(assets.image`Pipe0`, SpriteKind.Pipe)
    Pipe2.setPosition(160, Pipe.y + -110)
    Pipe2.setVelocity(-30, 0)
    Pipe2.setFlag(SpriteFlag.AutoDestroy, true)
    Point = sprites.create(assets.image`myImage`, SpriteKind.Point)
    Point.setVelocity(-30, 0)
    Point.setPosition(160, Pipe.y + -54)
}
let Point: Sprite = null
let Pipe2: Sprite = null
let Pipe: Sprite = null
let aLast100 = false
let myPlayer: Sprite = null
game.splash("Flappy ship :D")
scene.setBackgroundColor(15)
info.setScore(0)
scene.centerCameraAt(80, 0)
myPlayer = sprites.create(img`
    2 2 . . . . . . . . . . . . . . 
    2 2 2 . . . . . . . . . . . . . 
    4 4 2 2 . . . . . . . . . . . . 
    5 4 4 2 . . . . . . . . . . . . 
    4 5 5 f 2 . . . . . . . . . . . 
    4 4 4 f 2 2 . . . . . . . . . . 
    4 4 4 2 5 2 2 2 . . . . . . . . 
    4 4 4 2 4 2 5 5 4 f 4 f b d d d 
    2 2 4 c 4 c 4 e e f c f c c c c 
    2 2 2 c 4 c e e . . . . . . . . 
    e e 2 f e c . . . . . . . . . . 
    e e e f e . . . . . . . . . . . 
    e e e f . . . . . . . . . . . . 
    e e e e . . . . . . . . . . . . 
    e e e . . . . . . . . . . . . . 
    e e . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
myPlayer.setPosition(80, 0)
myPlayer.setVelocity(0, 50)
myPlayer.setStayInScreen(true)
effects.starField.startScreenEffect()
aLast100 = false
game.onUpdateInterval(2000, function () {
    spawnPipe()
})
forever(function () {
    if (myPlayer.y >= 50) {
        game.gameOver(false)
        console.log(myPlayer)
    }
})
game.onUpdateInterval(100, function () {
    aLast100 = true
})
