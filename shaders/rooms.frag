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

void main() {
    vec2 pos = st;
    // pos = rotate2D(pos, PI / 4.0);
    float tiling = 13.0;
    pos = tile(pos, tiling);
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

    float stp = step(1.0 - pos.x, pos.y);
    float flt = step(0.5, pos.y);
    float lft = 1.0 - step(0.05, pos.x);
    float btm = 1.0 - step(0.05, pos.y);
    float rht = step(0.95, pos.x);

    float shade = min(1.0, stp * flt + lft + btm + rht);

    vec3 c2 = vec3(1.0, 0.749, 0.0);
    vec3 c1 = vec3(0.451, 0.0, 1.0);

    vec3 color = mix(c1, c2, shade);

	gl_FragColor = vec4(color, 1.0);
}
