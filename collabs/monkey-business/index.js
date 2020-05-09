let mask, shdr, shdrTexture

function preload() {
    mask = loadImage('./images/mask.png')
    shdr = loadShader('./shaders/shader.vert', './shaders/truchet4.frag')
}

function setup() {
    const width = 1000
    const height = 1000

    createCanvas(width, height, WEBGL)
    noStroke()

    shdrTexture = createGraphics(width, height, WEBGL)
    shdrTexture.noStroke()
}

function draw() {
    background(0)

    const time = millis() / 1000.0

    shdrTexture.shader(shdr)
    shdr.setUniform("resolution", [width, height])
    shdr.setUniform('u_time', time)
    shdrTexture.rect(0, 0, width, height)
    texture(shdrTexture)
    rect(-width / 2, -height / 2, width, height, 4, 4)

    push()

    const posTime = time * 10.0
    const yOffset = sin(posTime) * 10
    translate(0, yOffset)

    image(mask, -width / 2, -height / 2)

    fill(40)

    const size = 40

    let eyeTime = time * 4.0
    let xShift = cos(eyeTime) * 25
    let yShift = sin(eyeTime) * 5

    // left eye
    ellipse(-130 + xShift, -140 + yShift, size)

    // right eye
    ellipse(90 + xShift, -140 + yShift, size)

    eyeTime = time * 3.0
    xShift = cos(eyeTime) * 25
    yShift = sin(eyeTime) * 5

    // third eye
    ellipse(-30 + xShift, -290 + yShift, size)

    pop()
}
