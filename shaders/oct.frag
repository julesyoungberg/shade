#ifdef GL_ES
precision highp float;
#endif

varying vec2 st;

uniform vec2 u_mouse;
uniform float u_time;
uniform vec2 u_resolution;

#define PI 3.14159265359
#define TWO_PI 6.28318530718

// get position within tile
vec2 tile(vec2 st, float tiling) {
    return fract(st * tiling);
}

// get current tile
vec2 tilePos(vec2 st, float tiling) {
    return floor(st * tiling);
}

float distanceField(vec2 st, int n) {
    // Remap the space to -1. to 1.
    vec2 pos = st * 2.0 - 1.0;

    // Angle and radius from the current pixel
    float a = atan(pos.x, pos.y) + PI;
    float r = TWO_PI / float(n);

    // Shaping function that modulate the distance
    float d = cos(floor(.5 + a / r) * r - a) * length(pos);

    return d;
}

void main() {
    float tiling = 5.0;
    vec2 pos = tile(st, tiling);
    vec2 tilePos = tilePos(st, tiling);

    float d = distanceField(pos, 8);

    float timeStep = floor(mod(u_time * 5.0, 3.0));

    float size = 0.7;
    float shade = step(size, d) + (1.0 - step(size - 0.01, d));
    float stp = floor(mod(d * -10.0 + timeStep, 3.0));

    vec3 c1 = vec3(0.676, 0.565, 0.914);
    vec3 c2 = vec3(0.388, 1.000, 0.980);
    vec3 c3 = vec3(0.569, 0.941, 0.565);

    vec3 color = mix(
        mix(c1, c2, step(1.0, stp)),
        c3,
        step(2.0, stp)
    );

    gl_FragColor = vec4(color, 1.0);
}
