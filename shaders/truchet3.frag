#ifdef GL_ES
precision highp float;
#endif

varying vec2 st;

uniform vec2 u_mouse;
uniform float u_time;
uniform vec2 u_resolution;

#define PI 3.14159265359

// generic matrix transformation algorithm
vec2 transform(vec2 st, mat2 matrix) {
    vec2 pos = st - 0.5;
    pos = matrix * pos;
    return pos + 0.5;
}

vec2 rotate2D(vec2 st, float angle) {
    mat2 matrix = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
    return transform(st, matrix);
}

vec2 scale(vec2 st, float scale) {
    mat2 matrix = mat2(scale, 0.0, 0.0, scale);
    return transform(st, matrix);
}

// get position within tile
vec2 tile(vec2 st, float tiling) {
    return fract(st * tiling);
}

// get current tile
vec2 tilePos(vec2 st, float tiling) {
    return floor(st * tiling);
}

vec2 rotateTilePattern(vec2 st) {
    //  Scale the coordinate system by 2x2
    vec2 pos = st * 2.0;

    //  Give each cell an index number
    //  according to its position
    float xIndex = step(1., mod(pos.x, 2.0));
    float yIndex = step(1., mod(pos.y, 2.0)) * 2.0;
    float index = xIndex + yIndex;
    // pos.y = fract(pos.y + xIndex * 0.1);

    //      |
    //  2   |   3
    //      |
    //--------------
    //      |
    //  0   |   1
    //      |

    // Make each cell between 0.0 - 1.0
    pos = fract(pos);

    // Rotate each cell according to the index
    if (index == 0.0) {
        pos = rotate2D(pos, PI * 0.5);
    } else if (index == 1.0) {
        pos = rotate2D(pos, PI);
    } else if (index == 2.0) {
        pos = rotate2D(pos, 0.0);
    } else if (index == 3.0) {
        pos = rotate2D(pos, PI * -0.5);
    }

    return pos;
}

void main() {
    float tiling = 10.0;
    vec2 pos = tile(st, tiling);
    vec2 tilePos = tilePos(st, tiling);

    pos = rotateTilePattern(pos);

    pos = tile(pos, 1.0);
    // pos = rotate2D(pos, -PI * u_time * 0.25);
    // pos = rotateTilePattern(pos * 2.);
    pos = rotate2D(pos, PI * u_time * 0.25);

    float evenX = mod(tilePos.x, 2.0);
    float evenY = mod(tilePos.y, 2.0);
    float same = step(1.0, evenX + evenY) - step(2.0, evenX + evenY);

    float color = same * step(pos.x, pos.y) + (1.0 - same) * step(pos.y, pos.x);
    gl_FragColor = vec4(vec3(color), 1.0);
}
