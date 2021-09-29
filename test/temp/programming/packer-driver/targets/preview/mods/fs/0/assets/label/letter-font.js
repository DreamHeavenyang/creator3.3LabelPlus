System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, LabelOutline, bmfontUtils, shareLabelInfo, LetterAtlas, computeHash, _crd, _atlasWidth, _atlasHeight, _isBold, _shareAtlas, letterFont;

  function mixin(object) {
    object = object || {};

    for (var _len = arguments.length, sources = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      sources[_key - 1] = arguments[_key];
    }

    for (var _i = 0, _sources = sources; _i < _sources.length; _i++) {
      var source = _sources[_i];

      if (source) {
        if (typeof source !== "object") {
          // errorID(5403, source);
          continue;
        }

        for (var name in source) {
          _copyprop(name, source, object);
        }
      }
    }

    return object;
  }

  function _copyprop(name, source, target) {
    var pd = getPropertyDescriptor(source, name);

    if (pd) {
      Object.defineProperty(target, name, pd);
    }
  }

  function getPropertyDescriptor(object, propertyName) {
    while (object) {
      var pd = Object.getOwnPropertyDescriptor(object, propertyName);

      if (pd) {
        return pd;
      }

      object = Object.getPrototypeOf(object);
    }

    return null;
  }

  function _reportPossibleCrUseOfbmfontUtils(extras) {
    _reporterNs.report("bmfontUtils", "./bmfontUtils", _context.meta, extras);
  }

  function _reportPossibleCrUseOfshareLabelInfo(extras) {
    _reporterNs.report("shareLabelInfo", "./font-utils", _context.meta, extras);
  }

  function _reportPossibleCrUseOfLetterAtlas(extras) {
    _reporterNs.report("LetterAtlas", "./font-utils", _context.meta, extras);
  }

  function _reportPossibleCrUseOfcomputeHash(extras) {
    _reporterNs.report("computeHash", "./font-utils", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      LabelOutline = _cc.LabelOutline;
    }, function (_unresolved_2) {
      bmfontUtils = _unresolved_2.bmfontUtils;
    }, function (_unresolved_3) {
      shareLabelInfo = _unresolved_3.shareLabelInfo;
      LetterAtlas = _unresolved_3.LetterAtlas;
      computeHash = _unresolved_3.computeHash;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "155feIwRfpN94MXUXvp3aLN", "letter-font", undefined);

      _atlasWidth = 1024;
      _atlasHeight = 1024;
      _isBold = false;
      _shareAtlas = null;

      _export("letterFont", letterFont = mixin(_crd && bmfontUtils === void 0 ? (_reportPossibleCrUseOfbmfontUtils({
        error: Error()
      }), bmfontUtils) : bmfontUtils, {
        getAssemblerData: function getAssemblerData(target) {
          if (!_shareAtlas) {
            _shareAtlas = new (_crd && LetterAtlas === void 0 ? (_reportPossibleCrUseOfLetterAtlas({
              error: Error()
            }), LetterAtlas) : LetterAtlas)(_atlasWidth, _atlasHeight);
          }

          return _shareAtlas.getTexture(target.charCacheType);
        },
        _updateFontFamily: function _updateFontFamily(comp) {
          (_crd && shareLabelInfo === void 0 ? (_reportPossibleCrUseOfshareLabelInfo({
            error: Error()
          }), shareLabelInfo) : shareLabelInfo).fontAtlas = _shareAtlas;
          (_crd && shareLabelInfo === void 0 ? (_reportPossibleCrUseOfshareLabelInfo({
            error: Error()
          }), shareLabelInfo) : shareLabelInfo).fontFamily = this._getFontFamily(comp); // outline

          var outline = comp.getComponent(LabelOutline);

          if (outline && outline.enabled) {
            (_crd && shareLabelInfo === void 0 ? (_reportPossibleCrUseOfshareLabelInfo({
              error: Error()
            }), shareLabelInfo) : shareLabelInfo).isOutlined = true;
            (_crd && shareLabelInfo === void 0 ? (_reportPossibleCrUseOfshareLabelInfo({
              error: Error()
            }), shareLabelInfo) : shareLabelInfo).margin = outline.width;
            (_crd && shareLabelInfo === void 0 ? (_reportPossibleCrUseOfshareLabelInfo({
              error: Error()
            }), shareLabelInfo) : shareLabelInfo).out = outline.color.clone();
            (_crd && shareLabelInfo === void 0 ? (_reportPossibleCrUseOfshareLabelInfo({
              error: Error()
            }), shareLabelInfo) : shareLabelInfo).out.a = outline.color.a * comp.color.a / 255.0;
          } else {
            (_crd && shareLabelInfo === void 0 ? (_reportPossibleCrUseOfshareLabelInfo({
              error: Error()
            }), shareLabelInfo) : shareLabelInfo).isOutlined = false;
            (_crd && shareLabelInfo === void 0 ? (_reportPossibleCrUseOfshareLabelInfo({
              error: Error()
            }), shareLabelInfo) : shareLabelInfo).margin = 0;
          }
        },
        _getFontFamily: function _getFontFamily(comp) {
          var fontFamily = "Arial";

          if (!comp.useSystemFont) {
            if (comp.font) {
              fontFamily = comp.font._nativeAsset || "Arial";
            }
          } else {
            fontFamily = comp.fontFamily || "Arial";
          }

          return fontFamily;
        },
        _updateLabelInfo: function _updateLabelInfo(comp) {
          (_crd && shareLabelInfo === void 0 ? (_reportPossibleCrUseOfshareLabelInfo({
            error: Error()
          }), shareLabelInfo) : shareLabelInfo).fontDesc = this._getFontDesc();
          (_crd && shareLabelInfo === void 0 ? (_reportPossibleCrUseOfshareLabelInfo({
            error: Error()
          }), shareLabelInfo) : shareLabelInfo).color = comp.color;
          (_crd && shareLabelInfo === void 0 ? (_reportPossibleCrUseOfshareLabelInfo({
            error: Error()
          }), shareLabelInfo) : shareLabelInfo).hash = (_crd && computeHash === void 0 ? (_reportPossibleCrUseOfcomputeHash({
            error: Error()
          }), computeHash) : computeHash)(_crd && shareLabelInfo === void 0 ? (_reportPossibleCrUseOfshareLabelInfo({
            error: Error()
          }), shareLabelInfo) : shareLabelInfo);
        },
        _getFontDesc: function _getFontDesc() {
          var fontDesc = (_crd && shareLabelInfo === void 0 ? (_reportPossibleCrUseOfshareLabelInfo({
            error: Error()
          }), shareLabelInfo) : shareLabelInfo).fontSize.toString() + "px ";
          fontDesc += (_crd && shareLabelInfo === void 0 ? (_reportPossibleCrUseOfshareLabelInfo({
            error: Error()
          }), shareLabelInfo) : shareLabelInfo).fontFamily;

          if (_isBold) {
            fontDesc = "bold " + fontDesc;
          }

          return fontDesc;
        },
        _computeHorizontalKerningForText: function _computeHorizontalKerningForText() {},
        _determineRect: function _determineRect(tempRect) {
          return false;
        }
      }));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=letter-font.js.map