System.register(["__unresolved_0", "cc", "cc/env"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Button, Component, Enum, EventHandler, Node, Sprite, SpriteFrame, tween, Tween, UITransform, Vec3, DEV, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _temp, _crd, ccclass, property, disallowMultiple, menu, executionOrder, LayerType, SelectedType, ScrollListItem;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfScrollList(extras) {
    _reporterNs.report("ScrollList", "./ScrollList", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Button = _cc.Button;
      Component = _cc.Component;
      Enum = _cc.Enum;
      EventHandler = _cc.EventHandler;
      Node = _cc.Node;
      Sprite = _cc.Sprite;
      SpriteFrame = _cc.SpriteFrame;
      tween = _cc.tween;
      Tween = _cc.Tween;
      UITransform = _cc.UITransform;
      Vec3 = _cc.Vec3;
    }, function (_ccEnv) {
      DEV = _ccEnv.DEV;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "02bebxX3j5EuKDyO8+PIKlL", "ScrollListItem", undefined);

      /******************************************
       * @author kL <klk0@qq.com>
       * @date 2019/12/9
       * @doc 列表Item组件.
       * 说明：
       *      1、此组件须配合List组件使用。（配套的配套的..）
       * @end
       ******************************************/
      ccclass = _decorator.ccclass;
      property = _decorator.property;
      disallowMultiple = _decorator.disallowMultiple;
      menu = _decorator.menu;
      executionOrder = _decorator.executionOrder;

      (function (LayerType) {
        LayerType[LayerType["NONE"] = 0] = "NONE";
        LayerType[LayerType["SLICE"] = 1] = "SLICE";
      })(LayerType || (LayerType = {}));

      (function (SelectedType) {
        SelectedType[SelectedType["NONE"] = 0] = "NONE";
        SelectedType[SelectedType["TOGGLE"] = 1] = "TOGGLE";
        SelectedType[SelectedType["SWITCH"] = 2] = "SWITCH";
      })(SelectedType || (SelectedType = {}));

      _export("default", //先于List
      ScrollListItem = (_dec = disallowMultiple(), _dec2 = menu('组件库/ScrollListItem'), _dec3 = executionOrder(-5001), _dec4 = property({
        type: Enum(LayerType),
        tooltip: "是否分层渲染"
      }), _dec5 = property({
        type: [Node],
        tooltip: "列表除主容器外的其他容器\n需要分层显示时使用，一般用于降低draw call",
        visible: function visible() {
          return this.contentLayerType === LayerType.SLICE;
        }
      }), _dec6 = property({
        type: Enum(SelectedType),
        tooltip: DEV && '选择模式'
      }), _dec7 = property({
        type: Node,
        tooltip: DEV && '被选标识',
        visible: function visible() {
          return this.selectedMode > SelectedType.NONE;
        }
      }), _dec8 = property({
        type: SpriteFrame,
        tooltip: DEV && '被选择的SpriteFrame',
        visible: function visible() {
          return this.selectedMode == SelectedType.SWITCH;
        }
      }), _dec9 = property({
        tooltip: DEV && '自适应尺寸（宽或高）'
      }), ccclass(_class = _dec(_class = _dec2(_class = _dec3(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ScrollListItem, _Component);

        function ScrollListItem() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "contentLayerType", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "layerNodeList", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "selectedMode", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "selectedFlag", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "selectedSpriteFrame", _descriptor5, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "_unselectedSpriteFrame", null);

          _initializerDefineProperty(_assertThisInitialized(_this), "adaptiveSize", _descriptor6, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "list", void 0);

          _defineProperty(_assertThisInitialized(_this), "listId", void 0);

          _defineProperty(_assertThisInitialized(_this), "_eventReg", false);

          _defineProperty(_assertThisInitialized(_this), "_selected", false);

          _defineProperty(_assertThisInitialized(_this), "_btnCom", void 0);

          return _this;
        }

        var _proto = ScrollListItem.prototype;

        _proto.onLoad = function onLoad() {
          // //没有按钮组件的话，selectedFlag无效
          // if (!this.btnCom)
          //     this.selectedMode == SelectedType.NONE;
          //有选择模式时，保存相应的东西
          if (this.selectedMode == SelectedType.SWITCH) {
            var com = this.selectedFlag.getComponent(Sprite);
            this._unselectedSpriteFrame = com.spriteFrame;
          }
        };

        _proto.onDestroy = function onDestroy() {
          this.node.off(Node.EventType.SIZE_CHANGED, this._onSizeChange, this);
        };

        _proto._registerEvent = function _registerEvent() {
          if (!this._eventReg) {
            if (this.btnCom && this.list.selectedMode > 0) {
              this.btnCom.clickEvents.unshift(this.createEvt(this, 'onClickThis'));
            }

            if (this.adaptiveSize) {
              this.node.on(Node.EventType.SIZE_CHANGED, this._onSizeChange, this);
            }

            this._eventReg = true;
          }
        };

        _proto._onSizeChange = function _onSizeChange() {
          this.list._onItemAdaptive(this.node);
        }
        /**
         * 创建事件
         * @param {cc.Component} component 组件脚本
         * @param {string} handlerName 触发函数名称
         * @param {cc.Node} node 组件所在node（不传的情况下取component.node）
         * @returns cc.Component.EventHandler
         */
        ;

        _proto.createEvt = function createEvt(component, handlerName, node) {
          if (node === void 0) {
            node = null;
          }

          if (!component.isValid) return; //有些异步加载的，节点以及销毁了。

          component['comName'] = component['comName'] || component.name.match(/\<(.*?)\>/g).pop().replace(/\<|>/g, '');
          var evt = new EventHandler();
          evt.target = node || component.node;
          evt.component = component['comName'];
          evt.handler = handlerName;
          return evt;
        };

        _proto.showAni = function showAni(aniType, callFunc, del) {
          var t = this;
          var twe;
          var ut = t.node.getComponent(UITransform);

          switch (aniType) {
            case 0:
              //向上消失
              twe = tween(t.node).to(.2, {
                scale: new Vec3(.7, .7, 1.0)
              }).by(.3, {
                position: new Vec3(0, ut.height * 2, 0)
              });
              break;

            case 1:
              //向右消失
              twe = tween(t.node).to(.2, {
                scale: new Vec3(.7, .7, 1.0)
              }).by(.3, {
                position: new Vec3(ut.width * 2, 0, 0)
              });
              break;

            case 2:
              //向下消失
              twe = tween(t.node).to(.2, {
                scale: new Vec3(.7, .7, 1.0)
              }).by(.3, {
                position: new Vec3(0, ut.height * -2, 0)
              });
              break;

            case 3:
              //向左消失
              twe = tween(t.node).to(.2, {
                scale: new Vec3(.7, .7, 1.0)
              }).by(.3, {
                position: new Vec3(ut.width * -2, 0, 0)
              });
              break;

            default:
              //默认：缩小消失
              twe = tween(t.node).to(.3, {
                scale: new Vec3(.1, .1, 1.0)
              });
              break;
          }

          if (callFunc || del) {
            twe.call(function () {
              if (del) {
                t.list._delSingleItem(t.node);

                for (var n = t.list.displayData.length - 1; n >= 0; n--) {
                  if (t.list.displayData[n].id === t.listId) {
                    t.list.displayData.splice(n, 1);
                    break;
                  }
                }
              }

              callFunc();
            });
          }

          twe.start();
        };

        _proto.onClickThis = function onClickThis() {
          this.list.selectedId = this.listId;
        };

        _createClass(ScrollListItem, [{
          key: "selected",
          get: function get() {
            return this._selected;
          },
          set: function set(val) {
            this._selected = val;
            Tween;
            if (!this.selectedFlag) return;

            switch (this.selectedMode) {
              case SelectedType.TOGGLE:
                this.selectedFlag.active = val;
                break;

              case SelectedType.SWITCH:
                var sp = this.selectedFlag.getComponent(Sprite);

                if (sp) {
                  sp.spriteFrame = val ? this.selectedSpriteFrame : this._unselectedSpriteFrame;
                }

                break;
            }
          } //按钮组件

        }, {
          key: "btnCom",
          get: function get() {
            if (!this._btnCom) this._btnCom = this.node.getComponent(Button);
            return this._btnCom;
          }
        }]);

        return ScrollListItem;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "contentLayerType", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return LayerType.NONE;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "layerNodeList", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "selectedMode", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return SelectedType.NONE;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "selectedFlag", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "selectedSpriteFrame", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "adaptiveSize", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      })), _class2)) || _class) || _class) || _class) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=ScrollListItem.js.map