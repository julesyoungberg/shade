#ifdef GL_ES
precision highp float;
#endif

varying vec2 st;

uniform vec2 u_mouse;
uniform float u_time;
uniform vec2 u_resolution;

float random(in vec2 _st) {
    float multiplier = 43758.5453123;
    vec2 v = vec2(12.9898,78.233);

    return fract(sin(dot(_st.xy, v)) * multiplier);
}

void main() {
    vec2 pos = st * vec2(1.0, 100.0);

    pos *= vec2(random(vec2(floor(pos.y)) + vec2(3.399, 10.223)) * 100.0, 1.0);

    pos.x += u_time * (random(vec2(floor(pos.y))) * 20.0 - 10.0);

    vec2 ipos = floor(pos);  // integer
    vec2 fpos = fract(pos);  // fraction

    float shade = random(ipos);
    shade = step(1.0 - min(u_mouse.x, u_mouse.y), shade) * shade;

	gl_FragColor = vec4(vec3(shade), 1.0);
}
