let mask, shdr, shdrTexture

function preload() {
    mask = loadImage('./images/mask.png')
    shdr = loadShader('./shaders/shader.vert', './shaders/rain.frag')
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

    shdr.setUniform('u_resolution', [width, height])
    shdr.setUniform('u_time', millis() / 1000.0)
    shdr.setUniform('u_mouse', [
        mouseX / width,
        map(mouseY, 0, height, height, 0) / height
    ])

    shdrTexture.rect(0, 0, width, height)
    texture(shdrTexture)
    rect(-width / 2, -height / 2, width, height, 4, 4)

    image(mask, -350, -305)
}
