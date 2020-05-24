let mask, rightEye, leftEye, shdr, shdrTexture, mouth, mouthTexture

function preload() {
    mask = loadImage('./images/mask2.png')
    rightEye = loadImage('./images/right-eye.png')
    leftEye = loadImage('./images/left-eye.png')
    shdr = loadShader('./shaders/shader.vert', './shaders/noise_wood.frag')
    mouth = loadShader('./shaders/shader.vert', './shaders/mouth.frag')
}

function setup() {
    const width = 1000
    const height = 1000

    createCanvas(width, height, WEBGL)
    noStroke()

    shdrTexture = createGraphics(width, height, WEBGL)
    shdrTexture.noStroke()

    mouthTexture = createGraphics(width, height, WEBGL)
    mouthTexture.noStroke()
}

function draw() {
    background(0)

    const time = millis() / 1000.0

    // background shader
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

    // mouth shader
    mouthTexture.shader(mouth)

    mouth.setUniform('u_resolution', [width, height])
    mouth.setUniform('u_time', millis() / 1000.0)
    mouth.setUniform('u_mouse', [
        mouseX / width,
        map(mouseY, 0, height, height, 0) / height
    ])

    mouthTexture.rect(0, 0, width, height)
    texture(mouthTexture)
    rect(-120, -150, 345, 200, 4, 4)

    image(mask, -width / 2, -height / 2)

    push()
    translate(-100, -285)
    rotate(millis() / 500)
    image(rightEye, -45, -45)
    pop()

    push()
    translate(180, -275)
    rotate(millis() / -600)
    image(leftEye, -45, -45)
    pop()
}
