System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, BitmapFont, Label, bmfont, CanvasPool, letter, ttf, _crd, labelAssembler;

  function _reportPossibleCrUseOfbmfont(extras) {
    _reporterNs.report("bmfont", "./bmfont", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCanvasPool(extras) {
    _reporterNs.report("CanvasPool", "./font-utils", _context.meta, extras);
  }

  function _reportPossibleCrUseOfletter(extras) {
    _reporterNs.report("letter", "./letter", _context.meta, extras);
  }

  function _reportPossibleCrUseOfttf(extras) {
    _reporterNs.report("ttf", "./ttf", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      BitmapFont = _cc.BitmapFont;
      Label = _cc.Label;
    }, function (_unresolved_2) {
      bmfont = _unresolved_2.bmfont;
    }, function (_unresolved_3) {
      CanvasPool = _unresolved_3.CanvasPool;
    }, function (_unresolved_4) {
      letter = _unresolved_4.letter;
    }, function (_unresolved_5) {
      ttf = _unresolved_5.ttf;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "4c451j9NPBNS536N4GmUEPl", "index", undefined);

      _export("labelAssembler", labelAssembler = {
        getAssembler(comp) {
          let assembler = _crd && ttf === void 0 ? (_reportPossibleCrUseOfttf({
            error: Error()
          }), ttf) : ttf;

          if (comp.font instanceof BitmapFont) {
            assembler = _crd && bmfont === void 0 ? (_reportPossibleCrUseOfbmfont({
              error: Error()
            }), bmfont) : bmfont;
          } else if (comp.cacheMode === Label.CacheMode.CHAR) {
            assembler = _crd && letter === void 0 ? (_reportPossibleCrUseOfletter({
              error: Error()
            }), letter) : letter;
          }

          return assembler;
        } // Skip invalid labels (without own _assembler)
        // updateRenderData(label) {
        //     return label.__allocedDatas;
        // }


      });

      _export("ttf", ttf);

      _export("bmfont", bmfont);

      _export("letter", letter);

      _export("CanvasPool", CanvasPool);

      Label.Assembler = labelAssembler;

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=index.js.map