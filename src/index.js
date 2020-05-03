import dat from 'dat.gui'
import p5 from 'p5'

const shaders = ['basic', 'step', 'imprint', 'disco', 'truchet', 'pokadots']

const state = {
    shader: 'pokadots',
}

window.onload = function() {
    const gui = new dat.GUI()
    gui.add(state, 'shader', shaders)
}

function getCanvasSize(p) {
    return Math.min(p.windowWidth, p.windowHeight)
}

const sketch = p => {
    const loadedShaders = {}

    p.preload = () => {
        shaders.forEach(shader => {
            loadedShaders[shader] = p.loadShader('./shaders/shader.vert', `./shaders/${shader}.frag`)
        })
    }

    p.setup = () => {
        const size = getCanvasSize(p)
        p.createCanvas(size, size, p.WEBGL)
        p.noStroke()
    }

    p.draw = () => {
        const shader = loadedShaders[state.shader]

        p.shader(shader)

        shader.setUniform('u_resolution', [p.width, p.height])
        shader.setUniform('u_time', p.millis() / 1000.0)
        shader.setUniform('u_mouse', [
            p.mouseX / p.width,
            p.map(p.mouseY, 0, p.height, p.height, 0) / p.height
        ])

        p.rect(0, 0, p.width, p.height)
    }

    p.windowResized = () => {
        const size = getCanvasSize(p)
        p.resizeCanvas(size, size)
    }
}

new p5(sketch)
