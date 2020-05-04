let img, mandala, shdr, shaderTexture

function preload() {
    img = loadImage('./images/mask.png')
    mandala = loadImage('./images/mandala.png')
    shdr = loadShader('./shaders/shader.vert', './shaders/shader.frag')
}

function setup() {
    const width = 709
    const height = 900

    createCanvas(width, height, WEBGL)
    noStroke()

    shaderTexture = createGraphics(width, height, WEBGL)
    shaderTexture.noStroke()
}

function draw() {
    shaderTexture.shader(shdr)
    shdr.setUniform("resolution", [width, height]);
    shdr.setUniform('u_time', millis() / 1000.0)
    shaderTexture.rect(0, 0, width, height)

    background(0)

    texture(shaderTexture)

    rect(-width / 2, -height / 2, width, height, 4, 4)

    image(img, -width / 2, -height / 2)

    push()
    translate(-15, -70)
    rotate(millis() / 2000.0)
    image(mandala, -150, -150)
    pop()
}
