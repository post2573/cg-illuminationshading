#version 300 es

precision mediump float;

in vec3 frag_pos;
in vec3 frag_normal;

uniform vec3 light_ambient;
uniform vec3 light_position;
uniform vec3 light_color;
uniform vec3 camera_position;
uniform vec3 material_color;      // Ka and Kd
uniform vec3 material_specular;   // Ks
uniform float material_shininess; // n

out vec4 FragColor;

void main() {
    vec3 ambient = light_ambient * material_color;

    vec3 light_direction = normalize(light_position - frag_pos);
    float dot_product = max(dot(frag_normal, light_direction), 0.0);
    vec3 diffuse = light_color * material_color * dot_product;

    vec3 reflection_direction = normalize((2.0 * dot_product * frag_pos) - light_direction);
    vec3 view_direction = normalize(camera_position - frag_pos);
    float dot_product2 = max(dot(reflection_direction, view_direction), 0.0);
    vec3 specular = light_color * material_specular * pow(dot_product2, material_shininess);

    FragColor = vec4(ambient, 1.0);
}
