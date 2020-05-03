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

float box(vec2 st, vec2 size, float smoothEdges) {
    vec2 s = vec2(0.5) - size * 0.5;
    vec2 aa = vec2(smoothEdges * 0.5);
    vec2 uv = smoothstep(s, s + aa, st);
    uv *= smoothstep(s, s + aa, vec2(1.0) - st);
    return uv.x * uv.y;
}

void main() {
    vec3 color = vec3(0.0);

    float tiling = 10.0;
    vec2 pos = tile(st, tiling);
    vec2 tilePos = tilePos(st, tiling);

    float timeFract = fract(u_time * 0.25);
    float rot = smoothstep(0.0, 0.5, timeFract) - smoothstep(0.5, 1.0, timeFract);
    pos = rotate2D(pos, rot * PI + PI * 0.25);

    pos = scale(pos, sin(u_time) * 0.5 + 1.5);
    
    color = vec3(box(pos, vec2(0.7), 0.01));
    
    color.r *= sin(2.0 * u_time + tilePos.y * 4.0 + tilePos.x * 2.0) * 0.75 + 0.25;
    color.g *= cos(1.5 * u_time + tilePos.y * 3.0 + tilePos.x * 4.0) * 0.75 + 0.25;

    gl_FragColor = vec4(color, 1.0);
}
