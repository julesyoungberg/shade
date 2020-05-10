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

vec2 truchetPattern(in vec2 _st, in float _index){
    _index = fract(((_index - 0.5) * 2.0));

    if (_index > 0.75) {
        _st = vec2(1.0) - _st;
    } else if (_index > 0.5) {
        _st = vec2(1.0 - _st.x, _st.y);
    } else if (_index > 0.25) {
        _st = 1.0 - vec2(_st.x, 1.0 - _st.y);
    }
    return _st;
}

void main() {
    vec2 uv = st;

    // Set the lens radius
	float lens_radius = 0.2;

	// Calculate the direction to the mouse position and the distance
	vec2 mouse_direction = u_mouse - st;
	float mouse_distance = length(mouse_direction);

    if (mouse_distance < lens_radius) {
		// Calculate the pixel offset
		float exp = 1.0;
		vec2 offset = (1.0 - pow(mouse_distance / lens_radius, exp)) * mouse_direction;

		// Get the pixel color at the offset position
		uv += offset;
	}

    uv *= 10.0;
    // st = (st - vec2(5.0)) * (abs(sin(u_time * 0.2)) * 5.);
    uv.x += u_time * 3.0;

    vec2 ipos = floor(uv);  // integer
    vec2 fpos = fract(uv);  // fraction

    vec2 tile = truchetPattern(fpos, random( ipos ));

    float color = 0.0;

    // Maze
    // color = smoothstep(tile.x-0.3,tile.x,tile.y)-
    //         smoothstep(tile.x,tile.x+0.3,tile.y);

    // Circles
    color = (
        step(length(tile), 0.6) -
        step(length(tile), 0.4)
    ) + (
        step(length(tile - vec2(1.)), 0.6) -
        step(length(tile - vec2(1.)), 0.4)
    );


    gl_FragColor = vec4(vec3(color),1.0);
}