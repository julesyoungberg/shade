#ifdef GL_ES
precision highp float;
#endif

varying vec2 st;

uniform vec2 u_mouse;
uniform float u_time;
uniform vec2 u_resolution;

// 2D Random
float random(in vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

// 2D Noise based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise(in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    // Smooth Interpolation

    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f * f * (3.0 - 2.0 * f);
    // u = smoothstep(0.,1.,f);

    // Mix 4 coorners percentages
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

void main() {
    vec2 pos = st * vec2(5.0, 2.0);

    vec2 ipos = floor(pos);
    vec2 fpos = fract(pos);

    fpos = fract(fpos + noise(pos * 200.0) / 13.0);

    float size = noise(ipos) / 10.0 + 0.09 + sin(u_time * (noise(ipos) * 0.8 + 0.2)) * 0.015;

    vec2 bl = step(vec2(size), fpos);       // bottom-left
    vec2 tr = step(vec2(size), 1.0 - fpos);   // top-right
    float shade = bl.x * bl.y * tr.x * tr.y;

    vec3 bg = vec3(noise(pos) / (sin(u_time * noise(pos)) + 4.0), 0.0, 0.0);

    float red = noise(pos) / 3.0 + 0.25;
    float green = noise(ipos * 44.99) / 5.0;
    float blue = noise(ipos * 66.78) / 3.0;
    vec3 color = vec3(red, green, blue);

	gl_FragColor = vec4(mix(bg, color, shade), 1.0);
}
