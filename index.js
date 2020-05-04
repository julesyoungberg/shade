const loadedShaders = {}
const shaders = [
    'disco',
    'flower',
    'imprint',
    'pokadots',
    'sunbeam',
    'truchet1',
    'truchet2',
    'truchet3',
    'waves',
    'waves2'
]

const state = {
    shader: 'disco',
}

window.onload = function() {
    const gui = new dat.GUI()
    gui.add(state, 'shader', shaders)
}

function getCanvasSize() {
    return Math.min(windowWidth, windowHeight)
}

function preload() {
    shaders.forEach(shader => {
        loadedShaders[shader] = loadShader('./shaders/shader.vert', `./shaders/${shader}.frag`)
    })
}

function setup() {
    const size = getCanvasSize()
    createCanvas(size, size, WEBGL)
    noStroke()
}

function draw() {
    const currentShader = loadedShaders[state.shader]

    shader(currentShader)

    currentShader.setUniform('u_resolution', [width, height])
    currentShader.setUniform('u_time', millis() / 1000.0)
    currentShader.setUniform('u_mouse', [
        mouseX / width,
        map(mouseY, 0, height, height, 0) / height
    ])

    rect(0, 0, width, height)
}

function windowResized() {
    const size = getCanvasSize()
    resizeCanvas(size, size)
}
