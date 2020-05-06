#version 300 es

precision mediump float;

in vec3 ambient;
in vec3 diffuse;
in vec3 specular;

uniform vec3 material_color;    // Ka and Kd
uniform vec3 material_specular; // Ks

out vec4 FragColor;

void main() {
    vec3 final_ambient = vec3(ambient.x * material_color.x, ambient.y * material_color.y, ambient.z * material_color.z);
    vec3 final_diffuse = vec3(diffuse.x * material_color.x, diffuse.y * material_color.y, diffuse.z * material_color.z);
    vec3 final_specular = vec3(specular.x * material_specular.x, specular.y * material_specular.y, specular.z * material_specular.z);

    vec3 final_color = final_ambient + final_diffuse + final_specular;
    FragColor = vec4(final_color, 1.0);
}
