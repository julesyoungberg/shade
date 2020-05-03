#ifdef GL_ES
precision highp float;
#endif

varying vec2 st;

uniform vec2 u_mouse;
uniform float u_time;
uniform vec2 u_resolution;

#define PI 3.14159265359

// get position within tile
vec2 tile(vec2 st, float tiling) {
    return fract(st * tiling);
}

// get current tile
vec2 tilePos(vec2 st, float tiling) {
    return floor(st * tiling);
}

float circle(vec2 st, float radius) {
    vec2 pos = vec2(0.5) - st;
    float r = radius * 0.75;
    float edge = r * 0.01;
    return 1.0 - smoothstep(r - edge, r + edge, dot(pos, pos) * PI);
}

void main() {
    float tiling = 20.0;
    vec2 pos = tile(st, tiling);
    vec2 tilePos = tilePos(st, tiling);

    float shift = u_time;

    float xActive = floor(mod(shift, 2.0));
    float yActive = floor(mod(shift + 1.0, 2.0));

    float evenRow = mod(tilePos.y, 2.0);
    float evenCol = mod(tilePos.x, 2.0);

    float rowDir = evenRow * 2.0 - 1.0;
    float colDir = evenCol * 2.0 - 1.0;

    pos.x = fract(pos.x + xActive * rowDir * shift);
    pos.y = fract(pos.y + yActive * colDir * shift);

    vec3 color = vec3(circle(pos, 0.3));

    gl_FragColor = vec4(color, 1.0);
}
