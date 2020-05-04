let mask, waves, wavesTexture

function preload() {
    mask = loadImage('./images/mask.png')
    waves = loadShader('./shaders/shader.vert', './shaders/waves3.frag')
}

function setup() {
    const width = 1024
    const height = 812

    createCanvas(width, height, WEBGL)
    noStroke()

    wavesTexture = createGraphics(width, height, WEBGL)
    wavesTexture.noStroke()
}

function draw() {
    background(0)

    wavesTexture.shader(waves)
    waves.setUniform("resolution", [width, height])
    waves.setUniform('u_time', millis() / 1000.0)
    wavesTexture.rect(0, 0, width, height)
    texture(wavesTexture)
    rect(-width / 2, -height / 2, width, height, 4, 4)

    image(mask, -width / 2, -height / 2)
}
