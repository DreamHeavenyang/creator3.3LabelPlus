System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, dynamicAtlasManager, HorizontalTextAlignment, isUnicodeCJK, isUnicodeSpace, log, Overflow, Rect, Size, Vec2, VerticalTextAlignment, ECharCacheType, shareLabelInfo, _crd, LetterInfo, _tmpRect, _comp, _uiTrans, _horizontalKerning, _lettersInfo, _linesWidth, _linesOffsetX, _labelDimensions, _lineBreakWithoutSpaces, _contentSize, letterPosition, _lineSpacing, _fntConfig, _numberOfLines, _textDesiredHeight, _letterOffsetY, _tailoredTopY, _tailoredBottomY, _bmfontScale, _spriteFrame, _string, _fontSize, _originFontSize, _hAlign, _vAlign, _spacingX, _lineHeight, _overflow, _isWrapText, _labelWidth, _labelHeight, _maxLineWidth, _charCacheType, bmfontUtils;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _reportPossibleCrUseOfECharCacheType(extras) {
    _reporterNs.report("ECharCacheType", "./font-utils", _context.meta, extras);
  }

  function _reportPossibleCrUseOfshareLabelInfo(extras) {
    _reporterNs.report("shareLabelInfo", "./font-utils", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      dynamicAtlasManager = _cc.dynamicAtlasManager;
      HorizontalTextAlignment = _cc.HorizontalTextAlignment;
      isUnicodeCJK = _cc.isUnicodeCJK;
      isUnicodeSpace = _cc.isUnicodeSpace;
      log = _cc.log;
      Overflow = _cc.Overflow;
      Rect = _cc.Rect;
      Size = _cc.Size;
      Vec2 = _cc.Vec2;
      VerticalTextAlignment = _cc.VerticalTextAlignment;
    }, function (_unresolved_2) {
      ECharCacheType = _unresolved_2.ECharCacheType;
      shareLabelInfo = _unresolved_2.shareLabelInfo;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "69a6cv2r4JGh4RqXwZ+Tl/N", "bmfontUtils", undefined);

      /**
       * @packageDocumentation
       * @hidden
       */
      LetterInfo = function LetterInfo() {
        _defineProperty(this, "char", "");

        _defineProperty(this, "valid", true);

        _defineProperty(this, "x", 0);

        _defineProperty(this, "y", 0);

        _defineProperty(this, "line", 0);

        _defineProperty(this, "hash", "");
      };

      _tmpRect = new Rect();
      _comp = null;
      _uiTrans = null;
      _horizontalKerning = [];
      _lettersInfo = [];
      _linesWidth = [];
      _linesOffsetX = [];
      _labelDimensions = new Size();
      _lineBreakWithoutSpaces = false;
      _contentSize = new Size();
      letterPosition = new Vec2();
      _lineSpacing = 0;
      _fntConfig = null;
      _numberOfLines = 0;
      _textDesiredHeight = 0;
      _letterOffsetY = 0;
      _tailoredTopY = 0;
      _tailoredBottomY = 0;
      _bmfontScale = 1.0;
      _spriteFrame = null;
      _string = "";
      _fontSize = 0;
      _originFontSize = 0;
      _hAlign = 0;
      _vAlign = 0;
      _spacingX = 0;
      _lineHeight = 0;
      _overflow = 0;
      _isWrapText = false;
      _labelWidth = 0;
      _labelHeight = 0;
      _maxLineWidth = 0;
      _charCacheType = null;

      _export("bmfontUtils", bmfontUtils = {
        updateRenderData: function updateRenderData(comp) {
          if (!comp.renderData || !comp.renderData.vertDirty) {
            return;
          }

          if (_comp === comp) {
            return;
          }

          _comp = comp;
          _uiTrans = _comp.node._uiProps.uiTransformComp;

          this._updateFontFamily(comp);

          this._updateProperties(comp);

          this._updateLabelInfo(comp);

          this._updateContent(comp);

          _comp.actualFontSize = _fontSize;

          _uiTrans.setContentSize(_contentSize);

          _comp.renderData.vertDirty = _comp.renderData.uvDirty = false; // fix bmfont run updateRenderData twice bug

          _comp.markForUpdateRenderData(false);

          _comp = null;

          this._resetProperties();
        },
        _updateFontScale: function _updateFontScale() {
          _bmfontScale = _fontSize / _originFontSize;
        },
        _updateFontFamily: function _updateFontFamily(comp) {
          var fontAsset = comp.font;
          log("_updateFontFamily=========>", fontAsset);
          _spriteFrame = fontAsset.spriteFrame;
          _fntConfig = fontAsset.fntConfig;
          (_crd && shareLabelInfo === void 0 ? (_reportPossibleCrUseOfshareLabelInfo({
            error: Error()
          }), shareLabelInfo) : shareLabelInfo).fontAtlas = fontAsset.fontDefDictionary.get((_crd && ECharCacheType === void 0 ? (_reportPossibleCrUseOfECharCacheType({
            error: Error()
          }), ECharCacheType) : ECharCacheType).normal);
          dynamicAtlasManager.packToDynamicAtlas(comp, _spriteFrame);
        },

        /**获取当前的fontAtlas */
        _getShareLabelInfo: function _getShareLabelInfo() {
          return _crd && shareLabelInfo === void 0 ? (_reportPossibleCrUseOfshareLabelInfo({
            error: Error()
          }), shareLabelInfo) : shareLabelInfo;
        },
        _updateLabelInfo: function _updateLabelInfo() {
          // clear
          (_crd && shareLabelInfo === void 0 ? (_reportPossibleCrUseOfshareLabelInfo({
            error: Error()
          }), shareLabelInfo) : shareLabelInfo).hash = "";
          (_crd && shareLabelInfo === void 0 ? (_reportPossibleCrUseOfshareLabelInfo({
            error: Error()
          }), shareLabelInfo) : shareLabelInfo).margin = 0;
        },
        _updateProperties: function _updateProperties(comp) {
          _string = comp.string.toString();
          _fontSize = comp.fontSize;
          _originFontSize = _fntConfig ? _fntConfig.fontSize : comp.fontSize;
          _hAlign = comp.horizontalAlign;
          _vAlign = comp.verticalAlign;
          _spacingX = comp.spacingX;
          _overflow = comp.overflow;
          _lineHeight = comp._lineHeight;
          _charCacheType = comp._charCacheType; // console.log(_charCacheType)

          var contentSize = _uiTrans.contentSize;
          _contentSize.width = contentSize.width;
          _contentSize.height = contentSize.height; // should wrap text

          if (_overflow === Overflow.NONE) {
            _isWrapText = false;
            _contentSize.width += (_crd && shareLabelInfo === void 0 ? (_reportPossibleCrUseOfshareLabelInfo({
              error: Error()
            }), shareLabelInfo) : shareLabelInfo).margin * 2;
            _contentSize.height += (_crd && shareLabelInfo === void 0 ? (_reportPossibleCrUseOfshareLabelInfo({
              error: Error()
            }), shareLabelInfo) : shareLabelInfo).margin * 2;
          } else if (_overflow === Overflow.RESIZE_HEIGHT) {
            _isWrapText = true;
            _contentSize.height += (_crd && shareLabelInfo === void 0 ? (_reportPossibleCrUseOfshareLabelInfo({
              error: Error()
            }), shareLabelInfo) : shareLabelInfo).margin * 2;
          } else {
            _isWrapText = comp.enableWrapText;
          }

          (_crd && shareLabelInfo === void 0 ? (_reportPossibleCrUseOfshareLabelInfo({
            error: Error()
          }), shareLabelInfo) : shareLabelInfo).lineHeight = _lineHeight;
          (_crd && shareLabelInfo === void 0 ? (_reportPossibleCrUseOfshareLabelInfo({
            error: Error()
          }), shareLabelInfo) : shareLabelInfo).fontSize = _fontSize;

          this._setupBMFontOverflowMetrics();
        },
        _resetProperties: function _resetProperties() {
          _fntConfig = null;
          _spriteFrame = null;
          (_crd && shareLabelInfo === void 0 ? (_reportPossibleCrUseOfshareLabelInfo({
            error: Error()
          }), shareLabelInfo) : shareLabelInfo).hash = "";
          (_crd && shareLabelInfo === void 0 ? (_reportPossibleCrUseOfshareLabelInfo({
            error: Error()
          }), shareLabelInfo) : shareLabelInfo).margin = 0;
        },
        _updateContent: function _updateContent(comp) {
          this._updateFontScale();

          this._computeHorizontalKerningForText();

          this._alignText(comp);
        },
        _computeHorizontalKerningForText: function _computeHorizontalKerningForText() {
          var string = _string;
          var stringLen = string.length;
          var kerningDict = _fntConfig.kerningDict;
          var horizontalKerning = _horizontalKerning;
          var prev = -1;

          for (var i = 0; i < stringLen; ++i) {
            var key = string.charCodeAt(i);
            var kerningAmount = kerningDict[prev << 16 | key & 0xffff] || 0;

            if (i < stringLen - 1) {
              horizontalKerning[i] = kerningAmount;
            } else {
              horizontalKerning[i] = 0;
            }

            prev = key;
          }
        },
        _multilineTextWrap: function _multilineTextWrap(nextTokenFunc, comp) {
          var textLen = _string.length;
          var lineIndex = 0;
          var nextTokenX = 0;
          var nextTokenY = 0;
          var longestLine = 0;
          var letterRight = 0;
          var highestY = 0;
          var lowestY = 0;
          var letterDef = null;

          for (var index = 0; index < textLen;) {
            var character = _string.charAt(index);

            if (character === "\n") {
              _linesWidth.push(letterRight);

              letterRight = 0;
              lineIndex++;
              nextTokenX = 0;
              nextTokenY -= _lineHeight * this._getFontScale() + _lineSpacing;

              this._recordPlaceholderInfo(index, character);

              index++;
              continue;
            }

            var tokenLen = nextTokenFunc(_string, index, textLen, comp);
            var tokenHighestY = highestY;
            var tokenLowestY = lowestY;
            var tokenRight = letterRight;
            var nextLetterX = nextTokenX;
            var newLine = false;

            for (var tmp = 0; tmp < tokenLen; ++tmp) {
              var letterIndex = index + tmp;
              character = _string.charAt(letterIndex);

              if (character === "\r") {
                this._recordPlaceholderInfo(letterIndex, character);

                continue;
              }

              letterDef = (_crd && shareLabelInfo === void 0 ? (_reportPossibleCrUseOfshareLabelInfo({
                error: Error()
              }), shareLabelInfo) : shareLabelInfo).fontAtlas.getLetterDefinitionForChar(character, _crd && shareLabelInfo === void 0 ? (_reportPossibleCrUseOfshareLabelInfo({
                error: Error()
              }), shareLabelInfo) : shareLabelInfo, comp.charCacheType);

              if (!letterDef) {
                this._recordPlaceholderInfo(letterIndex, character);

                console.log("Can't find letter definition in texture atlas " + _fntConfig.atlasName + " for letter:" + character);
                continue;
              }

              var letterX = nextLetterX + letterDef.offsetX * _bmfontScale - (_crd && shareLabelInfo === void 0 ? (_reportPossibleCrUseOfshareLabelInfo({
                error: Error()
              }), shareLabelInfo) : shareLabelInfo).margin;

              if (_isWrapText && _maxLineWidth > 0 && nextTokenX > 0 && letterX + letterDef.w * _bmfontScale > _maxLineWidth && !isUnicodeSpace(character)) {
                _linesWidth.push(letterRight);

                letterRight = 0;
                lineIndex++;
                nextTokenX = 0;
                nextTokenY -= _lineHeight * this._getFontScale() + _lineSpacing;
                newLine = true;
                break;
              } else {
                letterPosition.x = letterX;
              }

              letterPosition.y = nextTokenY - letterDef.offsetY * _bmfontScale;

              this._recordLetterInfo(letterPosition, character, letterIndex, lineIndex, comp);

              if (letterIndex + 1 < _horizontalKerning.length && letterIndex < textLen - 1) {
                nextLetterX += _horizontalKerning[letterIndex + 1];
              }

              nextLetterX += letterDef.xAdvance * _bmfontScale + _spacingX;
              tokenRight = letterPosition.x + letterDef.w * _bmfontScale;

              if (tokenHighestY < letterPosition.y) {
                tokenHighestY = letterPosition.y;
              }

              if (tokenLowestY > letterPosition.y - letterDef.h * _bmfontScale) {
                tokenLowestY = letterPosition.y - letterDef.h * _bmfontScale;
              }
            } // end of for loop


            if (newLine) {
              continue;
            }

            nextTokenX = nextLetterX;
            letterRight = tokenRight;

            if (highestY < tokenHighestY) {
              highestY = tokenHighestY;
            }

            if (lowestY > tokenLowestY) {
              lowestY = tokenLowestY;
            }

            if (longestLine < letterRight) {
              longestLine = letterRight;
            }

            index += tokenLen;
          } // end of for loop


          _linesWidth.push(letterRight);

          _numberOfLines = lineIndex + 1;
          _textDesiredHeight = _numberOfLines * _lineHeight * this._getFontScale();

          if (_numberOfLines > 1) {
            _textDesiredHeight += (_numberOfLines - 1) * _lineSpacing;
          }

          _contentSize.width = _labelWidth;
          _contentSize.height = _labelHeight;

          if (_labelWidth <= 0) {
            _contentSize.width = parseFloat(longestLine.toFixed(2)) + (_crd && shareLabelInfo === void 0 ? (_reportPossibleCrUseOfshareLabelInfo({
              error: Error()
            }), shareLabelInfo) : shareLabelInfo).margin * 2;
          }

          if (_labelHeight <= 0) {
            _contentSize.height = parseFloat(_textDesiredHeight.toFixed(2)) + (_crd && shareLabelInfo === void 0 ? (_reportPossibleCrUseOfshareLabelInfo({
              error: Error()
            }), shareLabelInfo) : shareLabelInfo).margin * 2;
          }

          _tailoredTopY = _contentSize.height;
          _tailoredBottomY = 0;

          if (highestY > 0) {
            _tailoredTopY = _contentSize.height + highestY;
          }

          if (lowestY < -_textDesiredHeight) {
            _tailoredBottomY = _textDesiredHeight + lowestY;
          }

          return true;
        },
        _getFirstCharLen: function _getFirstCharLen() {
          return 1;
        },
        _getFontScale: function _getFontScale() {
          return _overflow === Overflow.SHRINK ? _bmfontScale : 1;
        },
        _getFirstWordLen: function _getFirstWordLen(text, startIndex, textLen, comp) {
          var character = text.charAt(startIndex);

          if (isUnicodeCJK(character) || character === "\n" || isUnicodeSpace(character)) {
            return 1;
          }

          var len = 1;
          var letterDef = (_crd && shareLabelInfo === void 0 ? (_reportPossibleCrUseOfshareLabelInfo({
            error: Error()
          }), shareLabelInfo) : shareLabelInfo).fontAtlas.getLetterDefinitionForChar(character, _crd && shareLabelInfo === void 0 ? (_reportPossibleCrUseOfshareLabelInfo({
            error: Error()
          }), shareLabelInfo) : shareLabelInfo, comp.charCacheType);

          if (!letterDef) {
            return len;
          }

          var nextLetterX = letterDef.xAdvance * _bmfontScale + _spacingX;
          var letterX = 0;

          for (var index = startIndex + 1; index < textLen; ++index) {
            character = text.charAt(index);
            letterDef = (_crd && shareLabelInfo === void 0 ? (_reportPossibleCrUseOfshareLabelInfo({
              error: Error()
            }), shareLabelInfo) : shareLabelInfo).fontAtlas.getLetterDefinitionForChar(character, _crd && shareLabelInfo === void 0 ? (_reportPossibleCrUseOfshareLabelInfo({
              error: Error()
            }), shareLabelInfo) : shareLabelInfo, comp.charCacheType);

            if (!letterDef) {
              break;
            }

            letterX = nextLetterX + letterDef.offsetX * _bmfontScale;

            if (letterX + letterDef.w * _bmfontScale > _maxLineWidth && !isUnicodeSpace(character) && _maxLineWidth > 0) {
              return len;
            }

            nextLetterX += letterDef.xAdvance * _bmfontScale + _spacingX;

            if (character === "\n" || isUnicodeSpace(character) || isUnicodeCJK(character)) {
              break;
            }

            len++;
          }

          return len;
        },
        _multilineTextWrapByWord: function _multilineTextWrapByWord(comp) {
          return this._multilineTextWrap(this._getFirstWordLen, comp);
        },
        _multilineTextWrapByChar: function _multilineTextWrapByChar(comp) {
          return this._multilineTextWrap(this._getFirstCharLen, comp);
        },
        _recordPlaceholderInfo: function _recordPlaceholderInfo(letterIndex, _char) {
          if (letterIndex >= _lettersInfo.length) {
            var tmpInfo = new LetterInfo();

            _lettersInfo.push(tmpInfo);
          }

          _lettersInfo[letterIndex]["char"] = _char;
          _lettersInfo[letterIndex].hash = _char.charCodeAt(0) + (_crd && shareLabelInfo === void 0 ? (_reportPossibleCrUseOfshareLabelInfo({
            error: Error()
          }), shareLabelInfo) : shareLabelInfo).hash;
          _lettersInfo[letterIndex].valid = false;
        },
        _recordLetterInfo: function _recordLetterInfo(letterPosition, character, letterIndex, lineIndex, comp) {
          if (letterIndex >= _lettersInfo.length) {
            var tmpInfo = new LetterInfo();

            _lettersInfo.push(tmpInfo);
          }

          var _char2 = character.charCodeAt(0);

          var key = _char2 + (_crd && shareLabelInfo === void 0 ? (_reportPossibleCrUseOfshareLabelInfo({
            error: Error()
          }), shareLabelInfo) : shareLabelInfo).hash;
          _lettersInfo[letterIndex].line = lineIndex;
          _lettersInfo[letterIndex]["char"] = character;
          _lettersInfo[letterIndex].hash = key;
          _lettersInfo[letterIndex].valid = (_crd && shareLabelInfo === void 0 ? (_reportPossibleCrUseOfshareLabelInfo({
            error: Error()
          }), shareLabelInfo) : shareLabelInfo).fontAtlas.getLetter(key, comp.charCacheType).valid;
          _lettersInfo[letterIndex].x = letterPosition.x;
          _lettersInfo[letterIndex].y = letterPosition.y;
        },
        _alignText: function _alignText(comp) {
          _textDesiredHeight = 0;
          _linesWidth.length = 0;

          if (!_lineBreakWithoutSpaces) {
            this._multilineTextWrapByWord(comp);
          } else {
            this._multilineTextWrapByChar(comp);
          }

          this._computeAlignmentOffset(); // shrink


          if (_overflow === Overflow.SHRINK) {
            if (_fontSize > 0 && this._isVerticalClamp()) {
              this._shrinkLabelToContentSize(this._isVerticalClamp, comp);
            }
          }

          if (!this._updateQuads(comp)) {
            if (_overflow === Overflow.SHRINK) {
              this._shrinkLabelToContentSize(this._isHorizontalClamp, comp);
            }
          }
        },
        _scaleFontSizeDown: function _scaleFontSizeDown(fontSize, comp) {
          var shouldUpdateContent = true;

          if (!fontSize) {
            fontSize = 0.1;
            shouldUpdateContent = false;
          }

          _fontSize = fontSize;

          if (shouldUpdateContent) {
            this._updateContent(comp);
          }
        },
        _shrinkLabelToContentSize: function _shrinkLabelToContentSize(lambda, comp) {
          var fontSize = _fontSize;
          var left = 0;
          var right = fontSize | 0;
          var mid = 0;

          while (left < right) {
            mid = left + right + 1 >> 1;
            var newFontSize = mid;

            if (newFontSize <= 0) {
              break;
            }

            _bmfontScale = newFontSize / _originFontSize;

            if (!_lineBreakWithoutSpaces) {
              this._multilineTextWrapByWord(comp);
            } else {
              this._multilineTextWrapByChar(comp);
            }

            this._computeAlignmentOffset();

            if (lambda(comp)) {
              right = mid - 1;
            } else {
              left = mid;
            }
          }

          if (left >= 0) {
            this._scaleFontSizeDown(left, comp);
          }
        },
        _isVerticalClamp: function _isVerticalClamp() {
          if (_textDesiredHeight > _contentSize.height) {
            return true;
          } else {
            return false;
          }
        },
        _isHorizontalClamp: function _isHorizontalClamp(comp) {
          var letterClamp = false;

          for (var ctr = 0, l = _string.length; ctr < l; ++ctr) {
            var letterInfo = _lettersInfo[ctr];

            if (letterInfo.valid) {
              var letterDef = (_crd && shareLabelInfo === void 0 ? (_reportPossibleCrUseOfshareLabelInfo({
                error: Error()
              }), shareLabelInfo) : shareLabelInfo).fontAtlas.getLetterDefinitionForChar(letterInfo["char"], _crd && shareLabelInfo === void 0 ? (_reportPossibleCrUseOfshareLabelInfo({
                error: Error()
              }), shareLabelInfo) : shareLabelInfo, comp.charCacheType);

              if (!letterDef) {
                continue;
              }

              var px = letterInfo.x + letterDef.w / 2 * _bmfontScale;
              var lineIndex = letterInfo.line;

              if (_labelWidth > 0) {
                if (!_isWrapText) {
                  if (px > _contentSize.width) {
                    letterClamp = true;
                    break;
                  }
                } else {
                  var wordWidth = _linesWidth[lineIndex];

                  if (wordWidth > _contentSize.width && (px > _contentSize.width || px < 0)) {
                    letterClamp = true;
                    break;
                  }
                }
              }
            }
          }

          return letterClamp;
        },
        _isHorizontalClamped: function _isHorizontalClamped(px, lineIndex) {
          var wordWidth = _linesWidth[lineIndex];
          var letterOverClamp = px > _contentSize.width || px < 0;

          if (!_isWrapText) {
            return letterOverClamp;
          } else {
            return wordWidth > _contentSize.width && letterOverClamp;
          }
        },
        _updateQuads: function _updateQuads(comp) {
          if (!_comp) {
            return false;
          }

          var texture = _spriteFrame ? _spriteFrame.texture : (_crd && shareLabelInfo === void 0 ? (_reportPossibleCrUseOfshareLabelInfo({
            error: Error()
          }), shareLabelInfo) : shareLabelInfo).fontAtlas.getTexture(comp.charCacheType);
          var renderData = _comp.renderData;
          renderData.dataLength = renderData.vertexCount = renderData.indicesCount = 0;
          var anchorPoint = _uiTrans.anchorPoint;
          var contentSize = _contentSize;
          var appX = anchorPoint.x * contentSize.width;
          var appY = anchorPoint.y * contentSize.height;
          var ret = true;

          for (var ctr = 0, l = _string.length; ctr < l; ++ctr) {
            var letterInfo = _lettersInfo[ctr];

            if (!letterInfo.valid) {
              continue;
            }

            var letterDef = (_crd && shareLabelInfo === void 0 ? (_reportPossibleCrUseOfshareLabelInfo({
              error: Error()
            }), shareLabelInfo) : shareLabelInfo).fontAtlas.getLetter(letterInfo.hash, comp.charCacheType);

            if (!letterDef) {
              console.warn("Can't find letter in this bitmap-font");
              continue;
            }

            _tmpRect.height = letterDef.h;
            _tmpRect.width = letterDef.w;
            _tmpRect.x = letterDef.u;
            _tmpRect.y = letterDef.v;
            var py = letterInfo.y + _letterOffsetY;

            if (_labelHeight > 0) {
              if (py > _tailoredTopY) {
                var clipTop = py - _tailoredTopY;
                _tmpRect.y += clipTop;
                _tmpRect.height -= clipTop;
                py -= clipTop;
              }

              if (py - letterDef.h * _bmfontScale < _tailoredBottomY && _overflow === Overflow.CLAMP) {
                _tmpRect.height = py < _tailoredBottomY ? 0 : (py - _tailoredBottomY) / _bmfontScale;
              }
            }

            var lineIndex = letterInfo.line;
            var px = letterInfo.x + letterDef.w / 2 * _bmfontScale + _linesOffsetX[lineIndex];

            if (_labelWidth > 0) {
              if (this._isHorizontalClamped(px, lineIndex)) {
                if (_overflow === Overflow.CLAMP) {
                  _tmpRect.width = 0;
                } else if (_overflow === Overflow.SHRINK) {
                  if (_contentSize.width > letterDef.w) {
                    ret = false;
                    break;
                  } else {
                    _tmpRect.width = 0;
                  }
                }
              }
            }

            if (_tmpRect.height > 0 && _tmpRect.width > 0) {
              var isRotated = this._determineRect();

              var letterPositionX = letterInfo.x + _linesOffsetX[letterInfo.line];
              this.appendQuad(_comp, texture, _tmpRect, isRotated, letterPositionX - appX, py - appY, _bmfontScale);
            }
          }

          return ret;
        },
        appendQuad: function appendQuad(comp, texture, rect, rotated, x, y, scale) {},
        _determineRect: function _determineRect() {
          var isRotated = _spriteFrame.isRotated();

          var originalSize = _spriteFrame.getOriginalSize();

          var rect = _spriteFrame.getRect();

          var offset = _spriteFrame.getOffset();

          var trimmedLeft = offset.x + (originalSize.width - rect.width) / 2;
          var trimmedTop = offset.y - (originalSize.height - rect.height) / 2;

          if (!isRotated) {
            _tmpRect.x += rect.x - trimmedLeft;
            _tmpRect.y += rect.y + trimmedTop;
          } else {
            var originalX = _tmpRect.x;
            _tmpRect.x = rect.x + rect.height - _tmpRect.y - _tmpRect.height - trimmedTop;
            _tmpRect.y = originalX + rect.y - trimmedLeft;

            if (_tmpRect.y < 0) {
              _tmpRect.height += trimmedTop;
            }
          }

          return isRotated;
        },
        _computeAlignmentOffset: function _computeAlignmentOffset() {
          _linesOffsetX.length = 0;

          switch (_hAlign) {
            case HorizontalTextAlignment.LEFT:
              for (var i = 0; i < _numberOfLines; ++i) {
                _linesOffsetX.push(0);
              }

              break;

            case HorizontalTextAlignment.CENTER:
              for (var _i = 0, l = _linesWidth.length; _i < l; _i++) {
                _linesOffsetX.push((_contentSize.width - _linesWidth[_i]) / 2);
              }

              break;

            case HorizontalTextAlignment.RIGHT:
              for (var _i2 = 0, _l = _linesWidth.length; _i2 < _l; _i2++) {
                _linesOffsetX.push(_contentSize.width - _linesWidth[_i2]);
              }

              break;

            default:
              break;
          } // TOP


          _letterOffsetY = _contentSize.height;

          if (_vAlign !== VerticalTextAlignment.TOP) {
            var blank = _contentSize.height - _textDesiredHeight + _lineHeight * this._getFontScale() - _originFontSize * _bmfontScale;

            if (_vAlign === VerticalTextAlignment.BOTTOM) {
              // BOTTOM
              _letterOffsetY -= blank;
            } else {
              // CENTER:
              _letterOffsetY -= blank / 2;
            }
          }
        },
        _setupBMFontOverflowMetrics: function _setupBMFontOverflowMetrics() {
          var newWidth = _contentSize.width;
          var newHeight = _contentSize.height;

          if (_overflow === Overflow.RESIZE_HEIGHT) {
            newHeight = 0;
          }

          if (_overflow === Overflow.NONE) {
            newWidth = 0;
            newHeight = 0;
          }

          _labelWidth = newWidth;
          _labelHeight = newHeight;
          _labelDimensions.width = newWidth;
          _labelDimensions.height = newHeight;
          _maxLineWidth = newWidth;
        }
      });

      _export("default", bmfontUtils);

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=bmfontUtils.js.map