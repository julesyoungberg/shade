#ifdef GL_ES
precision highp float;
#endif

varying vec2 st;

uniform vec2 u_mouse;
uniform float u_time;
uniform vec2 u_resolution;

#define PI 3.14159265359

// get position within tile
vec2 tile(vec2 st, vec2 tiling) {
    return fract(st * tiling);
}

// get current tile
vec2 tilePos(vec2 st, vec2 tiling) {
    return floor(st * tiling);
}

void main() {
    vec2 tiling = vec2(5, 200.0 + u_time * 10.0);
    vec2 pos = tile(st, tiling);
    vec2 tilePos = tilePos(st, tiling);

    pos.x = fract(pos.x + mod(tilePos.y, 2.0) * 0.5);

    float x = pos.x * PI * 2.0 + u_time * 12.0;
    float amplitude = cos(u_time) / 5.0 + 0.4;
    float threshold = sin(x) * amplitude + 0.5;

    float row = mod(tilePos.y, 2.0);
    float oddR = row * step(threshold, pos.y);
    float evenR = (1.0 - row) * step(threshold, 1.0 - pos.y);
    float shade = oddR + evenR;
    
	gl_FragColor = vec4(vec3(shade), 1.0);
}
