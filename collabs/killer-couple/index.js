let mask, shdr1, shdr1Texture, shdr2, shdr2Texture

function preload() {
    mask = loadImage('./images/mask.png')
    shdr1 = loadShader('./shaders/shader.vert', './shaders/waves1.frag')
    shdr2 = loadShader('./shaders/shader.vert', './shaders/truchet2.frag')
}

function setup() {
    const width = 710
    const height = 900

    createCanvas(width, height, WEBGL)
    noStroke()

    shdr1Texture = createGraphics(width, height, WEBGL)
    shdr1Texture.noStroke()

    shdr2Texture = createGraphics(width, height, WEBGL)
    shdr2Texture.noStroke()
}

function clamp(x, lower, upper) {
    if (x < lower) return lower
    if (x > upper) return upper
    return x
}

function smoothstep(e1, e2, x) {
    const mx = clamp((x - e1) / (e2 - e1), 0, 1)
    return mx * mx * (3 - 2 * mx)
}

function draw() {
    background(0)

    const time = millis() / 1000.0

    shdr1Texture.shader(shdr1)
    shdr1.setUniform("resolution", [width, height])
    shdr1.setUniform('u_time', time)
    shdr1Texture.rect(0, 0, width, height)
    texture(shdr1Texture)
    rect(-width / 2, -height / 2, width / 2 - 50, height, 4, 4)

    shdr2Texture.shader(shdr2)
    shdr2.setUniform("resolution", [width, height])
    shdr2.setUniform('u_time', time)
    shdr2Texture.rect(0, 0, width, height)
    texture(shdr2Texture)
    rect(-50, -height / 2, width, height, 4, 4)

    image(mask, -width / 2, -height / 2)
}
