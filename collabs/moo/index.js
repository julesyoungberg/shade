let mask, oct, octTexture

function preload() {
    mask = loadImage('./images/mask.png')
    oct = loadShader('./shaders/shader.vert', './shaders/oct.frag')
}

function setup() {
    const width = 1000
    const height = 1000

    createCanvas(width, height, WEBGL)
    noStroke()

    octTexture = createGraphics(width, height, WEBGL)
    octTexture.noStroke()
}

function draw() {
    background(0)

    octTexture.shader(oct)
    oct.setUniform("resolution", [width, height])
    oct.setUniform('u_time', millis() / 1000.0)
    octTexture.rect(0, 0, width, height)
    texture(octTexture)
    rect(-width / 2, -height / 2, width, height, 4, 4)

    push()
    const rotation = sin(millis() / 200) / 40.0
    rotate(rotation)
    image(mask, -width / 2, -height / 2)

    fill(40)

    const size = sin(millis() / 300) * 10 + 45

    // left eye
    ellipse(-170, -95, size)

    // right eye
    ellipse(150, -95, size)

    pop()
}
