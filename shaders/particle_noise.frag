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

vec2 random2(vec2 st){
    st = vec2( dot(st,vec2(127.1,311.7)),
              dot(st,vec2(269.5,183.3)) );
    return -1.0 + 2.0*fract(sin(st)*43758.5453123);
}

// Gradient Noise by Inigo Quilez - iq/2013
// https://www.shadertoy.com/view/XdXGW8
float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    vec2 u = f*f*(3.0-2.0*f);

    return mix( mix( dot( random2(i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ),
                     dot( random2(i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                mix( dot( random2(i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ),
                     dot( random2(i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
}

float circle(vec2 st, float radius) {
    vec2 pos = vec2(0.5) - st;
    float r = radius * 0.75;
    float edge = r * 0.01;
    return 1.0 - smoothstep(r - edge, r + edge, dot(pos, pos) * PI);
}

void main() {
    float tiling = 40.0;
    vec2 pos = tile(st, tiling);
    vec2 tilePos = tilePos(st, tiling);

    float sgn = sin(u_time * (noise(tilePos / tiling * 9.0) * 5.0 + 3.0) + PI) / 1.0 + 1.0;
    float radius = min(sgn * (noise(tilePos / tiling * 10.0) * 0.7 + 0.4), 1.0);
    vec3 color = 1.0 - vec3(circle(pos, radius));

    gl_FragColor = vec4(color, 1.0);
}
