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
    float dist = distance(st, cent);
    return 1.0 - step(radius, dist);
}

float circleOutline(vec2 st, float radius, vec2 cent) {
    return 1.0 - circle(st, radius, cent) + circle(st, radius - 0.005, cent);
}

void main() {
    float radius = 0.2;

    float tiling = 1.0;
    vec2 pos = tile(st, tiling);
    // vec2 tilePos = tilePos(st, tiling);
    // pos.y = fract(pos.y - mod(tilePos.y + 1.0, 2.0) * 0.14);

    vec2 center = vec2(0.5);

    float color = circleOutline(pos, radius, center);

    for (float i = 0.0; i < 6.0; i++) {
        vec2 cent = center + vec2(
            radius * cos(PI / 3.0 * i),
            radius * sin(PI / 3.0 * i)
        );

        color *= circleOutline(pos, radius, cent);

        for (float j = 0.0; j < 6.0; j++) {
            vec2 c = cent + vec2(
                radius * cos(PI / 3.0 * j),
                radius * sin(PI / 3.0 * j)
            );

            color *= circleOutline(pos, radius, c);

            for (float k = 0.0; k < 6.0; k++) {
                vec2 c2 = c + vec2(
                    radius * cos(PI / 3.0 * k),
                    radius * sin(PI / 3.0 * k)
                );

                color *= circleOutline(pos, radius, c2);
            }
        }
    }

    gl_FragColor = vec4(vec3(color), 1.0);
}
