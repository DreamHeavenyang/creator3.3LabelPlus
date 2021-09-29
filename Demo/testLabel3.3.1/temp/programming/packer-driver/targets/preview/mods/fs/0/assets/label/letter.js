System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, Color, js, Vec3, Mat4, bmfont, letterFont, _crd, WHITE, letter, vec3_temp, _worldMatrix;

  function fillMeshVertices3D(node, renderer, renderData, color) {
    var dataList = renderData.data;
    var buffer = renderer.acquireBufferBatch();
    var vertexOffset = buffer.byteOffset >> 2;
    var vertexCount = renderData.vertexCount;
    var indicesOffset = buffer.indicesOffset;
    var vertexId = buffer.vertexOffset;
    var isRecreate = buffer.request(vertexCount, renderData.indicesCount);

    if (!isRecreate) {
      buffer = renderer.currBufferBatch;
      vertexOffset = 0;
      indicesOffset = 0;
      vertexId = 0;
    } // buffer data may be realloc, need get reference after request.


    var vBuf = buffer.vData;
    var iBuf = buffer.iData;
    node.getWorldMatrix(_worldMatrix);

    for (var i = 0; i < vertexCount; i++) {
      var vert = dataList[i];
      Vec3.set(vec3_temp, vert.x, vert.y, 0);
      Vec3.transformMat4(vec3_temp, vec3_temp, _worldMatrix);
      vBuf[vertexOffset++] = vec3_temp.x;
      vBuf[vertexOffset++] = vec3_temp.y;
      vBuf[vertexOffset++] = vec3_temp.z;
      vBuf[vertexOffset++] = vert.u;
      vBuf[vertexOffset++] = vert.v;
      Color.toArray(vBuf, color, vertexOffset);
      vertexOffset += 4;
    } // fill index data


    for (var _i = 0, count = vertexCount / 4; _i < count; _i++) {
      var start = vertexId + _i * 4;
      iBuf[indicesOffset++] = start;
      iBuf[indicesOffset++] = start + 1;
      iBuf[indicesOffset++] = start + 2;
      iBuf[indicesOffset++] = start + 1;
      iBuf[indicesOffset++] = start + 3;
      iBuf[indicesOffset++] = start + 2;
    }
  }

  function _reportPossibleCrUseOfbmfont(extras) {
    _reporterNs.report("bmfont", "./bmfont", _context.meta, extras);
  }

  function _reportPossibleCrUseOfletterFont(extras) {
    _reporterNs.report("letterFont", "./letter-font", _context.meta, extras);
  }

  _export("fillMeshVertices3D", fillMeshVertices3D);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      Color = _cc.Color;
      js = _cc.js;
      Vec3 = _cc.Vec3;
      Mat4 = _cc.Mat4;
    }, function (_unresolved_2) {
      bmfont = _unresolved_2.bmfont;
    }, function (_unresolved_3) {
      letterFont = _unresolved_3.letterFont;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "1fd2eVESwpOyqx8S+uKzC0f", "letter", undefined);

      WHITE = new Color(255, 255, 255, 255);
      /**
       * letter 组装器
       * 可通过 `UI.letter` 获取该组装器。
       */

      _export("letter", letter = {
        createData: function createData(comp) {
          return comp.requestRenderData();
        },
        fillBuffers: function fillBuffers(comp, renderer) {
          if (!comp.renderData) {
            return;
          }

          var node = comp.node;

          comp._setCacheAlpha(node._uiProps.opacity);

          WHITE.a = node._uiProps.opacity * 255;
          fillMeshVertices3D(node, renderer, comp.renderData, WHITE);
        },
        appendQuad: function appendQuad(comp, spriteFrame, rect, rotated, x, y, scale) {
          (_crd && bmfont === void 0 ? (_reportPossibleCrUseOfbmfont({
            error: Error()
          }), bmfont) : bmfont).appendQuad(comp, spriteFrame, rect, rotated, x, y, scale);
        }
      });

      js.addon(letter, _crd && letterFont === void 0 ? (_reportPossibleCrUseOfletterFont({
        error: Error()
      }), letterFont) : letterFont);
      vec3_temp = new Vec3();
      _worldMatrix = new Mat4();

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=letter.js.map