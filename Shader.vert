#version 300 es

layout (location = 0) in vec3 aPos;
uniform mat4 mvp;

void main()
{
   gl_Position = vec4(aPos, 1.0) * mvp;
}
