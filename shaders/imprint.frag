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

float circle(vec2 st, float radius) {
    vec2 pos = vec2(0.5) - st;
    float r = radius * 0.75;
    float edge = r * 0.01;
    return 1.0 - smoothstep(r - edge, r + edge, dot(pos, pos) * PI);
}

void main() {
    vec3 color = vec3(0.0);

    vec3 blue = vec3(0.075, 0.114, 0.329);
    vec3 baige = vec3(0.973, 0.843, 0.675);
    vec3 red = vec3(0.761, 0.247, 0.102);

    // get background circle color
    float tiling1 = 10.0;
    vec2 grid1 = tile(st + u_mouse * .01, tiling1);
    vec2 tilePos1 = tilePos(st, tiling1);
    grid1.y = fract(grid1.y + (mod(tilePos1.x, 2.0) * 2.0 - 1.0) * u_time * 0.25);
    color += mix(blue, baige, circle(grid1, 0.4) - circle(grid1, 0.02));

    // get foreground circle color
    float tiling2 = 4.0;
    vec2 grid2 = tile(st + u_mouse * -.02, tiling2);
    vec2 tilePos2 = tilePos(st, tiling2);
    grid2.y = fract(grid2.y + mod(tilePos2.x, 2.0) * 0.5);
    color = mix(
        color,
        mix(
            red, 
            vec3(0.0), 
            circle(grid2, sin(u_time+0.5) * 0.05 + 0.05)
        ),
        circle(grid2, sin(u_time) * 0.15 + 0.25)
    );

    gl_FragColor = vec4(color, 1.0);
}
