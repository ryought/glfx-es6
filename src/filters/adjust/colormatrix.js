import Shader from '../../shader'
import {simpleShader, clamp} from '../../util'
import * as store from '../../store'

/**
 * @filter           Color Matrix
 * @description      apply color substitution matrix to each pixel
 * @param wr         [w_rr, w_rb, w_rg] w: (float)0 to 1 r_out = w_rr r + w_rb b + w_rg g
 * @param wg         [w_gr, w_gb, w_gg] w: (float)0 to 1
 * @param wb         [w_br, w_bb, w_bg] w: (float)0 to 1
 * @param bias       [b_r, b_b, b_g] (0, 1)
 */

export default function(wr, wg, wb, bias) {
  var gl = store.get('gl')
  gl.colorMatrix = gl.colorMatrix || new Shader(null, '\
        uniform sampler2D texture;\
        uniform vec3 weightsR;\
        uniform vec3 weightsG;\
        uniform vec3 weightsB;\
        uniform vec3 bias;\
        varying vec2 texCoord;\
        void main() {\
            vec4 color = texture2D(texture, texCoord);\
            float len = length(color.rgb);\
            color.rgb = vec3(\
                dot(color.rgb, weightsR) + bias.x,\
                dot(color.rgb, weightsG) + bias.y,\
                dot(color.rgb, weightsB) + bias.z\
            );\
            gl_FragColor = color;\
        }\
    ');

  simpleShader.call(this, gl.colorMatrix, {
    weightsR: wr,
    weightsG: wg,
    weightsB: wb,
    bias: bias
  });

  return this;
}
