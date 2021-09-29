System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, BASELINE_RATIO, Color, director, Director, getBaselineOffset, ImageAsset, js, macro, MIDDLE_RATIO, safeMeasureText, Texture2D, warnID, CanvasPool, FontLetterDefinition, LetterTexture, LetterRenderTexture, LetterAtlas, BufferTextureCopy, Offset, Extent, TextureSubresLayers, FontAtlas, _crd, _canvasPool, WHITE, space, bleed, _backgroundStyle, BASELINE_OFFSET, PixelFormat, ECharCacheType, shareLabelInfo;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function computeHash(labelInfo) {
    const hashData = "";
    const color = labelInfo.color.toHEX();
    let out = "";

    if (labelInfo.isOutlined && labelInfo.margin > 0) {
      out = out + labelInfo.margin + labelInfo.out.toHEX();
    }

    return hashData + labelInfo.fontSize + labelInfo.fontFamily + color + out;
  }

  _export({
    CanvasPool: void 0,
    LetterRenderTexture: void 0,
    LetterAtlas: void 0,
    computeHash: computeHash,
    BufferTextureCopy: void 0,
    Offset: void 0,
    Extent: void 0,
    TextureSubresLayers: void 0,
    FontAtlas: void 0,
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

      _export("CanvasPool", CanvasPool = class CanvasPool {
        constructor() {
          _defineProperty(this, "pool", []);
        }

        static getInstance() {
          if (!_canvasPool) {
            _canvasPool = new CanvasPool();
          }

          return _canvasPool;
        }

        get() {
          let data = this.pool.pop();

          if (!data) {
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            data = {
              canvas,
              context
            };
          }

          return data;
        }

        put(canvas) {
          if (this.pool.length >= macro.MAX_LABEL_CANVAS_POOL_SIZE) {
            return;
          }

          this.pool.push(canvas);
        }

      }); // export function packToDynamicAtlas(comp, frame) {
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
      FontLetterDefinition = class FontLetterDefinition {
        constructor() {
          _defineProperty(this, "u", 0);

          _defineProperty(this, "v", 0);

          _defineProperty(this, "w", 0);

          _defineProperty(this, "h", 0);

          _defineProperty(this, "texture", null);

          _defineProperty(this, "offsetX", 0);

          _defineProperty(this, "offsetY", 0);

          _defineProperty(this, "valid", false);

          _defineProperty(this, "xAdvance", 0);
        }

      };
      _backgroundStyle = `rgba(255, 255, 255, ${(1 / 255).toFixed(3)})`;
      BASELINE_OFFSET = getBaselineOffset();
      LetterTexture = class LetterTexture {
        constructor(char, labelInfo) {
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

          this.char = char;
          this.labelInfo = labelInfo;
          this.hash = char.charCodeAt(0) + labelInfo.hash;
        }

        updateRenderData() {
          this._updateProperties();

          this._updateTexture();
        }

        destroy() {
          this.image = null; // Label._canvasPool.put(this._data);
        }

        _updateProperties() {
          this.data = CanvasPool.getInstance().get();
          this.canvas = this.data.canvas;
          this.context = this.data.context;

          if (this.context) {
            this.context.font = this.labelInfo.fontDesc;
            const width = safeMeasureText(this.context, this.char, this.labelInfo.fontDesc);
            const blank = this.labelInfo.margin * 2 + bleed;
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
        }

        _updateTexture() {
          if (!this.context || !this.canvas) {
            return;
          }

          const context = this.context;
          const labelInfo = this.labelInfo;
          const width = this.canvas.width;
          const height = this.canvas.height;
          context.textAlign = "center";
          context.textBaseline = "alphabetic";
          context.clearRect(0, 0, width, height); // Add a white background to avoid black edges.

          context.fillStyle = _backgroundStyle;
          context.fillRect(0, 0, width, height);
          context.font = labelInfo.fontDesc;
          const fontSize = labelInfo.fontSize;
          const startX = width / 2;
          const startY = height / 2 + fontSize * MIDDLE_RATIO + fontSize * BASELINE_OFFSET;
          const color = labelInfo.color; // use round for line join to avoid sharp intersect point

          context.lineJoin = "round";
          context.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${1})`;

          if (labelInfo.isOutlined) {
            const strokeColor = labelInfo.out || WHITE;
            context.strokeStyle = `rgba(${strokeColor.r}, ${strokeColor.g}, ${strokeColor.b}, ${strokeColor.a / 255})`;
            context.lineWidth = labelInfo.margin * 2;
            context.strokeText(this.char, startX, startY);
          }

          context.fillText(this.char, startX, startY); // this.texture.handleLoadedTexture();
          // (this.image as Texture2D).updateImage();
        }

      };
      PixelFormat = {
        RGBA8888: 35
      };

      _export("LetterRenderTexture", LetterRenderTexture = class LetterRenderTexture extends Texture2D {
        /**
         * @en
         * Init the render texture with size.
         * @zh
         * 初始化 render texture。
         * @param [width]
         * @param [height]
         * @param [string]
         */
        initWithSize(width, height, format = PixelFormat.RGBA8888) {
          this.reset({
            width,
            height,
            format
          });
        }
        /**
         * @en Draw a texture to the specified position
         * @zh 将指定的图片渲染到指定的位置上。
         * @param {Texture2D} image
         * @param {Number} x
         * @param {Number} y
         */


        drawTextureAt(image, x, y) {
          const gfxTexture = this.getGFXTexture();

          if (!image || !gfxTexture) {
            return;
          }

          const gfxDevice = this._getGFXDevice();

          if (!gfxDevice) {
            console.warn("Unable to get device");
            return;
          }

          const region = new BufferTextureCopy();
          region.texOffset.x = x;
          region.texOffset.y = y;
          region.texExtent.width = image.width;
          region.texExtent.height = image.height;
          gfxDevice.copyTexImagesToTexture([image.data], gfxTexture, [region]);
        }

      });

      (function (ECharCacheType) {
        ECharCacheType[ECharCacheType["normal"] = 1] = "normal";
        ECharCacheType[ECharCacheType["main"] = 2] = "main";
        ECharCacheType[ECharCacheType["dialog"] = 3] = "dialog";
        ECharCacheType[ECharCacheType["scrollview"] = 4] = "scrollview";
      })(ECharCacheType || _export("ECharCacheType", ECharCacheType = {}));

      _export("LetterAtlas", LetterAtlas = class LetterAtlas {
        get width() {
          return this._width;
        }

        get height() {
          return this._height;
        }

        constructor(width, height) {
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

          for (let key in ECharCacheType) {
            const texture = new LetterRenderTexture();
            texture.initWithSize(width, height);
            this.fontDefDictionary.set(Number(ECharCacheType[key]), new FontAtlas(texture));
          } //TODO: 待优化


          this._halfBleed = bleed / 2;
          this._width = width;
          this._height = height;
          director.on(Director.EVENT_BEFORE_SCENE_LAUNCH, this.beforeSceneLoad, this);
        }

        insertLetterTexture(letterTexture, charCacheType) {
          const texture = letterTexture.image;
          const device = director.root.device;

          if (!texture || !this.fontDefDictionary.has(charCacheType) || !device) {
            return null;
          }

          const width = texture.width;
          const height = texture.height;

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
          const letterDefinition = new FontLetterDefinition();
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
        }

        update() {
          if (!this._dirty) {
            return;
          } // this.texture.update();


          this._dirty = false;
        }

        reset() {
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

          for (let value of this.fontDefDictionary.values()) {
            value.clear();
          }
        }

        destroy() {
          this.reset();

          for (let value of this.fontDefDictionary.values()) {
            value.texture.destroy();
            value.texture.texture = null;
          }

          this.fontDefDictionary.clear();
        }

        getTexture(charCacheType) {
          if (!charCacheType) charCacheType = this._charCacheType;

          if (this.fontDefDictionary.has(charCacheType)) {
            return this.fontDefDictionary.get(charCacheType).getTexture();
          }

          return this.fontDefDictionary.get(this._charCacheType).getTexture();
        }

        beforeSceneLoad() {
          this.clearAllCache();
        }

        clearAllCache() {
          this.destroy();

          for (let value of this.fontDefDictionary.values()) {
            const texture = new LetterRenderTexture();
            texture.initWithSize(this._width, this._height);
            value.texture.texture = texture;
          }
        }

        getLetter(key, charCacheType) {
          if (!charCacheType) charCacheType = this._charCacheType;
          return this.fontDefDictionary.get(charCacheType).letterDefinitions[key];
        }

        getLetterDefinitionForChar(char, labelInfo, charCacheType) {
          if (!this.fontDefDictionary.has(charCacheType)) {
            const texture = new LetterRenderTexture();
            texture.initWithSize(this.width, this.height);
            this.fontDefDictionary.set(charCacheType, new FontAtlas(texture));
          }

          this._x = this.fontDefDictionary.get(charCacheType)._x;
          this._y = this.fontDefDictionary.get(charCacheType)._y;
          this._nextY = this.fontDefDictionary.get(charCacheType)._nextY;
          const hash = char.charCodeAt(0) + labelInfo.hash;
          let letter = this.fontDefDictionary.get(charCacheType).letterDefinitions[hash];

          if (!letter) {
            const temp = new LetterTexture(char, labelInfo);
            temp.updateRenderData();
            letter = this.insertLetterTexture(temp, charCacheType);
            temp.destroy();
          } // console.log(this.fontDefDictionary)


          return letter;
        }

      });

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

      _export("BufferTextureCopy", BufferTextureCopy = class BufferTextureCopy {
        // to make sure all usages must be an instance of this exact class, not assembled from plain object
        constructor(buffStride = 0, buffTexHeight = 0, texOffset = new Offset(), texExtent = new Extent(), texSubres = new TextureSubresLayers()) {
          this.buffStride = buffStride;
          this.buffTexHeight = buffTexHeight;
          this.texOffset = texOffset;
          this.texExtent = texExtent;
          this.texSubres = texSubres;
        }

        copy(info) {
          this.buffStride = info.buffStride;
          this.buffTexHeight = info.buffTexHeight;
          this.texOffset.copy(info.texOffset);
          this.texExtent.copy(info.texExtent);
          this.texSubres.copy(info.texSubres);
          return this;
        }

      });

      _export("Offset", Offset = class Offset {
        // to make sure all usages must be an instance of this exact class, not assembled from plain object
        constructor(x = 0, y = 0, z = 0) {
          this.x = x;
          this.y = y;
          this.z = z;
        }

        copy(info) {
          this.x = info.x;
          this.y = info.y;
          this.z = info.z;
          return this;
        }

      });

      _export("Extent", Extent = class Extent {
        // to make sure all usages must be an instance of this exact class, not assembled from plain object
        constructor(width = 0, height = 0, depth = 1) {
          this.width = width;
          this.height = height;
          this.depth = depth;
        }

        copy(info) {
          this.width = info.width;
          this.height = info.height;
          this.depth = info.depth;
          return this;
        }

      });

      _export("TextureSubresLayers", TextureSubresLayers = class TextureSubresLayers {
        // to make sure all usages must be an instance of this exact class, not assembled from plain object
        constructor(mipLevel = 0, baseArrayLayer = 0, layerCount = 1) {
          this.mipLevel = mipLevel;
          this.baseArrayLayer = baseArrayLayer;
          this.layerCount = layerCount;
        }

        copy(info) {
          this.mipLevel = info.mipLevel;
          this.baseArrayLayer = info.baseArrayLayer;
          this.layerCount = info.layerCount;
          return this;
        }

      });

      _export("FontAtlas", FontAtlas = class FontAtlas {
        constructor(texture) {
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

        addLetterDefinitions(letter, letterDefinition) {
          this.letterDefinitions[letter] = letterDefinition;
        }

        cloneLetterDefinition() {
          const copyLetterDefinitions = {};

          for (const key of Object.keys(this.letterDefinitions)) {
            const value = new FontLetterDefinition();
            js.mixin(value, this.letterDefinitions[key]);
            copyLetterDefinitions[key] = value;
          }

          return copyLetterDefinitions;
        }

        getTexture() {
          return this.texture;
        }

        getLetter(key) {
          return this.letterDefinitions[key];
        }

        getLetterDefinitionForChar(char, labelInfo) {
          const key = char.charCodeAt(0);
          const hasKey = this.letterDefinitions.hasOwnProperty(key);
          let letter;

          if (hasKey) {
            letter = this.letterDefinitions[key];
          } else {
            letter = null;
          }

          return letter;
        }

        clear() {
          this.letterDefinitions = {};
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=font-utils.js.map