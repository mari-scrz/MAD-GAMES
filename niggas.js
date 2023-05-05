const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576
//hola
const collisionsMap = []
for (let i = 0; i < collisions.length; i += 160) {
    collisionsMap.push(collisions.slice(i, 160 + i))
}
// tamaño de las boundaries

class boundary {
    static width = 30
    static height = 30
    constructor({ position }) {
        this.position = position
        this.width = 30
        this.height = 30
    }

    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}
// color boundaries

const boundaries = []
const offset = {
    x:-420,
    y:-580
} 
// para que las boundaries estén donde deben estar

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025)
        boundaries.push(
            new boundary({
                position: {
                x: j * boundary.width + offset.x,
                y: i * boundary.height + offset.y
                }
            })
        )
    })
})
// la condición para que se activen las boundaries

console.log(boundaries)

const image = new Image()
image.src = './img/idk.png'

const playerImage = new Image()
playerImage.src = 'img/img/playerDown.png'

class Sprite {
    constructor({position, velocity, image, frames = { max: 1} }) {
        this.position = position
        this.image = image
        this.frames = frames

        this.image.onload = () => {
        this.width = this. width / this.frames.max
        this.height = this.image.height 
        }
    }

    draw() {
        c.drawImage(
            this.image,
            0,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height
        )
    }
}
// carga la imagen y hace que se vea (lo dibuja)
// hokaaa
const player = new Sprite({
    position: {
        x: canvas.width / 2 - 192 / 4 / 2,
        y: canvas.height / 2 - 68 / 2,
    },
    image: playerImage,
    frames: {
        max: 4
    }
})
// cortar el personaje porque en la imagen eran 4

const background = new Sprite({ 
    position: {
        x:offset.x,
        y:offset.y
    },
    image: image 
})



const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}
// que se mueva con esas teclas

const movables = [background, ...boundaries]

function rectangularCollision({rectangle1, rectangle2}) {
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x && 
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width && 
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height && 
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y 
    ) }
function animate() {
    window.requestAnimationFrame(animate)
    background.draw()
    boundaries.forEach(boundary => {
        boundary.draw()
        if (
            rectangularCollision({
                rectangle1: player,
                rectangle2: boundary
            })
        ) {
            console.log('colliding')
        }
    })
    player.draw()


    let moving = true 
    if (keys.w.pressed && lastKey === 'w') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary, 
                    position: {
                        x: boundary.position.x,
                        y: boundary.position.y + 3
                    }} 
                })
            ) {
                console.log('colliding')
            moving = false
                break
            }
        }
        if (moving)
        movables.forEach((movable) => {
            movable.position.y += 3
        })
    }
    else if (keys.a.pressed && lastKey === 'a') {
        movables.forEach((movable) => {
            movable.position.x += 3
        })
    }
    else if (keys.s.pressed && lastKey === 's') {
        movables.forEach((movable) => {
            movable.position.y -= 3
        })
    }
    else if (keys.d.pressed && lastKey === 'd') {
        movables.forEach((movable) => {
            movable.position.x -= 3
        })
    }
}
animate()

let lastKey = ''
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
        keys.w.pressed = true
        lastKey = 'w'
            break
        case 'a':
        keys.a.pressed = true
        lastKey = 'a'
            break
        case 's':
        keys.s.pressed = true
        lastKey = 's'
            break
        case 'd':
        keys.d.pressed = true
        lastKey = 'd'
            break
    }
})

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'w':
        keys.w.pressed = false
            break
        case 'a':
        keys.a.pressed = false
            break
        case 's':
        keys.s.pressed = false
            break
        case 'd':
        keys.d.pressed = false
            break
    }
})
