#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_mouse;
uniform float u_time;
uniform vec2 u_resolution;

vec2 random2( vec2 p ) {
    return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st.x *= u_resolution.x / u_resolution.y;
    vec2 uv = st;

    // Scale
    st *= 3.0;

    // Tile the space
    vec2 i_st = floor(st);
    vec2 f_st = fract(st);

    float m_dist = 1.0;

    for (int y = -1; y <= 1; y++) {
        for (int x = -1; x <= 1; x++) {
            vec2 neighbor = vec2(x, y);
            vec2 point = random2(i_st + neighbor);

            point = 0.5 + 0.5 * sin(u_time + 6.2831 * point);

            vec2 diff = neighbor + point - f_st;
            float dist = length(diff);
            m_dist = min(m_dist, m_dist * dist);
        }
    }

    vec3 color = vec3(0);
    color += step(0.060, m_dist);

    gl_FragColor = vec4(color, 1.0);
}
