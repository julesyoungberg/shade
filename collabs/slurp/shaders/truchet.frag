// credit: https://github.com/jagracar/webgl-shader-examples/blob/master/shaders/frag-rain.glsl
#ifdef GL_ES
precision highp float;
#endif

varying vec2 st;

uniform vec2 u_mouse;
uniform float u_time;
uniform vec2 u_resolution;

#define PI 3.14159265359

float hash21(vec2 p) {
    p = fract(p * vec2(234.34, 435.345));
    p += dot(p, p);
    return fract(p.x * p.y);
}

vec3 truchet_pattern(vec2 p, float width) {
    vec2 gv = fract(p) - 0.5;
    vec2 id = floor(p);

    float n = hash21(id);
    if (n < 0.5) gv.x *= -1.0;
    
    vec2 c_uv = gv - 0.5 * sign(gv.x + gv.y + 0.001);
    float d = length(c_uv);

    float mask = smoothstep(0.01, -0.01, abs(d - 0.5) - width);

    float angle = atan(c_uv.x, c_uv.y);
    float checker = mod(id.x + id.y, 2.0) * 2.0 - 1.0;

    // float flow = sin(angle * checker * 10.0 + 2.0 * time);
    float x = fract(checker * angle / 1.57 + u_time);
    float y = (d - (0.5 - width)) / (width * 2.0);
    y = abs(y - 0.5) * 2.0; // mirror
    // if (n < 0.5 ^^ checker > 0.0) y = 1.0 - y; // continuous
    return vec3(x, y, mask);
}

void main() {
    vec2 uv = st * 2.0 - 1.0;
    uv.x *= u_resolution.x / u_resolution.y;

    vec3 color = vec3(0.0);

    vec2 og = uv;
    
    uv.y += u_time * 0.1;
    uv *= 8.0;

    vec3 truchet = truchet_pattern(uv, 0.25 * (1.0 - length(og) * 0.8));
    vec2 t_uv = truchet.xy;
    float mask = truchet.z;
    float y = t_uv.y;
    t_uv.y *= 0.3;
    t_uv.x -= 0.5;
    t_uv *= 2.0;
    t_uv.x = fract(t_uv.x) - 0.5;

    color += mask * smoothstep(0.2, 0.21, abs(length(t_uv))) * (1.0 - y) * vec3(0.42, 0.96, 0.53);

    // if (gv.x > 0.48 || gv.y > 0.48) color = vec3(1, 0, 0);
    
    gl_FragColor = vec4(color, 1);
}
