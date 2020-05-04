#ifdef GL_ES
precision highp float;
#endif

varying vec2 st;

uniform vec2 u_mouse;
uniform float u_time;
uniform vec2 u_resolution;

#define PI 3.14159265359

void main() {
    vec2 polar = st - vec2(0.5);

    float angle = atan(polar.y, polar.x);

    float division = PI / 8.0;

    float slice = floor(mod(angle / division + u_time * 1.5, 2.0));

    vec3 blue = vec3(0.239, 0.204, 0.922);
    vec3 pink = vec3(0.886, 0.561, 0.949);

    vec3 color = mix(blue, pink, slice);

    gl_FragColor = vec4(color, 1.0);
}
