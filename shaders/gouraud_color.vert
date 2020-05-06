#version 300 es

precision highp float;

in vec3 vertex_position;
in vec3 vertex_normal;

uniform vec3 light_ambient;
uniform vec3 light_position;
uniform vec3 light_color;
uniform vec3 camera_position;
uniform float material_shininess; // n
uniform mat4 model_matrix;
uniform mat4 view_matrix;
uniform mat4 projection_matrix;


out vec3 ambient;
out vec3 diffuse;
out vec3 specular;

void main() {
    gl_Position = projection_matrix * view_matrix * model_matrix * vec4(vertex_position, 1.0);

    // Calculate ambient light
    ambient = light_ambient;

    // Calculate diffuse light
    vec3 light_direction = normalize(light_position - vertex_position);
    float dot_product = dot(vertex_normal, light_direction);
    if(dot_product < 0.0) {
      dot_product = 0.0;
    }
    diffuse.x = light_color.x * dot_product;
    diffuse.y = light_color.y * dot_product;
    diffuse.z = light_color.z * dot_product;

    // Calculate specular light
    vec3 reflection_direction = normalize((2.0 * dot_product * vertex_normal) - light_direction);
    vec3 view_direction = normalize(camera_position - vertex_position);
    float dot_product2 = dot(reflection_direction, view_direction);
    if(dot_product2 < 0.0) {
      dot_product2 = 0.0;
    }
    specular.x = light_color.x * pow(dot_product2, material_shininess);
    specular.y = light_color.y * pow(dot_product2, material_shininess);
    specular.z = light_color.z * pow(dot_product2, material_shininess);
}
