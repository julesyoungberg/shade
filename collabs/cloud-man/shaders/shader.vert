// Always include this to get the position of the pixel and map the shader correctly onto the shape

#ifdef GL_ES
precision highp float;
#endif

// our vertex data
attribute vec3 aPosition;
attribute vec2 aTexCoord;

varying vec2 st;

void main() {
    st = aTexCoord;

    // copy the position data into a vec4, using 1.0 as the w component
    vec4 positionVec4 = vec4(aPosition, 1.0);
    positionVec4.xy = positionVec4.xy * 2.0 - 1.0;

    // send the vertex information on to the fragment shader
    gl_Position = positionVec4;
}
