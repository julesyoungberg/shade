let mask, discoShader, discoTexture

function preload() {
    mask = loadImage('./images/mask.png')
    discoShader = loadShader('./shaders/shader.vert', './shaders/disco.frag')
}

function setup() {
    const width = 708
    const height = 900

    createCanvas(width, height, WEBGL)
    noStroke()

    discoTexture = createGraphics(width, height, WEBGL)
    discoTexture.noStroke()
}

function draw() {
    background(0)

    discoTexture.shader(discoShader)
    discoShader.setUniform("resolution", [width, height])
    discoShader.setUniform('u_time', millis() / 1000.0)
    discoTexture.rect(0, 0, width, height)
    texture(discoTexture)
    rect(-width / 2, -height / 2, width, height, 4, 4)

    image(mask, -width / 2, -height / 2)
}
