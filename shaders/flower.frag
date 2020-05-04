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

float circle(vec2 st, float radius, vec2 cent) {
    vec2 pos = cent - st;
    float r = radius * 0.75;
    float edge = r * 0.01;
    return 1.0 - smoothstep(r - edge, r + edge, dot(pos, pos) * PI);
}

float circleOutline(vec2 st, float radius, vec2 cent) {
    return 1.0 - circle(st, radius, cent) + circle(st, radius - 0.01, cent);
}

void main() {
    float radius = 1.0;

    vec2 pos = tile(st, 2.0);

    vec2 center = vec2(0.5);

    float color = circleOutline(pos, radius, center);

    for (float i = 0.0; i < 6.0; i++) {
        vec2 cent = center + vec2(
            radius / 2.0 * cos(PI / 3.0 * i),
            radius / 2.0  * sin(PI / 3.0 * i)
        );

        color *= circleOutline(pos, radius, cent);

        for (float j = 0.0; j < 6.0; j++) {
            vec2 c = cent + vec2(
                radius / 2.0 * cos(PI / 3.0 * j),
                radius / 2.0  * sin(PI / 3.0 * j)
            );

            color *= circleOutline(pos, radius, c);
        }
    }

    gl_FragColor = vec4(vec3(color), 1.0);
}
