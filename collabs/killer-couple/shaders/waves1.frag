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

// get position within tile
vec2 tile(vec2 st, vec2 tiling) {
    return fract(st * tiling);
}

// get current tile
vec2 tilePos(vec2 st, vec2 tiling) {
    return floor(st * tiling);
}

vec3 color(int r, int g, int b) {
    return vec3(float(r) / 255.0, float(g) / 255.0, float(b) / 255.0);
}

void main() {
    vec2 tiling = vec2(5, 5);
    vec2 pos = tile(st, tiling);
    vec2 tilePos = tilePos(st, tiling);

    pos.y = fract(pos.y + mod(tilePos.x, 2.0) * 0.5);

    float y = pos.y * PI * 2.0 + u_time * 2.0;
    float amplitude = (cos(u_time * 3.0) * 0.25 + 0.75);
    float threshold = fract(sin(y) * amplitude + 0.5);

    float row = mod(tilePos.x, 2.0);
    float oddR = row * step(threshold, pos.x);
    float evenR = (1.0 - row) * step(threshold, 1.0 - pos.x);
    float shade = oddR + evenR;

    vec3 c1 = color(207, 10, 6);
    vec3 c2 = color(115, 3, 3);


    vec3 color = mix(c1, c2, shade);
    
	gl_FragColor = vec4(color, 1.0);
}
