let mask, sunbeam, waves

function preload() {
    mask = loadImage('./images/mask.png')
    sunbeam = loadShader('./shaders/shader.vert', './shaders/sunbeam.frag')
    waves = loadShader('./shaders/shader.vert', './shaders/waves.frag')
}

function setup() {
    const width = 734
    const height = 900

    createCanvas(width, height, WEBGL)
    noStroke()

    sunbeamTexture = createGraphics(width, height, WEBGL)
    sunbeamTexture.noStroke()

    wavesTexture = createGraphics(width, height, WEBGL)
    wavesTexture.noStroke()
}

function draw() {
    background(0)

    sunbeamTexture.shader(sunbeam)
    sunbeam.setUniform("resolution", [width, height])
    sunbeam.setUniform('u_time', millis() / 1000.0)
    sunbeamTexture.rect(0, 0, width, height)
    texture(sunbeamTexture)
    rect(-width / 2 - 50, -height / 2, width, height / 2 + 100, 4, 4)

    wavesTexture.shader(waves)
    waves.setUniform("resolution", [width, height])
    waves.setUniform('u_time', millis() / 1000.0)
    wavesTexture.rect(0, 0, width, height)
    texture(wavesTexture)
    rect(-width / 2, 100, width, height / 2, 4, 4)

    image(mask, -width / 2, -height / 2)
}
