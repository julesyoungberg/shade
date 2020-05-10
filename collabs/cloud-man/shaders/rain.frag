// credit: https://github.com/jagracar/webgl-shader-examples/blob/master/shaders/frag-rain.glsl
#ifdef GL_ES
precision highp float;
#endif

varying vec2 st;

uniform vec2 u_mouse;
uniform float u_time;
uniform vec2 u_resolution;

#define PI 3.14159265359

vec3 color(int r, int g, int b) {
    return vec3(float(r) / 255.0, float(g) / 255.0, float(b) / 255.0);
}

float random(float dt) {
    highp float c = 43758.5453;
    highp float sn = mod(dt, 3.14);
    return fract(sin(sn) * c);
}

/*
 *  Returns a random drop position for the given seed value
 */
vec2 random_drop_pos(float val, vec2 screen_dim, vec2 velocity) {
    float max_x_move = velocity.x * abs(screen_dim.y / velocity.y);
    float x = -max_x_move * step(0.0, max_x_move) + (screen_dim.x * 2.0 + abs(max_x_move)) * random(val);
    float y = (1.75 + 0.05 * random(1.234 * val)) * screen_dim.y;

    return vec2(x, y);
}

/*
 * Calculates the drop trail color at the given pixel position
 */
vec3 trail_color(vec2 pixel, vec2 pos, vec2 velocity_dir, float width, float size) {
    vec2 pixel_dir = pixel - pos;
    float projected_dist = dot(pixel_dir, -velocity_dir);
    float tanjential_dist_sq = dot(pixel_dir, pixel_dir) - pow(projected_dist, 2.0);
    float width_sq = pow(width * 3.0, 2.0);

    float line = step(0.0, projected_dist) * (1.0 - smoothstep(width_sq / 2.0, width_sq, tanjential_dist_sq));
    float dashed_line = line * step(0.5, cos(0.3 * projected_dist - PI / 3.0));
    float fading_dashed_line = dashed_line * (1.0 - smoothstep(size / 5.0, size, projected_dist));

    vec3 color = mix(vec3(0.0), vec3(0.4, 0.4, 1.0), fading_dashed_line);

    return color;
}

/*
 * Calculates the drop wave color at the given pixel position
 */
vec3 wave_color(vec2 pixel, vec2 pos, float size, float time) {
    vec2 pixel_dir = pixel - pos;
    float distorted_dist = length(pixel_dir * vec2(1.0, 3.5));

    float inner_radius = (0.05 + 0.8 * time) * size;
    float outer_radius = inner_radius + 0.25 * size;

    float ring = smoothstep(inner_radius, inner_radius + 5.0, distorted_dist)
            * (1.0 - smoothstep(outer_radius, outer_radius + 5.0, distorted_dist));
    float fading_ring = ring * (1.0 - smoothstep(0.0, 0.7, time));

    vec3 color = mix(vec3(0.0), vec3(0.4, 0.4, 1.0), fading_ring);

    return color;
}

/*
 * Calculates the background color at the given pixel position
 */
vec3 background_color(vec2 pixel, vec2 screen_dim, float time) {
    vec3 black = color(0, 40, 100);
    vec3 blue = color(89, 172, 217);

    return mix(black, blue, smoothstep(screen_dim.y / 90.0, screen_dim.y, pixel.y));
}

void main() {
    // Set the total number of rain drops that are visible at a given time
    const float n_drops = 80.0;

    // Set the drop trail radius
    float trail_width = 2.0;

    // Set the drop trail size
    float trail_size = 70.0;

    // Set the drop wave size
    float wave_size = 40.0;

    // Set the drop fall time in seconds
    float fall_time = 1.0;

    // Set the drop total life time
    float life_time = fall_time + 0.5;

    // Set the drop velocity in pixels per second
    vec2 velocity = vec2(-0.5 * u_resolution.x, -1.5 * u_resolution.y) / fall_time;
    vec2 velocity_dir = normalize(velocity);

    // Iterate over the drops to calculate the pixel color
    vec3 pixel_color = vec3(0.0);

    for (float i = 0.0; i < n_drops; ++i) {
        // Offset the running time for each drop
        float time = u_time + life_time * (i + i / n_drops);

        // Calculate the time since the drop appeared on the screen
        float ellapsed_time = mod(time, life_time);

        // Calculate the drop initial position
        vec2 initial_pos = random_drop_pos(i + floor(time / life_time - i) * n_drops, u_resolution, velocity);

        // Add the drop to the pixel color
        if (ellapsed_time < fall_time) {
            // Calculate the drop current position
            vec2 current_pos = initial_pos + ellapsed_time * velocity;

            // Add the trail color to the pixel color
            pixel_color += trail_color(gl_FragCoord.xy, current_pos, velocity_dir, trail_width, trail_size);
        } else {
            // Calculate the drop final position
            vec2 final_pos = initial_pos + fall_time * velocity;

            // Add the wave color to the pixel color
            pixel_color += wave_color(gl_FragCoord.xy, final_pos, wave_size, ellapsed_time - fall_time);
        }
    }

    // Add the background color to the pixel color
    pixel_color += background_color(gl_FragCoord.xy, u_resolution, u_time);

	// Fragment shader output
    gl_FragColor = vec4(pixel_color, 1.0);
}
