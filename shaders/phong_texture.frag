#version 300 es

precision mediump float;

in vec3 frag_pos;
in vec3 frag_normal;
in vec2 frag_texcoord;

uniform int num_of_lights;
uniform vec3 light_ambient;
uniform vec3 light_position[10];
uniform vec3 light_color[10];
uniform vec3 camera_position;
uniform vec3 material_color;      // Ka and Kd
uniform vec3 material_specular;   // Ks
uniform float material_shininess; // n
uniform sampler2D image;          // use in conjunction with Ka and Kd

out vec4 FragColor;

void main() {
    vec3 ambient = light_ambient * material_color;
    vec3 diffuse;
    vec3 specular;

    for(int i = 0; i < num_of_lights; i++) {
      //diffuse
      vec3 light_direction = normalize(light_position[i] - frag_pos);
      float dot_product = max(dot(frag_normal, light_direction), 0.0);
      diffuse += light_color[i] * material_color * dot_product;

      //specular
      vec3 reflection_direction = normalize((2.0 * dot_product * frag_normal) - light_direction);
      vec3 view_direction = normalize(camera_position - frag_pos);
      float dot_product2 = max(dot(reflection_direction, view_direction), 0.0);
      specular += light_color[i] * material_specular * pow(dot_product2, material_shininess);
    }
    
    vec4 color = vec4(ambient + diffuse + specular, 1.0);
    color.x = min(color.x, 1.0);
    color.y = min(color.y, 1.0);
    color.z = min(color.z, 1.0);

    FragColor = color * texture(image, frag_texcoord);
}
