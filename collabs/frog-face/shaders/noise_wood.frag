#ifdef GL_ES
precision highp float;
#endif

varying vec2 st;

uniform vec2 u_mouse;
uniform float u_time;
uniform vec2 u_resolution;

#define PI 3.14159265359

vec3 color(int r, int g, int b) {
    return vec3(float(r) / 255.0, float(g) / 255.0, float(b) / 255.0);
}

// get position within tile
vec2 tile(vec2 st, vec2 tiling) {
    return fract(st * tiling);
}

// get current tile
vec2 tilePos(vec2 st, vec2 tiling) {
    return floor(st * tiling);
}

// generic matrix transformation algorithm
vec2 transform(in vec2 st, mat2 matrix) {
    st -= 0.5;
    st = matrix * st;
    return st + 0.5;
}

vec2 rotate2D(vec2 st, float angle) {
    mat2 matrix = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
    return transform(st, matrix);
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

void main() {
    float scale = 5.0;
    float shift = u_time * 0.5;
    float rotation = noise(st * scale + shift) * PI;
    vec2 pos = rotate2D(st.yx, rotation);

    pos *= 50.0;
    float b = 0.5;
    float shade = smoothstep(0.0, .5 + b * .5, abs((sin(pos.x * PI) + b * 2.0)) * .5);

    // simpler, sharp line solution
    // vec2 tilePos = tilePos(pos, tiling);
    // float shade = mod(tilePos.y, 2.0);

    vec3 c1 = color(92, 209, 123);
    vec3 c2 = color(57, 38, 135);
    vec3 c = mix(c1, c2, shade);

	gl_FragColor = vec4(c, 1.0);
}
