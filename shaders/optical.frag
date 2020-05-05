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
    float dist = length(polar);

    float angleDivision = PI / 14.0;

    float distSlice = floor(mod(dist * 30.0, 2.0));
    float shift = u_time * 1.5 * (distSlice * 2.0 - 1.0) * -1.0 * (1.0 - dist);
    float angleSlice = floor(mod(angle / angleDivision + shift, 2.0));
    
    float shade = angleSlice * distSlice + (1.0 - angleSlice) * (1.0 - distSlice);

	gl_FragColor = vec4(vec3(shade), 1.0);
}
