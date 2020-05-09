let mask, shdr, shdrTexture

function preload() {
    mask = loadImage('./images/mask.png')
    shdr = loadShader('./shaders/shader.vert', './shaders/rooms.frag')
}

function setup() {
    const width = 1000
    const height = 1000

    createCanvas(width, height, WEBGL)
    noStroke()

    shdrTexture = createGraphics(width, height, WEBGL)
    shdrTexture.noStroke()
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

    shdrTexture.shader(shdr)
    shdr.setUniform("resolution", [width, height])
    shdr.setUniform('u_time', time)
    shdrTexture.rect(0, 0, width, height)
    texture(shdrTexture)
    
    push()
    rotate(Math.PI / -4)
    rect(-width, -height, width * 2, height * 2, 4, 4)
    pop()

    push()

    const posTime = time * 3.0
    const yOffset = Math.abs(sin(posTime)) * 100
    translate(0, -yOffset + 50)

    image(mask, -width / 2, -height / 2)

    fill(40)

    const size = 25

    let eyeTime = time * 4.0
    let xShift = cos(eyeTime) * 25
    let yShift = sin(eyeTime) * 25

    // left eye
    ellipse(-130 + xShift, -10 + yShift, size)

    xShift = cos(-eyeTime) * 25
    yShift = sin(-eyeTime) * 25

    // right eye
    ellipse(90 + xShift, -10 + yShift, size)

    eyeTime = sin(time * 2.0) / 2 + 0.5
    xShift = smoothstep(0.0, 0.25, eyeTime) - smoothstep(0.5, 0.75, eyeTime)
    xShift = (xShift * 30) - 15

    // third eye
    ellipse(-20 + xShift, -60, size * .75)

    pop()
}
