System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, Color, js, ttfUtils, _crd, WHITE, ttf;

  function _reportPossibleCrUseOfttfUtils(extras) {
    _reporterNs.report("ttfUtils", "./ttfUtils", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      Color = _cc.Color;
      js = _cc.js;
    }, function (_unresolved_2) {
      ttfUtils = _unresolved_2.ttfUtils;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "ca2ecYGG2hFkKRTwHYGnaL6", "ttf", undefined);

      /**
       * ui-assembler 相关模块
       * @module ui-assembler
       */
      WHITE = Color.WHITE.clone();
      /**
       * ttf 组装器
       * 可通过 `UI.ttf` 获取该组装器。
       */

      _export("ttf", ttf = {
        createData: function createData(comp) {
          var renderData = comp.requestRenderData();
          renderData.dataLength = 4;
          renderData.vertexCount = 4;
          renderData.indicesCount = 6;
          var vData = renderData.vData = new Float32Array(4 * 9);
          vData[3] = vData[21] = vData[22] = vData[31] = 0;
          vData[4] = vData[12] = vData[13] = vData[30] = 1;
          var offset = 5;

          for (var i = 0; i < 4; i++) {
            Color.toArray(vData, WHITE, offset);
            offset += 9;
          }

          return renderData;
        },
        fillBuffers: function fillBuffers(comp, renderer) {
          var renderData = comp.renderData;
          var dataList = renderData.data;
          var node = comp.node;
          var buffer = renderer.acquireBufferBatch();
          var vertexOffset = buffer.byteOffset >> 2;
          var indicesOffset = buffer.indicesOffset;
          var vertexId = buffer.vertexOffset;
          var isRecreate = buffer.request();

          if (!isRecreate) {
            buffer = renderer.currBufferBatch;
            indicesOffset = 0;
            vertexId = 0;
            vertexOffset = 0;
          } // buffer data may be reallocated, need get reference after request.


          var vBuf = buffer.vData;
          var iBuf = buffer.iData;
          var vData = renderData.vData;
          var data0 = dataList[0];
          var data3 = dataList[3];
          /* */

          node.updateWorldTransform(); // @ts-expect-error private property access

          var pos = node._pos;
          var rot = node._rot;
          var scale = node._scale;
          var ax = data0.x * scale.x;
          var bx = data3.x * scale.x;
          var ay = data0.y * scale.y;
          var by = data3.y * scale.y;
          var qx = rot.x;
          var qy = rot.y;
          var qz = rot.z;
          var qw = rot.w;
          var qxy = qx * qy;
          var qzw = qz * qw;
          var qxy2 = qx * qx - qy * qy;
          var qzw2 = qw * qw - qz * qz;
          var cx1 = qzw2 + qxy2;
          var cx2 = (qxy - qzw) * 2;
          var cy1 = qzw2 - qxy2;
          var cy2 = (qxy + qzw) * 2;
          var x = pos.x;
          var y = pos.y; // left bottom

          vData[0] = cx1 * ax + cx2 * ay + x;
          vData[1] = cy1 * ay + cy2 * ax + y; // right bottom

          vData[9] = cx1 * bx + cx2 * ay + x;
          vData[10] = cy1 * ay + cy2 * bx + y; // left top

          vData[18] = cx1 * ax + cx2 * by + x;
          vData[19] = cy1 * by + cy2 * ax + y; // right top

          vData[27] = cx1 * bx + cx2 * by + x;
          vData[28] = cy1 * by + cy2 * bx + y;
          vBuf.set(vData, vertexOffset); // fill index data

          iBuf[indicesOffset++] = vertexId;
          iBuf[indicesOffset++] = vertexId + 1;
          iBuf[indicesOffset++] = vertexId + 2;
          iBuf[indicesOffset++] = vertexId + 2;
          iBuf[indicesOffset++] = vertexId + 1;
          iBuf[indicesOffset++] = vertexId + 3;
        },
        updateVertexData: function updateVertexData(comp) {
          var renderData = comp.renderData;

          if (!renderData) {
            return;
          }

          var uiTrans = comp.node._uiProps.uiTransformComp;
          var width = uiTrans.width;
          var height = uiTrans.height;
          var appX = uiTrans.anchorX * width;
          var appY = uiTrans.anchorY * height;
          var data = renderData.data;
          data[0].x = -appX;
          data[0].y = -appY;
          data[3].x = width - appX;
          data[3].y = height - appY;
        },
        updateUvs: function updateUvs(comp) {
          var renderData = comp.renderData;

          if (!renderData) {
            return;
          }

          var vData = renderData.vData;

          if (!vData || !renderData.uvDirty) {
            return;
          }

          var uv = comp.ttfSpriteFrame.uv;
          vData[3] = uv[0];
          vData[4] = uv[1];
          vData[12] = uv[2];
          vData[13] = uv[3];
          vData[21] = uv[4];
          vData[22] = uv[5];
          vData[30] = uv[6];
          vData[31] = uv[7];
          renderData.uvDirty = false;
        }
      });

      js.addon(ttf, _crd && ttfUtils === void 0 ? (_reportPossibleCrUseOfttfUtils({
        error: Error()
      }), ttfUtils) : ttfUtils);

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=ttf.js.map