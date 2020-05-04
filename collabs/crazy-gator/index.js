let mask, rightEye, leftEye, wavesShader, wavesTexture

function preload() {
    mask = loadImage('./images/mask.png')
    rightEye = loadImage('./images/right-eye.png')
    leftEye = loadImage('./images/left-eye.png')
    wavesShader = loadShader('./shaders/shader.vert', './shaders/waves2.frag')
}

function setup() {
    const width = 1024
    const height = 814

    createCanvas(width, height, WEBGL)
    noStroke()

    wavesTexture = createGraphics(width, height, WEBGL)
    wavesTexture.noStroke()
}

function draw() {
    background(0)

    wavesTexture.shader(wavesShader)
    wavesShader.setUniform("resolution", [width, height]);
    wavesShader.setUniform('u_time', millis() / 1000.0)
    wavesTexture.rect(0, 0, width, height)
    texture(wavesTexture)
    rect(-width / 2, -height / 2, width, height, 4, 4)

    image(mask, -width / 2, -height / 2)

    push()
    translate(-135, -105)
    rotate(millis() / 2000)
    image(rightEye, -75, -75)
    pop()

    push()
    translate(-15, -230)
    rotate(millis() / -800)
    image(leftEye, -50, -50)
    pop()
}
