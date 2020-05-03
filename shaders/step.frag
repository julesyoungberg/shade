#ifdef GL_ES
precision highp float;
#endif

varying vec2 st;

uniform vec2 u_mouse;
uniform float u_time;
uniform vec2 u_resolution;

void main() {
	gl_FragColor = vec4(vec3(step(st.x, st.y)), 1.0);
}
