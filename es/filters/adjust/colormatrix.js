'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (wr, wg, wb, bias) {
  var gl = store.get('gl');
  gl.colorMatrix = gl.colorMatrix || new _shader2.default(null, '\
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

  _util.simpleShader.call(this, gl.colorMatrix, {
    weightsR: wr,
    weightsG: wg,
    weightsB: wb,
    bias: bias
  });

  return this;
};

var _shader = require('../../shader');

var _shader2 = _interopRequireDefault(_shader);

var _util = require('../../util');

var _store = require('../../store');

var store = _interopRequireWildcard(_store);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }