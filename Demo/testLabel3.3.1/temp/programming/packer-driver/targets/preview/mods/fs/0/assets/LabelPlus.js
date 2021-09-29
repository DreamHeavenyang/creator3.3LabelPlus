System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Label, BitmapFont, CacheMode, SpriteFrame, ImageAsset, Texture2D, Enum, ECharCacheType, _dec, _dec2, _class, _class2, _temp, _crd, ccclass, property, LabelPlus;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _reportPossibleCrUseOfECharCacheType(extras) {
    _reporterNs.report("ECharCacheType", "./label/font-utils", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Label = _cc.Label;
      BitmapFont = _cc.BitmapFont;
      CacheMode = _cc.CacheMode;
      SpriteFrame = _cc.SpriteFrame;
      ImageAsset = _cc.ImageAsset;
      Texture2D = _cc.Texture2D;
      Enum = _cc.Enum;
    }, function (_unresolved_2) {
      ECharCacheType = _unresolved_2.ECharCacheType;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "841187yS5dPNIX2tOo1kU/k", "LabelPlus", undefined);

      ccclass = _decorator.ccclass;
      property = _decorator.property;
      /**
       * 增加char模式下多种类型的缓存Texture
       * Name = LabelPlus
       * DateTime = Mon Sep 27 2021 10:24:01 GMT+0800 (中国标准时间)
       * Author = hellotion
       * FileBasename = LabelPlus.ts
       * FileBasenameNoExtension = LabelPlus
       * URL = db://assets/LabelPlus.ts
       * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
       *
       */

      _export("LabelPlus", LabelPlus = (_dec = ccclass("LabelPlus"), _dec2 = property({
        type: Enum(_crd && ECharCacheType === void 0 ? (_reportPossibleCrUseOfECharCacheType({
          error: Error()
        }), ECharCacheType) : ECharCacheType),
        tooltip: "char模式缓存Txture种类"
      }), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Label) {
        _inheritsLoose(LabelPlus, _Label);

        function LabelPlus() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Label.call.apply(_Label, [this].concat(args)) || this;

          _defineProperty(_assertThisInitialized(_this), "_charCacheType", (_crd && ECharCacheType === void 0 ? (_reportPossibleCrUseOfECharCacheType({
            error: Error()
          }), ECharCacheType) : ECharCacheType).normal);

          return _this;
        }

        var _proto = LabelPlus.prototype;

        /** 重写父类，char模式传入此label */
        _proto._applyFontTexture = function _applyFontTexture() {
          this.markForUpdateRenderData();
          var font = this._font;

          if (font instanceof BitmapFont) {
            var spriteFrame = font.spriteFrame;

            if (spriteFrame && spriteFrame.texture) {
              this._texture = spriteFrame;
              this.changeMaterialForDefine();

              if (this._assembler) {
                this._assembler.updateRenderData(this);
              }
            }
          } else {
            if (this.cacheMode === CacheMode.CHAR) {
              this._letterTexture = this._assembler.getAssemblerData(this);
              this._texture = this._letterTexture;
            } else if (!this._ttfSpriteFrame) {
              this._ttfSpriteFrame = new SpriteFrame();
              this._assemblerData = this._assembler.getAssemblerData();
              var image = new ImageAsset(this._assemblerData.canvas);
              var texture = new Texture2D();
              texture.image = image;
              this._ttfSpriteFrame.texture = texture;
            }

            if (this.cacheMode !== CacheMode.CHAR) {
              // this._frame._refreshTexture(this._texture);
              this._texture = this._ttfSpriteFrame;
            }

            this.changeMaterialForDefine();
          }
        };

        _createClass(LabelPlus, [{
          key: "charCacheType",
          get: function get() {
            return this._charCacheType;
          },
          set: function set(value) {
            this._charCacheType = value;
            this.updateRenderData();
          }
        }]);

        return LabelPlus;
      }(Label), _temp), (_applyDecoratedDescriptor(_class2.prototype, "charCacheType", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "charCacheType"), _class2.prototype)), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=LabelPlus.js.map