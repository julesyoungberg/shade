#ifdef GL_ES
precision highp float;
#endif

varying vec2 st;

uniform vec2 u_mouse;
uniform float u_time;
uniform vec2 u_resolution;

#define PI 3.14159265359

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

float shape(vec2 st, float radius) {
    st = vec2(0.5) - st;
    float r = length(st) * 2.0;
    float a = atan(st.y, st.x);
    float m = abs(mod(a + u_time * 2.0, PI * 2.0) - PI) / 3.6;
    float f = radius;
    m += noise(st + u_time * 0.1) * 0.5;
    f += sin(a * 50.0) * noise(st + u_time * 0.2) * 0.1;
    f += (sin(a * 20.0) * 0.1 * pow(m, 2.0));
    return 1.0 - smoothstep(f, f + 0.007, r);
}

float shapeBorder(vec2 st, float radius, float width) {
    return shape(st, radius) - shape(st, radius - width);
}

void main(){
    vec3 color = vec3(1.0) * shapeBorder(st,0.8,0.02);
	gl_FragColor = vec4( 1.-color, 1.0 );
}
