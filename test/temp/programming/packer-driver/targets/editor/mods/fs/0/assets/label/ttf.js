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
        createData(comp) {
          const renderData = comp.requestRenderData();
          renderData.dataLength = 4;
          renderData.vertexCount = 4;
          renderData.indicesCount = 6;
          const vData = renderData.vData = new Float32Array(4 * 9);
          vData[3] = vData[21] = vData[22] = vData[31] = 0;
          vData[4] = vData[12] = vData[13] = vData[30] = 1;
          let offset = 5;

          for (let i = 0; i < 4; i++) {
            Color.toArray(vData, WHITE, offset);
            offset += 9;
          }

          return renderData;
        },

        fillBuffers(comp, renderer) {
          const renderData = comp.renderData;
          const dataList = renderData.data;
          const node = comp.node;
          let buffer = renderer.acquireBufferBatch();
          let vertexOffset = buffer.byteOffset >> 2;
          let indicesOffset = buffer.indicesOffset;
          let vertexId = buffer.vertexOffset;
          const isRecreate = buffer.request();

          if (!isRecreate) {
            buffer = renderer.currBufferBatch;
            indicesOffset = 0;
            vertexId = 0;
            vertexOffset = 0;
          } // buffer data may be reallocated, need get reference after request.


          const vBuf = buffer.vData;
          const iBuf = buffer.iData;
          const vData = renderData.vData;
          const data0 = dataList[0];
          const data3 = dataList[3];
          /* */

          node.updateWorldTransform(); // @ts-expect-error private property access

          const pos = node._pos;
          const rot = node._rot;
          const scale = node._scale;
          const ax = data0.x * scale.x;
          const bx = data3.x * scale.x;
          const ay = data0.y * scale.y;
          const by = data3.y * scale.y;
          const qx = rot.x;
          const qy = rot.y;
          const qz = rot.z;
          const qw = rot.w;
          const qxy = qx * qy;
          const qzw = qz * qw;
          const qxy2 = qx * qx - qy * qy;
          const qzw2 = qw * qw - qz * qz;
          const cx1 = qzw2 + qxy2;
          const cx2 = (qxy - qzw) * 2;
          const cy1 = qzw2 - qxy2;
          const cy2 = (qxy + qzw) * 2;
          const x = pos.x;
          const y = pos.y; // left bottom

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

        updateVertexData(comp) {
          const renderData = comp.renderData;

          if (!renderData) {
            return;
          }

          const uiTrans = comp.node._uiProps.uiTransformComp;
          const width = uiTrans.width;
          const height = uiTrans.height;
          const appX = uiTrans.anchorX * width;
          const appY = uiTrans.anchorY * height;
          const data = renderData.data;
          data[0].x = -appX;
          data[0].y = -appY;
          data[3].x = width - appX;
          data[3].y = height - appY;
        },

        updateUvs(comp) {
          const renderData = comp.renderData;

          if (!renderData) {
            return;
          }

          const vData = renderData.vData;

          if (!vData || !renderData.uvDirty) {
            return;
          }

          const uv = comp.ttfSpriteFrame.uv;
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