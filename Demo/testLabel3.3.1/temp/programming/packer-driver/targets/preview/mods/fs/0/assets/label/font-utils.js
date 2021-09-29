System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, BASELINE_RATIO, Color, director, Director, getBaselineOffset, ImageAsset, js, macro, MIDDLE_RATIO, safeMeasureText, Texture2D, warnID, _crd, _canvasPool, CanvasPool, WHITE, space, bleed, FontLetterDefinition, _backgroundStyle, BASELINE_OFFSET, LetterTexture, PixelFormat, LetterRenderTexture, ECharCacheType, LetterAtlas, shareLabelInfo, BufferTextureCopy, Offset, Extent, TextureSubresLayers, FontAtlas;

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function computeHash(labelInfo) {
    var hashData = "";
    var color = labelInfo.color.toHEX();
    var out = "";

    if (labelInfo.isOutlined && labelInfo.margin > 0) {
      out = out + labelInfo.margin + labelInfo.out.toHEX();
    }

    return hashData + labelInfo.fontSize + labelInfo.fontFamily + color + out;
  }

  _export({
    computeHash: computeHash,
    ECharCacheType: void 0
  });

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      BASELINE_RATIO = _cc.BASELINE_RATIO;
      Color = _cc.Color;
      director = _cc.director;
      Director = _cc.Director;
      getBaselineOffset = _cc.getBaselineOffset;
      ImageAsset = _cc.ImageAsset;
      js = _cc.js;
      macro = _cc.macro;
      MIDDLE_RATIO = _cc.MIDDLE_RATIO;
      safeMeasureText = _cc.safeMeasureText;
      Texture2D = _cc.Texture2D;
      warnID = _cc.warnID;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "d2cb3CcnsNC4L2PXK7ur8yt", "font-utils", undefined);

      _export("CanvasPool", CanvasPool = /*#__PURE__*/function () {
        function CanvasPool() {
          _defineProperty(this, "pool", []);
        }

        CanvasPool.getInstance = function getInstance() {
          if (!_canvasPool) {
            _canvasPool = new CanvasPool();
          }

          return _canvasPool;
        };

        var _proto = CanvasPool.prototype;

        _proto.get = function get() {
          var data = this.pool.pop();

          if (!data) {
            var canvas = document.createElement("canvas");
            var context = canvas.getContext("2d");
            data = {
              canvas: canvas,
              context: context
            };
          }

          return data;
        };

        _proto.put = function put(canvas) {
          if (this.pool.length >= macro.MAX_LABEL_CANVAS_POOL_SIZE) {
            return;
          }

          this.pool.push(canvas);
        };

        return CanvasPool;
      }()); // export function packToDynamicAtlas(comp, frame) {
      //     // TODO: Material API design and export from editor could affect the material activation process
      //     // need to update the logic here
      //     if (frame && !TEST) {
      //         if (!frame._original && dynamicAtlasManager) {
      //             let packedFrame = dynamicAtlasManager.insertSpriteFrame(frame);
      //             if (packedFrame) {
      //                 frame._setDynamicAtlasFrame(packedFrame);
      //             }
      //         }
      //         if (comp.sharedMaterials[0].getProperty('texture') !== frame._texture) {
      //             comp._activateMaterial();
      //         }
      //     }
      // }


      WHITE = Color.WHITE.clone();
      space = 0;
      bleed = 2;

      FontLetterDefinition = function FontLetterDefinition() {
        _defineProperty(this, "u", 0);

        _defineProperty(this, "v", 0);

        _defineProperty(this, "w", 0);

        _defineProperty(this, "h", 0);

        _defineProperty(this, "texture", null);

        _defineProperty(this, "offsetX", 0);

        _defineProperty(this, "offsetY", 0);

        _defineProperty(this, "valid", false);

        _defineProperty(this, "xAdvance", 0);
      };

      _backgroundStyle = "rgba(255, 255, 255, " + (1 / 255).toFixed(3) + ")";
      BASELINE_OFFSET = getBaselineOffset();

      LetterTexture = /*#__PURE__*/function () {
        function LetterTexture(_char, labelInfo) {
          _defineProperty(this, "image", null);

          _defineProperty(this, "labelInfo", void 0);

          _defineProperty(this, "char", void 0);

          _defineProperty(this, "data", null);

          _defineProperty(this, "canvas", null);

          _defineProperty(this, "context", null);

          _defineProperty(this, "width", 0);

          _defineProperty(this, "height", 0);

          _defineProperty(this, "offsetY", 0);

          _defineProperty(this, "hash", void 0);

          this["char"] = _char;
          this.labelInfo = labelInfo;
          this.hash = _char.charCodeAt(0) + labelInfo.hash;
        }

        var _proto2 = LetterTexture.prototype;

        _proto2.updateRenderData = function updateRenderData() {
          this._updateProperties();

          this._updateTexture();
        };

        _proto2.destroy = function destroy() {
          this.image = null; // Label._canvasPool.put(this._data);
        };

        _proto2._updateProperties = function _updateProperties() {
          this.data = CanvasPool.getInstance().get();
          this.canvas = this.data.canvas;
          this.context = this.data.context;

          if (this.context) {
            this.context.font = this.labelInfo.fontDesc;
            var width = safeMeasureText(this.context, this["char"], this.labelInfo.fontDesc);
            var blank = this.labelInfo.margin * 2 + bleed;
            this.width = parseFloat(width.toFixed(2)) + blank;
            this.height = (1 + BASELINE_RATIO) * this.labelInfo.fontSize + blank;
            this.offsetY = -(this.labelInfo.fontSize * BASELINE_RATIO) / 2;
          }

          if (this.canvas.width !== this.width) {
            this.canvas.width = this.width;
          }

          if (this.canvas.height !== this.height) {
            this.canvas.height = this.height;
          }

          if (!this.image) {
            this.image = new ImageAsset();
          }

          this.image.reset(this.canvas);
        };

        _proto2._updateTexture = function _updateTexture() {
          if (!this.context || !this.canvas) {
            return;
          }

          var context = this.context;
          var labelInfo = this.labelInfo;
          var width = this.canvas.width;
          var height = this.canvas.height;
          context.textAlign = "center";
          context.textBaseline = "alphabetic";
          context.clearRect(0, 0, width, height); // Add a white background to avoid black edges.

          context.fillStyle = _backgroundStyle;
          context.fillRect(0, 0, width, height);
          context.font = labelInfo.fontDesc;
          var fontSize = labelInfo.fontSize;
          var startX = width / 2;
          var startY = height / 2 + fontSize * MIDDLE_RATIO + fontSize * BASELINE_OFFSET;
          var color = labelInfo.color; // use round for line join to avoid sharp intersect point

          context.lineJoin = "round";
          context.fillStyle = "rgba(" + color.r + ", " + color.g + ", " + color.b + ", " + 1 + ")";

          if (labelInfo.isOutlined) {
            var strokeColor = labelInfo.out || WHITE;
            context.strokeStyle = "rgba(" + strokeColor.r + ", " + strokeColor.g + ", " + strokeColor.b + ", " + strokeColor.a / 255 + ")";
            context.lineWidth = labelInfo.margin * 2;
            context.strokeText(this["char"], startX, startY);
          }

          context.fillText(this["char"], startX, startY); // this.texture.handleLoadedTexture();
          // (this.image as Texture2D).updateImage();
        };

        return LetterTexture;
      }();

      PixelFormat = {
        RGBA8888: 35
      };

      _export("LetterRenderTexture", LetterRenderTexture = /*#__PURE__*/function (_Texture2D) {
        _inheritsLoose(LetterRenderTexture, _Texture2D);

        function LetterRenderTexture() {
          return _Texture2D.apply(this, arguments) || this;
        }

        var _proto3 = LetterRenderTexture.prototype;

        /**
         * @en
         * Init the render texture with size.
         * @zh
         * 初始化 render texture。
         * @param [width]
         * @param [height]
         * @param [string]
         */
        _proto3.initWithSize = function initWithSize(width, height, format) {
          if (format === void 0) {
            format = PixelFormat.RGBA8888;
          }

          this.reset({
            width: width,
            height: height,
            format: format
          });
        }
        /**
         * @en Draw a texture to the specified position
         * @zh 将指定的图片渲染到指定的位置上。
         * @param {Texture2D} image
         * @param {Number} x
         * @param {Number} y
         */
        ;

        _proto3.drawTextureAt = function drawTextureAt(image, x, y) {
          var gfxTexture = this.getGFXTexture();

          if (!image || !gfxTexture) {
            return;
          }

          var gfxDevice = this._getGFXDevice();

          if (!gfxDevice) {
            console.warn("Unable to get device");
            return;
          }

          var region = new BufferTextureCopy();
          region.texOffset.x = x;
          region.texOffset.y = y;
          region.texExtent.width = image.width;
          region.texExtent.height = image.height;
          gfxDevice.copyTexImagesToTexture([image.data], gfxTexture, [region]);
        };

        return LetterRenderTexture;
      }(Texture2D));

      (function (ECharCacheType) {
        ECharCacheType[ECharCacheType["normal"] = 1] = "normal";
        ECharCacheType[ECharCacheType["main"] = 2] = "main";
        ECharCacheType[ECharCacheType["dialog"] = 3] = "dialog";
        ECharCacheType[ECharCacheType["scrollview"] = 4] = "scrollview";
      })(ECharCacheType || _export("ECharCacheType", ECharCacheType = {}));

      _export("LetterAtlas", LetterAtlas = /*#__PURE__*/function () {
        function LetterAtlas(width, height) {
          _defineProperty(this, "_x", space);

          _defineProperty(this, "_y", space);

          _defineProperty(this, "_nextY", space);

          _defineProperty(this, "_width", 0);

          _defineProperty(this, "_height", 0);

          _defineProperty(this, "_halfBleed", 0);

          _defineProperty(this, "_dirty", false);

          _defineProperty(this, "_charCacheType", ECharCacheType.normal);

          //TODO: 待优化
          this.fontDefDictionary = new Map();

          for (var key in ECharCacheType) {
            var texture = new LetterRenderTexture();
            texture.initWithSize(width, height);
            this.fontDefDictionary.set(Number(ECharCacheType[key]), new FontAtlas(texture));
          } //TODO: 待优化


          this._halfBleed = bleed / 2;
          this._width = width;
          this._height = height;
          director.on(Director.EVENT_BEFORE_SCENE_LAUNCH, this.beforeSceneLoad, this);
        }

        var _proto4 = LetterAtlas.prototype;

        _proto4.insertLetterTexture = function insertLetterTexture(letterTexture, charCacheType) {
          var texture = letterTexture.image;
          var device = director.root.device;

          if (!texture || !this.fontDefDictionary.has(charCacheType) || !device) {
            return null;
          }

          var width = texture.width;
          var height = texture.height;

          if (this._x + width + space > this._width) {
            this._x = space;
            this._y = this._nextY;
          }

          if (this._y + height > this._nextY) {
            this._nextY = this._y + height + space;
          }

          if (this._nextY > this._height) {
            warnID(12100);
            return null;
          }

          this.fontDefDictionary.get(charCacheType).texture.drawTextureAt(texture, this._x, this._y);
          this._dirty = true;
          var letterDefinition = new FontLetterDefinition();
          letterDefinition.u = this._x + this._halfBleed;
          letterDefinition.v = this._y + this._halfBleed;
          letterDefinition.texture = this.fontDefDictionary.get(charCacheType).texture;
          letterDefinition.valid = true;
          letterDefinition.w = letterTexture.width - bleed;
          letterDefinition.h = letterTexture.height - bleed;
          letterDefinition.xAdvance = letterDefinition.w;
          letterDefinition.offsetY = letterTexture.offsetY;
          this._x += width + space;
          this.fontDefDictionary.get(charCacheType).addLetterDefinitions(letterTexture.hash, letterDefinition);
          this.fontDefDictionary.get(charCacheType)._x = this._x;
          this.fontDefDictionary.get(charCacheType)._y = this._y;
          this.fontDefDictionary.get(charCacheType)._nextY = this._nextY;
          /*
                const region = new BufferTextureCopy();
                region.texOffset.x = letterDefinition.offsetX;
                region.texOffset.y = letterDefinition.offsetY;
                region.texExtent.width = letterDefinition.w;
                region.texExtent.height = letterDefinition.h;
                */

          return letterDefinition;
        };

        _proto4.update = function update() {
          if (!this._dirty) {
            return;
          } // this.texture.update();


          this._dirty = false;
        };

        _proto4.reset = function reset() {
          this._x = space;
          this._y = space;
          this._nextY = space; // const chars = this.letterDefinitions;
          // for (let i = 0, l = (Object.keys(chars)).length; i < l; i++) {
          //     const char = chars[i];
          //     if (!char.valid) {
          //         continue;
          //     }
          //     char.destroy();
          // }
          // this.letterDefinitions = createMap();

          for (var _iterator = _createForOfIteratorHelperLoose(this.fontDefDictionary.values()), _step; !(_step = _iterator()).done;) {
            var value = _step.value;
            value.clear();
          }
        };

        _proto4.destroy = function destroy() {
          this.reset();

          for (var _iterator2 = _createForOfIteratorHelperLoose(this.fontDefDictionary.values()), _step2; !(_step2 = _iterator2()).done;) {
            var value = _step2.value;
            value.texture.destroy();
            value.texture.texture = null;
          }

          this.fontDefDictionary.clear();
        };

        _proto4.getTexture = function getTexture(charCacheType) {
          if (!charCacheType) charCacheType = this._charCacheType;

          if (this.fontDefDictionary.has(charCacheType)) {
            return this.fontDefDictionary.get(charCacheType).getTexture();
          }

          return this.fontDefDictionary.get(this._charCacheType).getTexture();
        };

        _proto4.beforeSceneLoad = function beforeSceneLoad() {
          this.clearAllCache();
        };

        _proto4.clearAllCache = function clearAllCache() {
          this.destroy();

          for (var _iterator3 = _createForOfIteratorHelperLoose(this.fontDefDictionary.values()), _step3; !(_step3 = _iterator3()).done;) {
            var value = _step3.value;
            var texture = new LetterRenderTexture();
            texture.initWithSize(this._width, this._height);
            value.texture.texture = texture;
          }
        };

        _proto4.getLetter = function getLetter(key, charCacheType) {
          if (!charCacheType) charCacheType = this._charCacheType;
          return this.fontDefDictionary.get(charCacheType).letterDefinitions[key];
        };

        _proto4.getLetterDefinitionForChar = function getLetterDefinitionForChar(_char2, labelInfo, charCacheType) {
          if (!this.fontDefDictionary.has(charCacheType)) {
            var texture = new LetterRenderTexture();
            texture.initWithSize(this.width, this.height);
            this.fontDefDictionary.set(charCacheType, new FontAtlas(texture));
          }

          this._x = this.fontDefDictionary.get(charCacheType)._x;
          this._y = this.fontDefDictionary.get(charCacheType)._y;
          this._nextY = this.fontDefDictionary.get(charCacheType)._nextY;
          var hash = _char2.charCodeAt(0) + labelInfo.hash;
          var letter = this.fontDefDictionary.get(charCacheType).letterDefinitions[hash];

          if (!letter) {
            var temp = new LetterTexture(_char2, labelInfo);
            temp.updateRenderData();
            letter = this.insertLetterTexture(temp, charCacheType);
            temp.destroy();
          } // console.log(this.fontDefDictionary)


          return letter;
        };

        _createClass(LetterAtlas, [{
          key: "width",
          get: function get() {
            return this._width;
          }
        }, {
          key: "height",
          get: function get() {
            return this._height;
          }
        }]);

        return LetterAtlas;
      }());

      _export("shareLabelInfo", shareLabelInfo = {
        fontAtlas: null,
        fontSize: 0,
        lineHeight: 0,
        hAlign: 0,
        vAlign: 0,
        hash: "",
        fontFamily: "",
        fontDesc: "Arial",
        color: Color.WHITE.clone(),
        isOutlined: false,
        out: Color.WHITE.clone(),
        margin: 0
      });

      _export("BufferTextureCopy", BufferTextureCopy = /*#__PURE__*/function () {
        // to make sure all usages must be an instance of this exact class, not assembled from plain object
        function BufferTextureCopy(buffStride, buffTexHeight, texOffset, texExtent, texSubres) {
          if (buffStride === void 0) {
            buffStride = 0;
          }

          if (buffTexHeight === void 0) {
            buffTexHeight = 0;
          }

          if (texOffset === void 0) {
            texOffset = new Offset();
          }

          if (texExtent === void 0) {
            texExtent = new Extent();
          }

          if (texSubres === void 0) {
            texSubres = new TextureSubresLayers();
          }

          this.buffStride = buffStride;
          this.buffTexHeight = buffTexHeight;
          this.texOffset = texOffset;
          this.texExtent = texExtent;
          this.texSubres = texSubres;
        }

        var _proto5 = BufferTextureCopy.prototype;

        _proto5.copy = function copy(info) {
          this.buffStride = info.buffStride;
          this.buffTexHeight = info.buffTexHeight;
          this.texOffset.copy(info.texOffset);
          this.texExtent.copy(info.texExtent);
          this.texSubres.copy(info.texSubres);
          return this;
        };

        return BufferTextureCopy;
      }());

      _export("Offset", Offset = /*#__PURE__*/function () {
        // to make sure all usages must be an instance of this exact class, not assembled from plain object
        function Offset(x, y, z) {
          if (x === void 0) {
            x = 0;
          }

          if (y === void 0) {
            y = 0;
          }

          if (z === void 0) {
            z = 0;
          }

          this.x = x;
          this.y = y;
          this.z = z;
        }

        var _proto6 = Offset.prototype;

        _proto6.copy = function copy(info) {
          this.x = info.x;
          this.y = info.y;
          this.z = info.z;
          return this;
        };

        return Offset;
      }());

      _export("Extent", Extent = /*#__PURE__*/function () {
        // to make sure all usages must be an instance of this exact class, not assembled from plain object
        function Extent(width, height, depth) {
          if (width === void 0) {
            width = 0;
          }

          if (height === void 0) {
            height = 0;
          }

          if (depth === void 0) {
            depth = 1;
          }

          this.width = width;
          this.height = height;
          this.depth = depth;
        }

        var _proto7 = Extent.prototype;

        _proto7.copy = function copy(info) {
          this.width = info.width;
          this.height = info.height;
          this.depth = info.depth;
          return this;
        };

        return Extent;
      }());

      _export("TextureSubresLayers", TextureSubresLayers = /*#__PURE__*/function () {
        // to make sure all usages must be an instance of this exact class, not assembled from plain object
        function TextureSubresLayers(mipLevel, baseArrayLayer, layerCount) {
          if (mipLevel === void 0) {
            mipLevel = 0;
          }

          if (baseArrayLayer === void 0) {
            baseArrayLayer = 0;
          }

          if (layerCount === void 0) {
            layerCount = 1;
          }

          this.mipLevel = mipLevel;
          this.baseArrayLayer = baseArrayLayer;
          this.layerCount = layerCount;
        }

        var _proto8 = TextureSubresLayers.prototype;

        _proto8.copy = function copy(info) {
          this.mipLevel = info.mipLevel;
          this.baseArrayLayer = info.baseArrayLayer;
          this.layerCount = info.layerCount;
          return this;
        };

        return TextureSubresLayers;
      }());

      _export("FontAtlas", FontAtlas = /*#__PURE__*/function () {
        function FontAtlas(texture) {
          _defineProperty(this, "letterDefinitions", void 0);

          _defineProperty(this, "texture", void 0);

          _defineProperty(this, "_x", space);

          _defineProperty(this, "_y", space);

          _defineProperty(this, "_nextY", space);

          this.letterDefinitions = {};
          this.texture = texture;
          this._x = 0;
          this._y = 0;
          this._nextY = 0;
        }

        var _proto9 = FontAtlas.prototype;

        _proto9.addLetterDefinitions = function addLetterDefinitions(letter, letterDefinition) {
          this.letterDefinitions[letter] = letterDefinition;
        };

        _proto9.cloneLetterDefinition = function cloneLetterDefinition() {
          var copyLetterDefinitions = {};

          for (var _i = 0, _Object$keys = Object.keys(this.letterDefinitions); _i < _Object$keys.length; _i++) {
            var key = _Object$keys[_i];
            var value = new FontLetterDefinition();
            js.mixin(value, this.letterDefinitions[key]);
            copyLetterDefinitions[key] = value;
          }

          return copyLetterDefinitions;
        };

        _proto9.getTexture = function getTexture() {
          return this.texture;
        };

        _proto9.getLetter = function getLetter(key) {
          return this.letterDefinitions[key];
        };

        _proto9.getLetterDefinitionForChar = function getLetterDefinitionForChar(_char3, labelInfo) {
          var key = _char3.charCodeAt(0);

          var hasKey = this.letterDefinitions.hasOwnProperty(key);
          var letter;

          if (hasKey) {
            letter = this.letterDefinitions[key];
          } else {
            letter = null;
          }

          return letter;
        };

        _proto9.clear = function clear() {
          this.letterDefinitions = {};
        };

        return FontAtlas;
      }());

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=font-utils.js.map