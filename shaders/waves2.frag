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

float circle(vec2 st, float radius) {
    vec2 pos = vec2(0.5) - st;
    float r = radius * 0.75;
    float edge = r * 0.01;
    return 1.0 - smoothstep(r - edge, r + edge, dot(pos, pos) * PI);
}

void main() {
    vec3 c1 = vec3(0.988, 0.506, 0.020);
    vec3 c2 = vec3(0.376, 0.020, 0.988);
    vec3 c3 = vec3(0.988, 0.906, 0.020);

    float xTiling = 5.0;
    float yTiling = 10.0; // must be even

    vec2 waveTiling = vec2(xTiling, yTiling);
    vec2 wavePos = tile(st, waveTiling);
    vec2 waveTilePos = tilePos(st, waveTiling);

    float xScale = PI * 2.0;
    float xShift = u_time * 12.0;

    // compute waves
    float x = wavePos.x * xScale + xShift;
    float amplitude = cos(u_time * 10.0) / 12.0 + 0.25;
    float threshold = sin(x) * amplitude + 0.5;

    float row = mod(waveTilePos.y, 2.0);

    // alternate wave colors 
    float oddR = row * step(threshold, wavePos.y);
    float evenR = (1.0 - row) * step(threshold, 1.0 - wavePos.y);
    float shade = oddR + evenR;
    vec3 color = mix(c1, c2, shade);

    // tile circle with half the number of rows
    vec2 circleTiling = vec2(xTiling, yTiling / 2.0);
    vec2 circlePos = tile(st, circleTiling);
    
    // align circle with wave
    circlePos = fract(circlePos + vec2(-0.25, 0.5));

    // move with waves - unfortunate magic number here
    circlePos.x = fract(circlePos.x + u_time * 1.91);

    // color circle
    float circle = circle(circlePos, 0.05);
    color = mix(color, c3, circle);
    
	gl_FragColor = vec4(color, 1.0);
}
