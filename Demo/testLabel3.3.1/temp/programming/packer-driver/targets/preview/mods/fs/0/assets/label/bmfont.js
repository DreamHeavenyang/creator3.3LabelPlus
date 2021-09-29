System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, Color, js, bmfontUtils, fillMeshVertices3D, _crd, tempColor, bmfont;

  function _reportPossibleCrUseOfbmfontUtils(extras) {
    _reporterNs.report("bmfontUtils", "./bmfontUtils", _context.meta, extras);
  }

  function _reportPossibleCrUseOffillMeshVertices3D(extras) {
    _reporterNs.report("fillMeshVertices3D", "./letter", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      Color = _cc.Color;
      js = _cc.js;
    }, function (_unresolved_2) {
      bmfontUtils = _unresolved_2.bmfontUtils;
    }, function (_unresolved_3) {
      fillMeshVertices3D = _unresolved_3.fillMeshVertices3D;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "bf714Wj2rROvZo9KiUu4CjE", "bmfont", undefined);

      tempColor = new Color(255, 255, 255, 255);
      /**
       * bmfont 组装器
       * 可通过 `UI.bmfont` 获取该组装器。
       */

      _export("bmfont", bmfont = {
        createData: function createData(comp) {
          return comp.requestRenderData();
        },
        fillBuffers: function fillBuffers(comp, renderer) {
          var node = comp.node;

          comp._setCacheAlpha(node._uiProps.opacity);

          tempColor.set(comp.color);
          tempColor.a = node._uiProps.opacity * 255;
          (_crd && fillMeshVertices3D === void 0 ? (_reportPossibleCrUseOffillMeshVertices3D({
            error: Error()
          }), fillMeshVertices3D) : fillMeshVertices3D)(node, renderer, comp.renderData, tempColor);
        },
        appendQuad: function appendQuad(comp, spriteFrame, rect, rotated, x, y, scale) {
          var renderData = comp.renderData;

          if (!renderData) {
            return;
          }

          var dataOffset = renderData.dataLength;
          renderData.dataLength += 4;
          renderData.vertexCount = renderData.dataLength;
          renderData.indicesCount = renderData.dataLength / 2 * 3;
          var dataList = renderData.data;
          var texW = spriteFrame.width;
          var texH = spriteFrame.height;
          var rectWidth = rect.width;
          var rectHeight = rect.height;
          var l = 0;
          var b = 0;
          var t = 0;
          var r = 0;

          if (!rotated) {
            l = rect.x / texW;
            r = (rect.x + rectWidth) / texW;
            b = (rect.y + rectHeight) / texH;
            t = rect.y / texH;
            dataList[dataOffset].u = l;
            dataList[dataOffset].v = b;
            dataList[dataOffset + 1].u = r;
            dataList[dataOffset + 1].v = b;
            dataList[dataOffset + 2].u = l;
            dataList[dataOffset + 2].v = t;
            dataList[dataOffset + 3].u = r;
            dataList[dataOffset + 3].v = t;
          } else {
            l = rect.x / texW;
            r = (rect.x + rectHeight) / texW;
            b = (rect.y + rectWidth) / texH;
            t = rect.y / texH;
            dataList[dataOffset].u = l;
            dataList[dataOffset].v = t;
            dataList[dataOffset + 1].u = l;
            dataList[dataOffset + 1].v = b;
            dataList[dataOffset + 2].u = r;
            dataList[dataOffset + 2].v = t;
            dataList[dataOffset + 3].u = r;
            dataList[dataOffset + 3].v = b;
          }

          dataList[dataOffset].x = x;
          dataList[dataOffset].y = y - rectHeight * scale;
          dataList[dataOffset + 1].x = x + rectWidth * scale;
          dataList[dataOffset + 1].y = y - rectHeight * scale;
          dataList[dataOffset + 2].x = x;
          dataList[dataOffset + 2].y = y;
          dataList[dataOffset + 3].x = x + rectWidth * scale;
          dataList[dataOffset + 3].y = y;
        }
      });

      js.addon(bmfont, _crd && bmfontUtils === void 0 ? (_reportPossibleCrUseOfbmfontUtils({
        error: Error()
      }), bmfontUtils) : bmfontUtils);

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=bmfont.js.map