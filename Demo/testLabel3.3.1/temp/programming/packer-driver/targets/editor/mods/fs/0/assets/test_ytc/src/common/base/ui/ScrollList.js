/******************************************
 * @author kL <klk0@qq.com>
 * @date 2020/12/9
 * @doc 列表组件.
 * @end
 ******************************************/
"use strict";

System.register(["__unresolved_0", "cc", "cc/env", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, CCBoolean, CCFloat, CCInteger, Component, Enum, EventHandler, instantiate, isValid, Layers, Layout, Node, NodePool, Prefab, ScrollView, Size, tween, UITransform, Vec3, Widget, DEV, EDITOR, ScrollListItem, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _temp, _crd, ccclass, property, disallowMultiple, menu, executionOrder, requireComponent, TemplateType, LayerType, SlideType, SelectedType, ScrollList;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfScrollListItem(extras) {
    _reporterNs.report("ScrollListItem", "./ScrollListItem", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      CCBoolean = _cc.CCBoolean;
      CCFloat = _cc.CCFloat;
      CCInteger = _cc.CCInteger;
      Component = _cc.Component;
      Enum = _cc.Enum;
      EventHandler = _cc.EventHandler;
      instantiate = _cc.instantiate;
      isValid = _cc.isValid;
      Layers = _cc.Layers;
      Layout = _cc.Layout;
      Node = _cc.Node;
      NodePool = _cc.NodePool;
      Prefab = _cc.Prefab;
      ScrollView = _cc.ScrollView;
      Size = _cc.Size;
      tween = _cc.tween;
      UITransform = _cc.UITransform;
      Vec3 = _cc.Vec3;
      Widget = _cc.Widget;
    }, function (_ccEnv) {
      DEV = _ccEnv.DEV;
      EDITOR = _ccEnv.EDITOR;
    }, function (_unresolved_2) {
      ScrollListItem = _unresolved_2.default;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "4082aTJO85KOoYutfRmboZj", "ScrollList", undefined);

      ({
        ccclass,
        property,
        disallowMultiple,
        menu,
        executionOrder,
        requireComponent
      } = _decorator);

      (function (TemplateType) {
        TemplateType[TemplateType["NODE"] = 1] = "NODE";
        TemplateType[TemplateType["PREFAB"] = 2] = "PREFAB";
      })(TemplateType || (TemplateType = {}));

      (function (LayerType) {
        LayerType[LayerType["NONE"] = 0] = "NONE";
        LayerType[LayerType["SLICE"] = 1] = "SLICE";
      })(LayerType || (LayerType = {}));

      (function (SlideType) {
        SlideType[SlideType["NORMAL"] = 1] = "NORMAL";
        SlideType[SlideType["ADHERING"] = 2] = "ADHERING";
        SlideType[SlideType["PAGE"] = 3] = "PAGE";
      })(SlideType || (SlideType = {}));

      (function (SelectedType) {
        SelectedType[SelectedType["NONE"] = 0] = "NONE";
        SelectedType[SelectedType["SINGLE"] = 1] = "SINGLE";
        SelectedType[SelectedType["MULT"] = 2] = "MULT";
      })(SelectedType || (SelectedType = {}));

      _export("default", ScrollList = (_dec = disallowMultiple(), _dec2 = menu("组件库/ScrollList"), _dec3 = requireComponent(ScrollView), _dec4 = executionOrder(-5000), _dec5 = property({
        type: Enum(LayerType),
        tooltip: "是否分层渲染"
      }), _dec6 = property({
        type: Node,
        tooltip: DEV && "模板Item",

        visible() {
          return this.templateType == TemplateType.NODE;
        }

      }), _dec7 = property({
        type: Prefab,
        tooltip: DEV && "模板Item",

        visible() {
          return this.templateType == TemplateType.PREFAB;
        }

      }), _dec8 = property({
        type: CCFloat,
        range: [0, 1, 0.1],
        tooltip: DEV && "翻页作用距离",
        slide: true,

        visible() {
          return this._slideMode == SlideType.PAGE;
        }

      }), _dec9 = property({
        tooltip: DEV && "是否为循环列表",

        visible() {
          let val =
          /*this.virtual &&*/
          this.slideMode == SlideType.NORMAL;
          if (!val) this.cyclic = false;
          return val;
        }

      }), _dec10 = property({
        tooltip: DEV && "Item数量不足以填满Content时，是否居中显示Item（不支持Grid布局）",

        visible() {
          return this.virtual;
        }

      }), _dec11 = property({
        tooltip: DEV && "Item数量不足以填满Content时，是否可滑动",

        visible() {
          let val = this.virtual && !this.lackCenter;
          if (!val) this.lackSlide = false;
          return val;
        }

      }), _dec12 = property({
        type: CCInteger,
        range: [0, 12, 1],
        tooltip: DEV && "逐帧渲染时，每帧渲染的Item数量（<=0时关闭分帧渲染）",
        slide: true
      }), _dec13 = property({
        type: EventHandler,
        tooltip: DEV && "渲染事件（渲染器）"
      }), _dec14 = property({
        type: Enum(SelectedType),
        tooltip: DEV && "选择模式"
      }), _dec15 = property({
        type: EventHandler,
        tooltip: DEV && "触发选择事件",

        visible() {
          return this.selectedMode > SelectedType.NONE;
        }

      }), _dec16 = property({
        tooltip: DEV && "是否重复响应单选事件",

        visible() {
          return this.selectedMode == SelectedType.SINGLE;
        }

      }), _dec17 = property({
        type: false,
        tooltip: "TOGGLE 模式下  选中后再次点击取消选中（需要 repeatEventSingle 为 'true'）",
        visible: function () {
          return this.selectedMode === SelectedType.SINGLE && this.repeatEventSingle === true;
        }
      }), _dec18 = property({
        type: Enum(TemplateType),
        tooltip: DEV && "模板类型"
      }), _dec19 = property({
        type: EventHandler,
        tooltip: DEV && "页面改变事件",

        visible() {
          return this._slideMode == SlideType.PAGE;
        }

      }), _dec20 = property({
        type: EventHandler,
        tooltip: DEV && "初始化动画事件"
      }), _dec21 = property({}), _dec22 = property({
        type: Enum(SlideType),
        tooltip: DEV && "滑动模式"
      }), _dec23 = property({}), _dec24 = property({
        type: CCBoolean,
        tooltip: DEV && "是否为虚拟列表（动态列表）"
      }), _dec25 = property({
        type: CCInteger
      }), _dec26 = property({
        type: CCInteger,
        range: [0, 6, 1],
        tooltip: DEV && "刷新频率（值越大刷新频率越低、性能越高）",
        slide: true
      }), _dec27 = property({
        serializable: false
      }), ccclass(_class = _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = (_temp = class ScrollList extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "contentLayerType", _descriptor, this);

          _initializerDefineProperty(this, "tmpNode", _descriptor2, this);

          _initializerDefineProperty(this, "tmpPrefab", _descriptor3, this);

          _initializerDefineProperty(this, "pageDistance", _descriptor4, this);

          _initializerDefineProperty(this, "cyclic", _descriptor5, this);

          _initializerDefineProperty(this, "lackCenter", _descriptor6, this);

          _initializerDefineProperty(this, "lackSlide", _descriptor7, this);

          _initializerDefineProperty(this, "frameByFrameRenderNum", _descriptor8, this);

          _initializerDefineProperty(this, "renderEvent", _descriptor9, this);

          _initializerDefineProperty(this, "selectedMode", _descriptor10, this);

          _initializerDefineProperty(this, "selectedEvent", _descriptor11, this);

          _initializerDefineProperty(this, "repeatEventSingle", _descriptor12, this);

          _defineProperty(this, "content", void 0);

          _defineProperty(this, "displayItemNum", void 0);

          _defineProperty(this, "_actualNumItems", void 0);

          _defineProperty(this, "displayData", void 0);

          _defineProperty(this, "_customSize", void 0);

          _defineProperty(this, "curPageNum", 0);

          _initializerDefineProperty(this, "canTouchCancel", _descriptor13, this);

          _initializerDefineProperty(this, "templateType", _descriptor14, this);

          _initializerDefineProperty(this, "pageChangeEvent", _descriptor15, this);

          _initializerDefineProperty(this, "animationEvent", _descriptor16, this);

          _defineProperty(this, "_lastSelectedId", void 0);

          _defineProperty(this, "multSelected", void 0);

          _defineProperty(this, "_forceUpdate", false);

          _defineProperty(this, "_align", void 0);

          _defineProperty(this, "_horizontalDir", void 0);

          _defineProperty(this, "_verticalDir", void 0);

          _defineProperty(this, "_startAxis", void 0);

          _defineProperty(this, "_alignCalcType", void 0);

          _defineProperty(this, "_contentUt", void 0);

          _defineProperty(this, "firstListId", void 0);

          _defineProperty(this, "_updateDone", true);

          _defineProperty(this, "_updateCounter", void 0);

          _defineProperty(this, "_cyclicNum", void 0);

          _defineProperty(this, "_cyclicPos1", void 0);

          _defineProperty(this, "_cyclicPos2", void 0);

          _defineProperty(this, "_inited", false);

          _defineProperty(this, "_layout", void 0);

          _defineProperty(this, "_resizeMode", void 0);

          _defineProperty(this, "_topGap", void 0);

          _defineProperty(this, "_rightGap", void 0);

          _defineProperty(this, "_bottomGap", void 0);

          _defineProperty(this, "_leftGap", void 0);

          _defineProperty(this, "_columnGap", void 0);

          _defineProperty(this, "_lineGap", void 0);

          _defineProperty(this, "_colLineNum", void 0);

          _defineProperty(this, "_lastDisplayData", void 0);

          _defineProperty(this, "_mainPool", null);

          _defineProperty(this, "_poolList", []);

          _defineProperty(this, "_itemTmp", void 0);

          _defineProperty(this, "_itemTmpUt", void 0);

          _defineProperty(this, "_needUpdateWidget", false);

          _defineProperty(this, "_itemSize", void 0);

          _defineProperty(this, "_sizeType", void 0);

          _defineProperty(this, "frameCount", void 0);

          _defineProperty(this, "_aniDelRuning", false);

          _defineProperty(this, "_aniDelCB", void 0);

          _defineProperty(this, "_aniDelItem", void 0);

          _defineProperty(this, "_aniDelBeforePos", void 0);

          _defineProperty(this, "_aniDelBeforeScale", void 0);

          _defineProperty(this, "viewTop", void 0);

          _defineProperty(this, "viewRight", void 0);

          _defineProperty(this, "viewBottom", void 0);

          _defineProperty(this, "viewLeft", void 0);

          _defineProperty(this, "_doneAfterUpdate", false);

          _defineProperty(this, "elasticTop", void 0);

          _defineProperty(this, "elasticRight", void 0);

          _defineProperty(this, "elasticBottom", void 0);

          _defineProperty(this, "elasticLeft", void 0);

          _defineProperty(this, "scrollToListId", void 0);

          _defineProperty(this, "adhering", false);

          _defineProperty(this, "_adheringBarrier", false);

          _defineProperty(this, "nearestListId", void 0);

          _defineProperty(this, "_beganPos", void 0);

          _defineProperty(this, "_scrollPos", void 0);

          _defineProperty(this, "_curScrollIsTouch", void 0);

          _defineProperty(this, "_scrollToListId", void 0);

          _defineProperty(this, "_scrollToEndTime", void 0);

          _defineProperty(this, "_scrollToSo", void 0);

          _defineProperty(this, "_lack", void 0);

          _defineProperty(this, "_allItemSize", void 0);

          _defineProperty(this, "_allItemSizeNoEdge", void 0);

          _defineProperty(this, "_scrollItem", void 0);

          _defineProperty(this, "_thisNodeUt", void 0);

          _defineProperty(this, "_contentList", []);

          _defineProperty(this, "_showAnimation", true);

          _initializerDefineProperty(this, "_slideMode", _descriptor17, this);

          _initializerDefineProperty(this, "_virtual", _descriptor18, this);

          _initializerDefineProperty(this, "_updateRate", _descriptor19, this);

          _defineProperty(this, "_selectedId", -1);

          _initializerDefineProperty(this, "_numItems", _descriptor20, this);

          _defineProperty(this, "_scrollView", void 0);
        }

        get slideMode() {
          return this._slideMode;
        }

        set slideMode(val) {
          this._slideMode = val;
        } //是否为虚拟列表（动态列表）


        get virtual() {
          return this._virtual;
        }

        set virtual(val) {
          if (val !== false) this._virtual = val;

          if (!DEV && this._numItems != 0) {
            this._onScrolling();
          }
        } //刷新频率


        get updateRate() {
          return this._updateRate;
        }

        set updateRate(val) {
          if (val >= 0 && val <= 6) {
            this._updateRate = val;
          }
        } //当前选择id


        get selectedId() {
          return this._selectedId;
        }

        set selectedId(val) {
          let t = this;
          let item;

          switch (t.selectedMode) {
            case SelectedType.SINGLE:
              {
                if (!t.repeatEventSingle && val == t._selectedId) return;
                item = t.getItemByListId(val); // if (!item && val >= 0)
                //     return;

                let listItem;
                if (t._selectedId >= 0) t._lastSelectedId = t._selectedId; //如果＜0则取消选择，把_lastSelectedId也置空吧，如果以后有特殊需求再改吧。
                else t._lastSelectedId = 0;
                t._selectedId = val;

                if (item) {
                  listItem = item.getComponent(_crd && ScrollListItem === void 0 ? (_reportPossibleCrUseOfScrollListItem({
                    error: Error()
                  }), ScrollListItem) : ScrollListItem);
                  listItem.selected = true;
                }

                if (t._lastSelectedId >= 0 && (t._lastSelectedId != t._selectedId || t._lastSelectedId === t._selectedId && this.canTouchCancel)) {
                  let lastItem = t.getItemByListId(t._lastSelectedId);

                  if (lastItem) {
                    lastItem.getComponent(_crd && ScrollListItem === void 0 ? (_reportPossibleCrUseOfScrollListItem({
                      error: Error()
                    }), ScrollListItem) : ScrollListItem).selected = false;
                  }

                  if (t._lastSelectedId === t._selectedId && this.canTouchCancel) {
                    t._selectedId = -1;
                  }
                }

                if (t.selectedEvent) {
                  EventHandler.emitEvents([t.selectedEvent], item, val % this._actualNumItems, t._lastSelectedId === 0 ? 0 : t._lastSelectedId % this._actualNumItems);
                }

                break;
              }

            case SelectedType.MULT:
              {
                item = t.getItemByListId(val);
                if (!item) return;
                let listItem = item.getComponent(_crd && ScrollListItem === void 0 ? (_reportPossibleCrUseOfScrollListItem({
                  error: Error()
                }), ScrollListItem) : ScrollListItem);
                if (t._selectedId >= 0) t._lastSelectedId = t._selectedId;
                t._selectedId = val;
                let bool = !listItem.selected;
                listItem.selected = bool;
                let sub = t.multSelected.indexOf(val);

                if (bool && sub < 0) {
                  t.multSelected.push(val);
                } else if (!bool && sub >= 0) {
                  t.multSelected.splice(sub, 1);
                }

                if (t.selectedEvent) {
                  EventHandler.emitEvents([t.selectedEvent], item, val % this._actualNumItems, t._lastSelectedId === 0 ? 0 : t._lastSelectedId % this._actualNumItems, bool);
                }

                break;
              }
          }
        } //列表数量


        get numItems() {
          return this._actualNumItems;
        }

        set numItems(val) {
          let t = this;
          if (!t.checkInited(false)) return;

          if (val === 0 || val < 0) {
            // console.error("numItems set the wrong::", val);
            return;
          }

          t._actualNumItems = t._numItems = val;
          t._forceUpdate = true;

          if (t._virtual) {
            t._resizeContent();

            if (t.cyclic) {
              t._numItems = t._cyclicNum * t._numItems;
            }

            t._onScrolling();

            if (!t.frameByFrameRenderNum && t.slideMode == SlideType.PAGE) t.curPageNum = t.nearestListId;
          } else {
            if (t.cyclic) {
              t._resizeContent();

              t._numItems = t._cyclicNum * t._numItems;
            }

            let layout = t.content.getComponent(Layout);

            if (layout) {
              layout.enabled = true;
            }

            t._delRedundantItem();

            t.firstListId = 0;

            if (t.frameByFrameRenderNum > 0) {
              //先渲染几个出来
              let len = t.frameByFrameRenderNum > t._numItems ? t._numItems : t.frameByFrameRenderNum;

              for (let n = 0; n < len; n++) {
                t._createOrUpdateItem2(n);
              }

              if (t.frameByFrameRenderNum < t._numItems) {
                t._updateCounter = t.frameByFrameRenderNum;
                t._updateDone = false;
              }
            } else {
              for (let n = 0; n < t._numItems; n++) {
                t._createOrUpdateItem2(n);
              }

              t.displayItemNum = t._numItems;
            }
          }
        }

        get scrollView() {
          return this._scrollView;
        } //----------------------------------------------------------------------------


        onLoad() {
          this._init();
        }

        onDestroy() {
          let t = this;
          if (isValid(t._itemTmp)) t._itemTmp.destroy();
          if (isValid(t.tmpNode)) t.tmpNode.destroy();

          t._mainPool.clear();

          t._poolList.forEach(value => {
            value.clear();
          });
        }

        onEnable() {
          // if (!EDITOR)
          this._registerEvent();

          this._init(); // 处理重新显示后，有可能上一次的动画移除还未播放完毕，导致动画卡住的问题


          if (this._aniDelRuning) {
            this._aniDelRuning = false;

            if (this._aniDelItem) {
              if (this._aniDelBeforePos) {
                this._aniDelItem.position = this._aniDelBeforePos;
                delete this._aniDelBeforePos;
              }

              if (this._aniDelBeforeScale) {
                this._aniDelItem.scale = this._aniDelBeforeScale;
                delete this._aniDelBeforeScale;
              }

              delete this._aniDelItem;
            }

            if (this._aniDelCB) {
              this._aniDelCB();

              delete this._aniDelCB;
            }
          }
        }

        onDisable() {
          // if (!EDITOR)
          this._unregisterEvent();
        } //注册事件


        _registerEvent() {
          let t = this;
          t.node.on(Node.EventType.TOUCH_START, t._onTouchStart, t, true);
          t.node.on("touch-up", t._onTouchUp, t);
          t.node.on(Node.EventType.TOUCH_CANCEL, t._onTouchCancelled, t, true);
          t.node.on("scroll-began", t._onScrollBegan, t, true);
          t.node.on("scroll-ended", t._onScrollEnded, t, true);
          t.node.on("scrolling", t._onScrolling, t, true);
          t.node.on(Node.EventType.SIZE_CHANGED, t._onSizeChanged, t);
        } //卸载事件


        _unregisterEvent() {
          let t = this;
          t.node.off(Node.EventType.TOUCH_START, t._onTouchStart, t, true);
          t.node.off("touch-up", t._onTouchUp, t);
          t.node.off(Node.EventType.TOUCH_CANCEL, t._onTouchCancelled, t, true);
          t.node.off("scroll-began", t._onScrollBegan, t, true);
          t.node.off("scroll-ended", t._onScrollEnded, t, true);
          t.node.off("scrolling", t._onScrolling, t, true);
          t.node.off(Node.EventType.SIZE_CHANGED, t._onSizeChanged, t);
        } //初始化各种..


        _init() {
          let t = this;
          if (t._inited) return;
          t._thisNodeUt = t.node.getComponent(UITransform);
          t._scrollView = t.node.getComponent(ScrollView);
          t.content = t._scrollView.content;
          t._contentUt = t.content.getComponent(UITransform);

          if (!t.content) {
            console.error(t.node.name + "'s ScrollView unset content!");
            return;
          }

          t._layout = t.content.getComponent(Layout);
          t._align = t._layout.type; //排列模式

          t._resizeMode = t._layout.resizeMode; //自适应模式

          t._startAxis = t._layout.startAxis;
          t._topGap = t._layout.paddingTop; //顶边距

          t._rightGap = t._layout.paddingRight; //右边距

          t._bottomGap = t._layout.paddingBottom; //底边距

          t._leftGap = t._layout.paddingLeft; //左边距

          t._columnGap = t._layout.spacingX; //列距

          t._lineGap = t._layout.spacingY; //行距

          t._colLineNum; //列数或行数（非GRID模式则=1，表示单列或单行）;

          t._verticalDir = t._layout.verticalDirection; //垂直排列子节点的方向

          t._horizontalDir = t._layout.horizontalDirection; //水平排列子节点的方向

          t.setTemplateItem(instantiate(t.templateType == TemplateType.PREFAB ? t.tmpPrefab : t.tmpNode)); // 特定的滑动模式处理

          if (t._slideMode == SlideType.ADHERING || t._slideMode == SlideType.PAGE) {
            t._scrollView.inertia = false;

            t._scrollView._onMouseWheel = function () {
              return;
            };
          }

          if (!t.virtual) // lackCenter 仅支持 Virtual 模式
            t.lackCenter = false;
          t._lastDisplayData = []; //最后一次刷新的数据

          t.displayData = []; //当前数据

          t._forceUpdate = false; //是否强制更新

          t._updateCounter = 0; //当前分帧渲染帧数

          t._updateDone = true; //分帧渲染是否完成

          t.curPageNum = 0; //当前页数

          if (t.cyclic || 0) {
            t._scrollView._processAutoScrolling = this._processAutoScrolling.bind(t);

            t._scrollView._startBounceBackIfNeeded = function () {
              return false;
            };
          }

          switch (t._align) {
            case Layout.Type.HORIZONTAL:
              {
                switch (t._horizontalDir) {
                  case Layout.HorizontalDirection.LEFT_TO_RIGHT:
                    t._alignCalcType = 1;
                    break;

                  case Layout.HorizontalDirection.RIGHT_TO_LEFT:
                    t._alignCalcType = 2;
                    break;
                }

                break;
              }

            case Layout.Type.VERTICAL:
              {
                switch (t._verticalDir) {
                  case Layout.VerticalDirection.TOP_TO_BOTTOM:
                    t._alignCalcType = 3;
                    break;

                  case Layout.VerticalDirection.BOTTOM_TO_TOP:
                    t._alignCalcType = 4;
                    break;
                }

                break;
              }

            case Layout.Type.GRID:
              {
                switch (t._startAxis) {
                  case Layout.AxisDirection.HORIZONTAL:
                    switch (t._verticalDir) {
                      case Layout.VerticalDirection.TOP_TO_BOTTOM:
                        t._alignCalcType = 3;
                        break;

                      case Layout.VerticalDirection.BOTTOM_TO_TOP:
                        t._alignCalcType = 4;
                        break;
                    }

                    break;

                  case Layout.AxisDirection.VERTICAL:
                    switch (t._horizontalDir) {
                      case Layout.HorizontalDirection.LEFT_TO_RIGHT:
                        t._alignCalcType = 1;
                        break;

                      case Layout.HorizontalDirection.RIGHT_TO_LEFT:
                        t._alignCalcType = 2;
                        break;
                    }

                    break;
                }

                break;
              }
          } // 清空 content
          // t.content.children.forEach((child: Node) => {
          //     child.removeFromParent();
          //     if (child != t.tmpNode && child.isValid)
          //         child.destroy();
          // });


          t.content.removeAllChildren();
          t._inited = true; //初始化 分层

          t._mainPool = new NodePool();
          const tmpNode = t.templateType === TemplateType.PREFAB ? instantiate(t.tmpPrefab) : t.tmpNode;

          if (!EDITOR && isValid(tmpNode)) {
            let listItem = tmpNode.getComponent(_crd && ScrollListItem === void 0 ? (_reportPossibleCrUseOfScrollListItem({
              error: Error()
            }), ScrollListItem) : ScrollListItem);
            this.contentLayerType = listItem.contentLayerType;

            if (this.contentLayerType === LayerType.SLICE) {
              for (let i = 0; i < listItem.layerNodeList.length; i++) {
                let childContent = new Node();
                childContent.layer = Layers.Enum.UI_2D;
                const contentTF = this.content.getComponent(UITransform);
                const childtf = childContent.addComponent(UITransform);
                childtf.anchorX = contentTF.anchorX;
                childtf.anchorY = contentTF.anchorY;
                childContent.position = this.content.position;
                childContent.parent = this.content.parent;

                t._poolList.push(new NodePool()); //这是个池子..


                t._contentList.push(childContent); //分层节点数组

              }
            }
          }
        }
        /**
         * 为了实现循环列表，必须覆写cc.ScrollView的某些函数
         * @param {Number} dt
         */


        _processAutoScrolling(dt) {
          // ------------- scroll-view 里定义的一些常量 -------------
          const OUT_OF_BOUNDARY_BREAKING_FACTOR = 0.05;
          const EPSILON = 1e-4;
          const ZERO = new Vec3();

          const quintEaseOut = time => {
            time -= 1;
            return time * time * time * time * time + 1;
          }; // ------------- scroll-view 里定义的一些常量 -------------


          let sv = this._scrollView;
          const isAutoScrollBrake = sv["_isNecessaryAutoScrollBrake"]();
          const brakingFactor = isAutoScrollBrake ? OUT_OF_BOUNDARY_BREAKING_FACTOR : 1;
          sv["_autoScrollAccumulatedTime"] += dt * (1 / brakingFactor);
          let percentage = Math.min(1, sv["_autoScrollAccumulatedTime"] / sv["_autoScrollTotalTime"]);

          if (sv["_autoScrollAttenuate"]) {
            percentage = quintEaseOut(percentage);
          }

          const clonedAutoScrollTargetDelta = sv["_autoScrollTargetDelta"].clone();
          clonedAutoScrollTargetDelta.multiplyScalar(percentage);
          const clonedAutoScrollStartPosition = sv["_autoScrollStartPosition"].clone();
          clonedAutoScrollStartPosition.add(clonedAutoScrollTargetDelta);
          let reachedEnd = Math.abs(percentage - 1) <= EPSILON;
          const fireEvent = Math.abs(percentage - 1) <= sv["getScrollEndedEventTiming"]();

          if (fireEvent && !sv["_isScrollEndedWithThresholdEventFired"]) {
            sv["_dispatchEvent"](ScrollView.EventType.SCROLL_ENG_WITH_THRESHOLD);
            sv["_isScrollEndedWithThresholdEventFired"] = true;
          }

          if (sv["elastic"]) {
            const brakeOffsetPosition = clonedAutoScrollStartPosition.clone();
            brakeOffsetPosition.subtract(sv["_autoScrollBrakingStartPosition"]);

            if (isAutoScrollBrake) {
              brakeOffsetPosition.multiplyScalar(brakingFactor);
            }

            clonedAutoScrollStartPosition.set(sv["_autoScrollBrakingStartPosition"]);
            clonedAutoScrollStartPosition.add(brakeOffsetPosition);
          } else {
            const moveDelta = clonedAutoScrollStartPosition.clone();
            moveDelta.subtract(sv["_getContentPosition"]());
            const outOfBoundary = sv["_getHowMuchOutOfBoundary"](moveDelta);

            if (!outOfBoundary.equals(ZERO, EPSILON)) {
              clonedAutoScrollStartPosition.add(outOfBoundary);
              reachedEnd = true;
            }
          }

          if (reachedEnd) {
            sv["_autoScrolling"] = false;
          }

          const deltaMove = new Vec3(clonedAutoScrollStartPosition);
          deltaMove.subtract(sv["_getContentPosition"]());
          sv["_clampDelta"](deltaMove);
          sv["_moveContent"](deltaMove, reachedEnd);
          sv["_dispatchEvent"](ScrollView.EventType.SCROLLING);

          if (!sv["_autoScrolling"]) {
            sv["_isBouncing"] = false;
            sv["_scrolling"] = false;
            sv["_dispatchEvent"](ScrollView.EventType.SCROLL_ENDED);
          }
        } //设置模板Item


        setTemplateItem(item) {
          if (!item) return;
          let t = this;
          t._itemTmp = item;
          t._itemTmpUt = item.getComponent(UITransform);
          if (t._resizeMode == Layout.ResizeMode.CHILDREN) t._itemSize = t._layout.cellSize;else {
            let itemUt = item.getComponent(UITransform);
            t._itemSize = new Size(itemUt.width, itemUt.height);
          } //获取ListItem，如果没有就取消选择模式

          let com = item.getComponent(_crd && ScrollListItem === void 0 ? (_reportPossibleCrUseOfScrollListItem({
            error: Error()
          }), ScrollListItem) : ScrollListItem);
          let remove = false;
          if (!com) remove = true; // if (com) {
          //     if (!com._btnCom && !item.getComponent(cc.Button)) {
          //         remove = true;
          //     }
          // }

          if (remove) {
            t.selectedMode = SelectedType.NONE;
          }

          com = item.getComponent(Widget);

          if (com && com.enabled) {
            t._needUpdateWidget = true;
          }

          if (t.selectedMode == SelectedType.MULT) t.multSelected = [];

          switch (t._align) {
            case Layout.Type.HORIZONTAL:
              t._colLineNum = 1;
              t._sizeType = false;
              break;

            case Layout.Type.VERTICAL:
              t._colLineNum = 1;
              t._sizeType = true;
              break;

            case Layout.Type.GRID:
              switch (t._startAxis) {
                case Layout.AxisDirection.HORIZONTAL:
                  //计算列数
                  let trimW = t._contentUt.width - t._leftGap - t._rightGap;
                  t._colLineNum = Math.floor((trimW + t._columnGap) / (t._itemSize.width + t._columnGap));
                  t._sizeType = true;
                  break;

                case Layout.AxisDirection.VERTICAL:
                  //计算行数
                  let trimH = t._contentUt.height - t._topGap - t._bottomGap;
                  t._colLineNum = Math.floor((trimH + t._lineGap) / (t._itemSize.height + t._lineGap));
                  t._sizeType = false;
                  break;
              }

              break;
          }
        }
        /**
         * 检查是否初始化
         * @param {Boolean} printLog 是否打印错误信息
         * @returns
         */


        checkInited(printLog = true) {
          if (!this._inited) {
            if (printLog) console.error("List initialization not completed!");
            return false;
          }

          return true;
        } //禁用 Layout 组件，自行计算 Content Size


        _resizeContent() {
          let t = this;
          let result;

          switch (t._align) {
            case Layout.Type.HORIZONTAL:
              {
                if (t._customSize) {
                  let fixed = t._getFixedSize(0);

                  result = t._leftGap + fixed.val + t._itemSize.width * (t._numItems - fixed.count) + t._columnGap * (t._numItems - 1) + t._rightGap;
                } else {
                  result = t._leftGap + t._itemSize.width * t._numItems + t._columnGap * (t._numItems - 1) + t._rightGap;
                }

                break;
              }

            case Layout.Type.VERTICAL:
              {
                if (t._customSize) {
                  let fixed = t._getFixedSize(0);

                  result = t._topGap + fixed.val + t._itemSize.height * (t._numItems - fixed.count) + t._lineGap * (t._numItems - 1) + t._bottomGap;
                } else {
                  result = t._topGap + t._itemSize.height * t._numItems + t._lineGap * (t._numItems - 1) + t._bottomGap;
                }

                break;
              }

            case Layout.Type.GRID:
              {
                //网格模式不支持居中
                if (t.lackCenter) t.lackCenter = false;

                switch (t._startAxis) {
                  case Layout.AxisDirection.HORIZONTAL:
                    let lineNum = Math.ceil(t._numItems / t._colLineNum);
                    result = t._topGap + t._itemSize.height * lineNum + t._lineGap * (lineNum - 1) + t._bottomGap;
                    break;

                  case Layout.AxisDirection.VERTICAL:
                    let colNum = Math.ceil(t._numItems / t._colLineNum);
                    result = t._leftGap + t._itemSize.width * colNum + t._columnGap * (colNum - 1) + t._rightGap;
                    break;
                }

                break;
              }
          }

          let layout = t.content.getComponent(Layout);
          if (layout) layout.enabled = false;
          t._allItemSize = result;
          t._allItemSizeNoEdge = t._allItemSize - (t._sizeType ? t._topGap + t._bottomGap : t._leftGap + t._rightGap);

          if (t.cyclic) {
            let totalSize = t._sizeType ? t._thisNodeUt.height : t._thisNodeUt.width;
            t._cyclicPos1 = 0;
            totalSize -= t._cyclicPos1;
            t._cyclicNum = Math.ceil(totalSize / t._allItemSizeNoEdge) + 1;
            let spacing = t._sizeType ? t._lineGap : t._columnGap;
            t._cyclicPos2 = t._cyclicPos1 + t._allItemSizeNoEdge + spacing;
            t._cyclicAllItemSize = t._allItemSize + t._allItemSizeNoEdge * (t._cyclicNum - 1) + spacing * (t._cyclicNum - 1);
            t._cycilcAllItemSizeNoEdge = t._allItemSizeNoEdge * t._cyclicNum;
            t._cycilcAllItemSizeNoEdge += spacing * (t._cyclicNum - 1); // cc.log('_cyclicNum ->', t._cyclicNum, t._allItemSizeNoEdge, t._allItemSize, t._cyclicPos1, t._cyclicPos2);
          }

          t._lack = !t.cyclic && t._allItemSize < (t._sizeType ? t._thisNodeUt.height : t._thisNodeUt.width);
          let slideOffset = (!t._lack || !t.lackCenter) && t.lackSlide ? 0 : 0.1;
          let targetWH = t._lack ? (t._sizeType ? t._thisNodeUt.height : t._thisNodeUt.width) - slideOffset : t.cyclic ? t._cyclicAllItemSize : t._allItemSize;
          if (targetWH < 0) targetWH = 0;

          if (t._sizeType) {
            t._contentUt.height = targetWH;
          } else {
            t._contentUt.width = targetWH;
          } // cc.log('_resizeContent()  numItems =', t._numItems, '，content =', t.content);

        } //滚动进行时...


        _onScrolling(ev = undefined) {
          if (this.contentLayerType === LayerType.SLICE) {
            this._contentList.forEach(content => {
              content.position = this.content.position;
            });
          }

          if (this.frameCount === undefined) this.frameCount = this._updateRate;

          if (!this._forceUpdate && ev && ev.type != "scroll-ended" && this.frameCount > 0) {
            this.frameCount--;
            return;
          } else this.frameCount = this._updateRate;

          if (this._aniDelRuning) return; //循环列表处理

          if (this.cyclic) {
            let scrollPos = this.content.getPosition();
            scrollPos = this._sizeType ? scrollPos.y : scrollPos.x;
            let addVal = this._allItemSizeNoEdge + (this._sizeType ? this._lineGap : this._columnGap);
            let add = this._sizeType ? new Vec3(0, addVal, 0) : new Vec3(addVal, 0, 0);
            let contentPos = this.content.getPosition();

            switch (this._alignCalcType) {
              case 1:
                //单行HORIZONTAL（LEFT_TO_RIGHT）、网格VERTICAL（LEFT_TO_RIGHT）
                if (scrollPos > -this._cyclicPos1) {
                  contentPos.set(-this._cyclicPos2, contentPos.y, contentPos.z);
                  this.content.setPosition(contentPos);

                  if (this._scrollView.isAutoScrolling()) {
                    this._scrollView["_autoScrollStartPosition"] = this._scrollView["_autoScrollStartPosition"].subtract(add);
                  } // if (this._beganPos) {
                  //     this._beganPos += add;
                  // }

                } else if (scrollPos < -this._cyclicPos2) {
                  contentPos.set(-this._cyclicPos1, contentPos.y, contentPos.z);
                  this.content.setPosition(contentPos);

                  if (this._scrollView.isAutoScrolling()) {
                    this._scrollView["_autoScrollStartPosition"] = this._scrollView["_autoScrollStartPosition"].add(add);
                  } // if (this._beganPos) {
                  //     this._beganPos -= add;
                  // }

                }

                break;

              case 2:
                //单行HORIZONTAL（RIGHT_TO_LEFT）、网格VERTICAL（RIGHT_TO_LEFT）
                if (scrollPos < this._cyclicPos1) {
                  contentPos.set(this._cyclicPos2, contentPos.y, contentPos.z);
                  this.content.setPosition(contentPos);

                  if (this._scrollView.isAutoScrolling()) {
                    this._scrollView["_autoScrollStartPosition"] = this._scrollView["_autoScrollStartPosition"].add(add);
                  }
                } else if (scrollPos > this._cyclicPos2) {
                  contentPos.set(this._cyclicPos1, contentPos.y, contentPos.z);
                  this.content.setPosition(contentPos);

                  if (this._scrollView.isAutoScrolling()) {
                    this._scrollView["_autoScrollStartPosition"] = this._scrollView["_autoScrollStartPosition"].subtract(add);
                  }
                }

                break;

              case 3:
                //单列VERTICAL（TOP_TO_BOTTOM）、网格HORIZONTAL（TOP_TO_BOTTOM）
                if (scrollPos < this._cyclicPos1) {
                  contentPos.set(contentPos.x, this._cyclicPos2, contentPos.z);
                  this.content.setPosition(contentPos);

                  if (this._scrollView.isAutoScrolling()) {
                    this._scrollView["_autoScrollStartPosition"] = this._scrollView["_autoScrollStartPosition"].add(add);
                  }
                } else if (scrollPos > this._cyclicPos2) {
                  contentPos.set(contentPos.x, this._cyclicPos1, contentPos.z);
                  this.content.setPosition(contentPos);

                  if (this._scrollView.isAutoScrolling()) {
                    this._scrollView["_autoScrollStartPosition"] = this._scrollView["_autoScrollStartPosition"].subtract(add);
                  }
                }

                break;

              case 4:
                //单列VERTICAL（BOTTOM_TO_TOP）、网格HORIZONTAL（BOTTOM_TO_TOP）
                if (scrollPos > -this._cyclicPos1) {
                  contentPos.set(contentPos.x, -this._cyclicPos2, contentPos.z);
                  this.content.setPosition(contentPos);

                  if (this._scrollView.isAutoScrolling()) {
                    this._scrollView["_autoScrollStartPosition"] = this._scrollView["_autoScrollStartPosition"].subtract(add);
                  }
                } else if (scrollPos < -this._cyclicPos2) {
                  contentPos.set(contentPos.x, -this._cyclicPos1, contentPos.z);
                  this.content.setPosition(contentPos);

                  if (this._scrollView.isAutoScrolling()) {
                    this._scrollView["_autoScrollStartPosition"] = this._scrollView["_autoScrollStartPosition"].add(add);
                  }
                }

                break;
            }
          }

          this._calcViewPos();

          let vTop, vRight, vBottom, vLeft;

          if (this._sizeType) {
            vTop = this.viewTop;
            vBottom = this.viewBottom;
          } else {
            vRight = this.viewRight;
            vLeft = this.viewLeft;
          }

          if (this._virtual) {
            this.displayData = [];
            let itemPos;
            let curId = 0;
            let endId = this._numItems - 1;

            if (this._customSize) {
              let breakFor = false; //如果该item的位置在可视区域内，就推入displayData

              for (; curId <= endId && !breakFor; curId++) {
                itemPos = this._calcItemPos(curId);

                switch (this._align) {
                  case Layout.Type.HORIZONTAL:
                    if (itemPos.right >= vLeft && itemPos.left <= vRight) {
                      this.displayData.push(itemPos);
                    } else if (curId != 0 && this.displayData.length > 0) {
                      breakFor = true;
                    }

                    break;

                  case Layout.Type.VERTICAL:
                    if (itemPos.bottom <= vTop && itemPos.top >= vBottom) {
                      this.displayData.push(itemPos);
                    } else if (curId != 0 && this.displayData.length > 0) {
                      breakFor = true;
                    }

                    break;

                  case Layout.Type.GRID:
                    switch (this._startAxis) {
                      case Layout.AxisDirection.HORIZONTAL:
                        if (itemPos.bottom <= vTop && itemPos.top >= vBottom) {
                          this.displayData.push(itemPos);
                        } else if (curId != 0 && this.displayData.length > 0) {
                          breakFor = true;
                        }

                        break;

                      case Layout.AxisDirection.VERTICAL:
                        if (itemPos.right >= vLeft && itemPos.left <= vRight) {
                          this.displayData.push(itemPos);
                        } else if (curId != 0 && this.displayData.length > 0) {
                          breakFor = true;
                        }

                        break;
                    }

                    break;
                }
              }
            } else {
              let ww = this._itemSize.width + this._columnGap;
              let hh = this._itemSize.height + this._lineGap;

              switch (this._alignCalcType) {
                case 1:
                  //单行HORIZONTAL（LEFT_TO_RIGHT）、网格VERTICAL（LEFT_TO_RIGHT）
                  curId = (vLeft - this._leftGap) / ww;
                  endId = (vRight - this._leftGap) / ww;
                  break;

                case 2:
                  //单行HORIZONTAL（RIGHT_TO_LEFT）、网格VERTICAL（RIGHT_TO_LEFT）
                  curId = (-vRight - this._rightGap) / ww;
                  endId = (-vLeft - this._rightGap) / ww;
                  break;

                case 3:
                  //单列VERTICAL（TOP_TO_BOTTOM）、网格HORIZONTAL（TOP_TO_BOTTOM）
                  curId = (-vTop - this._topGap) / hh;
                  endId = (-vBottom - this._topGap) / hh;
                  break;

                case 4:
                  //单列VERTICAL（BOTTOM_TO_TOP）、网格HORIZONTAL（BOTTOM_TO_TOP）
                  curId = (vBottom - this._bottomGap) / hh;
                  endId = (vTop - this._bottomGap) / hh;
                  break;
              }

              curId = Math.floor(curId) * this._colLineNum;
              endId = Math.ceil(endId) * this._colLineNum;
              endId--;
              if (curId < 0 || curId == -0) curId = 0;
              if (endId >= this._numItems) endId = this._numItems - 1;

              for (; curId <= endId; curId++) {
                this.displayData.push(this._calcItemPos(curId));
              }
            }

            this._delRedundantItem();

            if (this.displayData.length <= 0 || !this._numItems) {
              //if none, delete all.
              this._lastDisplayData = [];
              return;
            }

            this.firstListId = this.displayData[0].id;
            this.displayItemNum = this.displayData.length;
            let len = this._lastDisplayData.length;
            let haveDataChange = this.displayItemNum != len;

            if (haveDataChange) {
              // 如果是逐帧渲染，需要排序
              if (this.frameByFrameRenderNum > 0) {
                this._lastDisplayData.sort((a, b) => {
                  return a - b;
                });
              } // 因List的显示数据是有序的，所以只需要判断数组长度是否相等，以及头、尾两个元素是否相等即可。


              haveDataChange = this.firstListId != this._lastDisplayData[0] || this.displayData[this.displayItemNum - 1].id != this._lastDisplayData[len - 1];
            }

            if (this._forceUpdate || haveDataChange) {
              //如果是强制更新
              if (this.frameByFrameRenderNum > 0) {
                // if (this._updateDone) {
                // this._lastDisplayData = [];
                //逐帧渲染
                if (this._numItems > 0) {
                  if (!this._updateDone) {
                    this._doneAfterUpdate = true;
                  } else {
                    this._updateCounter = 0;
                  }

                  this._updateDone = false;
                } else {
                  this._updateCounter = 0;
                  this._updateDone = true;
                } // }

              } else {
                //直接渲染
                this._lastDisplayData = []; // cc.log('List Display Data II::', this.displayData);

                for (let c = 0; c < this.displayItemNum; c++) {
                  this._createOrUpdateItem(this.displayData[c], this._showAnimation);
                }

                this._showAnimation = false;
                this._forceUpdate = false;
              }
            }

            this._calcNearestItem();
          }
        } //计算可视范围


        _calcViewPos() {
          let scrollPos = this.content.getPosition();

          switch (this._alignCalcType) {
            case 1:
              //单行HORIZONTAL（LEFT_TO_RIGHT）、网格VERTICAL（LEFT_TO_RIGHT）
              this.elasticLeft = scrollPos.x > 0 ? scrollPos.x : 0;
              this.viewLeft = (scrollPos.x < 0 ? -scrollPos.x : 0) - this.elasticLeft;
              this.viewRight = this.viewLeft + this._thisNodeUt.width;
              this.elasticRight = this.viewRight > this._contentUt.width ? Math.abs(this.viewRight - this._contentUt.width) : 0;
              this.viewRight += this.elasticRight; // cc.log(this.elasticLeft, this.elasticRight, this.viewLeft, this.viewRight);

              break;

            case 2:
              //单行HORIZONTAL（RIGHT_TO_LEFT）、网格VERTICAL（RIGHT_TO_LEFT）
              this.elasticRight = scrollPos.x < 0 ? -scrollPos.x : 0;
              this.viewRight = (scrollPos.x > 0 ? -scrollPos.x : 0) + this.elasticRight;
              this.viewLeft = this.viewRight - this._thisNodeUt.width;
              this.elasticLeft = this.viewLeft < -this._contentUt.width ? Math.abs(this.viewLeft + this._contentUt.width) : 0;
              this.viewLeft -= this.elasticLeft; // cc.log(this.elasticLeft, this.elasticRight, this.viewLeft, this.viewRight);

              break;

            case 3:
              //单列VERTICAL（TOP_TO_BOTTOM）、网格HORIZONTAL（TOP_TO_BOTTOM）
              this.elasticTop = scrollPos.y < 0 ? Math.abs(scrollPos.y) : 0;
              this.viewTop = (scrollPos.y > 0 ? -scrollPos.y : 0) + this.elasticTop;
              this.viewBottom = this.viewTop - this._thisNodeUt.height;
              this.elasticBottom = this.viewBottom < -this._contentUt.height ? Math.abs(this.viewBottom + this._contentUt.height) : 0;
              this.viewBottom += this.elasticBottom; // cc.log(this.elasticTop, this.elasticBottom, this.viewTop, this.viewBottom);

              break;

            case 4:
              //单列VERTICAL（BOTTOM_TO_TOP）、网格HORIZONTAL（BOTTOM_TO_TOP）
              this.elasticBottom = scrollPos.y > 0 ? Math.abs(scrollPos.y) : 0;
              this.viewBottom = (scrollPos.y < 0 ? -scrollPos.y : 0) - this.elasticBottom;
              this.viewTop = this.viewBottom + this._thisNodeUt.height;
              this.elasticTop = this.viewTop > this._contentUt.height ? Math.abs(this.viewTop - this._contentUt.height) : 0;
              this.viewTop -= this.elasticTop; // cc.log(this.elasticTop, this.elasticBottom, this.viewTop, this.viewBottom);

              break;
          }
        } //计算位置 根据id


        _calcItemPos(id) {
          let width, height, top, bottom, left, right, itemX, itemY;

          switch (this._align) {
            case Layout.Type.HORIZONTAL:
              switch (this._horizontalDir) {
                case Layout.HorizontalDirection.LEFT_TO_RIGHT:
                  {
                    if (this._customSize) {
                      let fixed = this._getFixedSize(id);

                      left = this._leftGap + (this._itemSize.width + this._columnGap) * (id - fixed.count) + (fixed.val + this._columnGap * fixed.count);
                      let cs = this._customSize[id];
                      width = cs > 0 ? cs : this._itemSize.width;
                    } else {
                      left = this._leftGap + (this._itemSize.width + this._columnGap) * id;
                      width = this._itemSize.width;
                    }

                    if (this.lackCenter) {
                      left -= this._leftGap;
                      let offset = this._contentUt.width / 2 - this._allItemSizeNoEdge / 2;
                      left += offset;
                    }

                    right = left + width;
                    return {
                      id: id,
                      left: left,
                      right: right,
                      x: left + this._itemTmpUt.anchorX * width,
                      y: this._itemTmp.y
                    };
                  }

                case Layout.HorizontalDirection.RIGHT_TO_LEFT:
                  {
                    if (this._customSize) {
                      let fixed = this._getFixedSize(id);

                      right = -this._rightGap - (this._itemSize.width + this._columnGap) * (id - fixed.count) - (fixed.val + this._columnGap * fixed.count);
                      let cs = this._customSize[id];
                      width = cs > 0 ? cs : this._itemSize.width;
                    } else {
                      right = -this._rightGap - (this._itemSize.width + this._columnGap) * id;
                      width = this._itemSize.width;
                    }

                    if (this.lackCenter) {
                      right += this._rightGap;
                      let offset = this._contentUt.width / 2 - this._allItemSizeNoEdge / 2;
                      right -= offset;
                    }

                    left = right - width;
                    return {
                      id: id,
                      right: right,
                      left: left,
                      x: left + this._itemTmpUt.anchorX * width,
                      y: this._itemTmp.y
                    };
                  }
              }

              break;

            case Layout.Type.VERTICAL:
              {
                switch (this._verticalDir) {
                  case Layout.VerticalDirection.TOP_TO_BOTTOM:
                    {
                      if (this._customSize) {
                        let fixed = this._getFixedSize(id);

                        top = -this._topGap - (this._itemSize.height + this._lineGap) * (id - fixed.count) - (fixed.val + this._lineGap * fixed.count);
                        let cs = this._customSize[id];
                        height = cs > 0 ? cs : this._itemSize.height;
                      } else {
                        top = -this._topGap - (this._itemSize.height + this._lineGap) * id;
                        height = this._itemSize.height;
                      }

                      if (this.lackCenter) {
                        top += this._topGap;
                        let offset = this._contentUt.height / 2 - this._allItemSizeNoEdge / 2;
                        top -= offset;
                      }

                      bottom = top - height;
                      return {
                        id: id,
                        top: top,
                        bottom: bottom,
                        x: this._itemTmp.x,
                        y: bottom + this._itemTmpUt.anchorY * height
                      };
                    }

                  case Layout.VerticalDirection.BOTTOM_TO_TOP:
                    {
                      if (this._customSize) {
                        let fixed = this._getFixedSize(id);

                        bottom = this._bottomGap + (this._itemSize.height + this._lineGap) * (id - fixed.count) + (fixed.val + this._lineGap * fixed.count);
                        let cs = this._customSize[id];
                        height = cs > 0 ? cs : this._itemSize.height;
                      } else {
                        bottom = this._bottomGap + (this._itemSize.height + this._lineGap) * id;
                        height = this._itemSize.height;
                      }

                      if (this.lackCenter) {
                        bottom -= this._bottomGap;
                        let offset = this._contentUt.height / 2 - this._allItemSizeNoEdge / 2;
                        bottom += offset;
                      }

                      top = bottom + height;
                      return {
                        id: id,
                        top: top,
                        bottom: bottom,
                        x: this._itemTmp.x,
                        y: bottom + this._itemTmpUt.anchorY * height
                      };
                      break;
                    }
                }
              }

            case Layout.Type.GRID:
              {
                let colLine = Math.floor(id / this._colLineNum);

                switch (this._startAxis) {
                  case Layout.AxisDirection.HORIZONTAL:
                    {
                      switch (this._verticalDir) {
                        case Layout.VerticalDirection.TOP_TO_BOTTOM:
                          {
                            top = -this._topGap - (this._itemSize.height + this._lineGap) * colLine;
                            bottom = top - this._itemSize.height;
                            itemY = bottom + this._itemTmpUt.anchorY * this._itemSize.height;
                            break;
                          }

                        case Layout.VerticalDirection.BOTTOM_TO_TOP:
                          {
                            bottom = this._bottomGap + (this._itemSize.height + this._lineGap) * colLine;
                            top = bottom + this._itemSize.height;
                            itemY = bottom + this._itemTmpUt.anchorY * this._itemSize.height;
                            break;
                          }
                      }

                      itemX = this._leftGap + id % this._colLineNum * (this._itemSize.width + this._columnGap);

                      switch (this._horizontalDir) {
                        case Layout.HorizontalDirection.LEFT_TO_RIGHT:
                          {
                            itemX += this._itemTmpUt.anchorX * this._itemSize.width;
                            itemX -= this._contentUt.anchorX * this._contentUt.width;
                            break;
                          }

                        case Layout.HorizontalDirection.RIGHT_TO_LEFT:
                          {
                            itemX += (1 - this._itemTmpUt.anchorX) * this._itemSize.width;
                            itemX -= (1 - this._contentUt.anchorX) * this._contentUt.width;
                            itemX *= -1;
                            break;
                          }
                      }

                      return {
                        id: id,
                        top: top,
                        bottom: bottom,
                        x: itemX,
                        y: itemY
                      };
                    }

                  case Layout.AxisDirection.VERTICAL:
                    {
                      switch (this._horizontalDir) {
                        case Layout.HorizontalDirection.LEFT_TO_RIGHT:
                          {
                            left = this._leftGap + (this._itemSize.width + this._columnGap) * colLine;
                            right = left + this._itemSize.width;
                            itemX = left + this._itemTmpUt.anchorX * this._itemSize.width;
                            itemX -= this._contentUt.anchorX * this._contentUt.width;
                            break;
                          }

                        case Layout.HorizontalDirection.RIGHT_TO_LEFT:
                          {
                            right = -this._rightGap - (this._itemSize.width + this._columnGap) * colLine;
                            left = right - this._itemSize.width;
                            itemX = left + this._itemTmpUt.anchorX * this._itemSize.width;
                            itemX += (1 - this._contentUt.anchorX) * this._contentUt.width;
                            break;
                          }
                      }

                      itemY = -this._topGap - id % this._colLineNum * (this._itemSize.height + this._lineGap);

                      switch (this._verticalDir) {
                        case Layout.VerticalDirection.TOP_TO_BOTTOM:
                          {
                            itemY -= (1 - this._itemTmpUt.anchorY) * this._itemSize.height;
                            itemY += (1 - this._contentUt.anchorY) * this._contentUt.height;
                            break;
                          }

                        case Layout.VerticalDirection.BOTTOM_TO_TOP:
                          {
                            itemY -= this._itemTmpUt.anchorY * this._itemSize.height;
                            itemY += this._contentUt.anchorY * this._contentUt.height;
                            itemY *= -1;
                            break;
                          }
                      }

                      return {
                        id: id,
                        left: left,
                        right: right,
                        x: itemX,
                        y: itemY
                      };
                    }
                }

                break;
              }
          }
        } //计算已存在的Item的位置


        _calcExistItemPos(id) {
          let item = this.getItemByListId(id);
          if (!item) return 0;
          let ut = item.getComponent(UITransform);
          let pos = item.getPosition();
          let data = {
            id: id,
            x: pos.x,
            y: pos.y
          };

          if (this._sizeType) {
            data.top = pos.y + ut.height * (1 - ut.anchorY);
            data.bottom = pos.y - ut.height * ut.anchorY;
          } else {
            data.left = pos.x - ut.width * ut.anchorX;
            data.right = pos.x + ut.width * (1 - ut.anchorX);
          }

          return data;
        } //获取Item位置


        getItemPos(id) {
          if (this._virtual) return this._calcItemPos(id);else {
            if (this.frameByFrameRenderNum) return this._calcItemPos(id);else return this._calcExistItemPos(id);
          }
        } //获取固定尺寸


        _getFixedSize(listId) {
          if (!this._customSize) return null;
          if (listId === 0) listId = this._numItems;
          let fixed = 0;
          let count = 0;

          for (let id in this._customSize) {
            if (parseInt(id) < listId) {
              fixed += this._customSize[id];
              count++;
            }
          }

          return {
            val: fixed,
            count: count
          };
        } //滚动结束时..


        _onScrollBegan() {
          this._beganPos = this._sizeType ? this.viewTop : this.viewLeft;

          if (this._slideMode === SlideType.PAGE && !this._beganPos) {
            this._beganPos = 0;
          }
        } //滚动结束时..


        _onScrollEnded() {
          let t = this;
          t._curScrollIsTouch = false;

          if (t.scrollToListId !== 0) {
            let item = t.getItemByListId(t.scrollToListId);
            t.scrollToListId = 0;

            if (item) {
              tween(item).to(0.1, {
                scale: 1.06
              }).to(0.1, {
                scale: 1
              }).start();
            }
          }

          t._onScrolling();

          if (t._slideMode == SlideType.ADHERING && !t.adhering) {
            //cc.log(t.adhering, t._scrollView.isAutoScrolling(), t._scrollView.isScrolling());
            t.adhere();
          } else if (t._slideMode == SlideType.PAGE) {
            if (t._beganPos !== 0 && t._curScrollIsTouch) {
              this._pageAdhere();
            } else {
              t.adhere();
            }
          }
        } // 触摸时


        _onTouchStart(ev, captureListeners) {
          if (this._scrollView["_hasNestedViewGroup"](ev, captureListeners)) return;
          this._curScrollIsTouch = true;
          let isMe = ev.eventPhase === Event.AT_TARGET && ev.target === this.node;

          if (!isMe) {
            let itemNode = ev.target;

            while (itemNode._listId === 0 && itemNode.parent) itemNode = itemNode.parent;

            this._scrollItem = itemNode._listId !== 0 ? itemNode : ev.target;
          }
        } //触摸抬起时..


        _onTouchUp() {
          let t = this;
          t._scrollPos = 0;

          if (t._slideMode == SlideType.ADHERING) {
            if (this.adhering) this._adheringBarrier = true;
            t.adhere();
          } else if (t._slideMode == SlideType.PAGE) {
            if (t._beganPos !== 0) {
              this._pageAdhere();
            } else {
              t.adhere();
            }
          }

          this._scrollItem = null;
        }

        _onTouchCancelled(ev, captureListeners) {
          let t = this;
          if (t._scrollView["_hasNestedViewGroup"](ev, captureListeners) || ev.simulate) return;
          t._scrollPos = 0;

          if (t._slideMode == SlideType.ADHERING) {
            if (t.adhering) t._adheringBarrier = true;
            t.adhere();
          } else if (t._slideMode == SlideType.PAGE) {
            if (t._beganPos !== 0) {
              t._pageAdhere();
            } else {
              t.adhere();
            }
          }

          this._scrollItem = null;
        } //当尺寸改变


        _onSizeChanged() {
          if (this.checkInited(false)) this._onScrolling();
        } //当Item自适应


        _onItemAdaptive(item) {
          let ut = item.getComponent(UITransform); // if (this.checkInited(false)) {

          if (!this._sizeType && ut.width != this._itemSize.width || this._sizeType && ut.height != this._itemSize.height) {
            if (!this._customSize) this._customSize = {};
            let val = this._sizeType ? ut.height : ut.width;

            if (this._customSize[item._listId] != val) {
              this._customSize[item._listId] = val;

              this._resizeContent(); // this.content.children.forEach((child: Node) => {
              //     this._updateItemPos(child);
              // });


              this.updateAll(); // 如果当前正在运行 scrollTo，肯定会不准确，在这里做修正

              if (this._scrollToListId !== 0) {
                this._scrollPos = 0;
                this.unschedule(this._scrollToSo);
                this.scrollTo(this._scrollToListId, Math.max(0, this._scrollToEndTime - new Date().getTime() / 1000));
              }
            }
          } // }

        } //PAGE粘附


        _pageAdhere() {
          let t = this;
          if (!t.cyclic && (t.elasticTop > 0 || t.elasticRight > 0 || t.elasticBottom > 0 || t.elasticLeft > 0)) return;
          let curPos = t._sizeType ? t.viewTop : t.viewLeft;
          let dis = (t._sizeType ? t._thisNodeUt.height : t._thisNodeUt.width) * t.pageDistance;
          let canSkip = Math.abs(t._beganPos - curPos) > dis;

          if (canSkip) {
            let timeInSecond = 0.5;

            switch (t._alignCalcType) {
              case 1: //单行HORIZONTAL（LEFT_TO_RIGHT）、网格VERTICAL（LEFT_TO_RIGHT）

              case 4:
                //单列VERTICAL（BOTTOM_TO_TOP）、网格HORIZONTAL（BOTTOM_TO_TOP）
                if (t._beganPos > curPos) {
                  t.prePage(timeInSecond); // cc.log('_pageAdhere   PPPPPPPPPPPPPPP');
                } else {
                  t.nextPage(timeInSecond); // cc.log('_pageAdhere   NNNNNNNNNNNNNNN');
                }

                break;

              case 2: //单行HORIZONTAL（RIGHT_TO_LEFT）、网格VERTICAL（RIGHT_TO_LEFT）

              case 3:
                //单列VERTICAL（TOP_TO_BOTTOM）、网格HORIZONTAL（TOP_TO_BOTTOM）
                if (t._beganPos < curPos) {
                  t.prePage(timeInSecond);
                } else {
                  t.nextPage(timeInSecond);
                }

                break;
            }
          } else if (t.elasticTop <= 0 && t.elasticRight <= 0 && t.elasticBottom <= 0 && t.elasticLeft <= 0) {
            t.adhere();
          }

          t._beganPos = 0;
        } //粘附


        adhere() {
          let t = this;
          if (!t.checkInited()) return;
          if (t.elasticTop > 0 || t.elasticRight > 0 || t.elasticBottom > 0 || t.elasticLeft > 0) return;
          t.adhering = true;

          t._calcNearestItem();

          let offset = (t._sizeType ? t._topGap : t._leftGap) / (t._sizeType ? t._thisNodeUt.height : t._thisNodeUt.width);
          let timeInSecond = 0.7;
          t.scrollTo(t.nearestListId, timeInSecond, offset);
        } //Update..


        update() {
          if (this.frameByFrameRenderNum <= 0 || this._updateDone) return; // cc.log(this.displayData.length, this._updateCounter, this.displayData[this._updateCounter]);

          if (this._virtual) {
            let len = this._updateCounter + this.frameByFrameRenderNum > this.displayItemNum ? this.displayItemNum : this._updateCounter + this.frameByFrameRenderNum;

            for (let n = this._updateCounter; n < len; n++) {
              let data = this.displayData[n];

              if (data) {
                this._createOrUpdateItem(data, this._showAnimation);
              }
            }

            if (this._updateCounter >= this.displayItemNum - 1) {
              //最后一个
              if (this._doneAfterUpdate) {
                this._updateCounter = 0;
                this._updateDone = false; // if (!this._scrollView.isScrolling())

                this._doneAfterUpdate = false;
              } else {
                this._updateDone = true;

                this._delRedundantItem();

                this._forceUpdate = false;

                this._calcNearestItem();

                if (this.slideMode == SlideType.PAGE) this.curPageNum = this.nearestListId;
              }
            } else {
              this._updateCounter += this.frameByFrameRenderNum;
            }
          } else {
            if (this._updateCounter < this._numItems) {
              let len = this._updateCounter + this.frameByFrameRenderNum > this._numItems ? this._numItems : this._updateCounter + this.frameByFrameRenderNum;

              for (let n = this._updateCounter; n < len; n++) {
                this._createOrUpdateItem2(n);
              }

              this._updateCounter += this.frameByFrameRenderNum;
            } else {
              this._updateDone = true;

              this._calcNearestItem();

              if (this.slideMode == SlideType.PAGE) this.curPageNum = this.nearestListId;
            }
          }
        }
        /**
         * 创建或更新Item（虚拟列表用）
         * @param {Object} data 数据
         * @param animate 是否派发播放初始化动画 事件
         */


        _createOrUpdateItem(data, animate) {
          let item = this.getItemByListId(data.id),
              elementList = [];

          if (!item) {
            //如果不存在
            let canGet = this._mainPool.size() > 0;

            if (canGet) {
              item = this._mainPool.get();

              this._poolList.forEach((pool, index) => {
                let element = pool.get();
                elementList.push(element);
              });

              if (!isValid(item)) {
                item = instantiate(this._itemTmp);
                let component = item.getComponent(_crd && ScrollListItem === void 0 ? (_reportPossibleCrUseOfScrollListItem({
                  error: Error()
                }), ScrollListItem) : ScrollListItem);
                component.layerNodeList.forEach((node, index) => {
                  node.posV3 = node.position.clone();
                  elementList.push(node);
                });
              }
            } else {
              item = instantiate(this._itemTmp);
              let component = item.getComponent(_crd && ScrollListItem === void 0 ? (_reportPossibleCrUseOfScrollListItem({
                error: Error()
              }), ScrollListItem) : ScrollListItem);
              component.layerNodeList.forEach((node, index) => {
                node.posV3 = node.position.clone();
                elementList.push(node);
              });
            }

            if (item._listId !== data.id) {
              item._listId = data.id;
              elementList.forEach((element, index) => {
                element._listId = data.id;
              });
              let ut = item.getComponent(UITransform);
              ut.setContentSize(this._itemSize);
            }

            const vec3Point = new Vec3(data.x, data.y, 0);
            item.setPosition(vec3Point);
            elementList.forEach((element, index) => {
              const pos = element.posV3.clone().add(vec3Point);
              element.setPosition(pos);
            });

            this._resetItemSize(item);

            this.content.addChild(item);
            elementList.forEach((element, index) => {
              element.parent = this._contentList[index];
            });

            if (this._needUpdateWidget) {
              let widget = item.getComponent(Widget);
              if (widget) widget.updateAlignment();
            }

            item.setSiblingIndex(this.content.children.length - 1);
            let listItem = item.getComponent(_crd && ScrollListItem === void 0 ? (_reportPossibleCrUseOfScrollListItem({
              error: Error()
            }), ScrollListItem) : ScrollListItem);
            item["listItem"] = listItem;

            if (listItem) {
              listItem.listId = data.id;
              listItem.list = this;

              listItem._registerEvent();
            }

            if (this.renderEvent) {
              EventHandler.emitEvents([this.renderEvent], item, data.id % this._actualNumItems);
            }
          } else if (this._forceUpdate && this.renderEvent) {
            //强制更新
            item.setPosition(new Vec3(data.x, data.y, 0));

            this._resetItemSize(item); // cc.log('ADD::', data.id, item);


            if (this.renderEvent) {
              EventHandler.emitEvents([this.renderEvent], item, data.id % this._actualNumItems);
            }
          }

          this._resetItemSize(item);

          this._updateListItem(item["listItem"]);

          if (this._lastDisplayData.indexOf(data.id) < 0) {
            this._lastDisplayData.push(data.id);
          }

          if (animate && this.animationEvent) {
            EventHandler.emitEvents([this.animationEvent], item, data.id % this._actualNumItems);
          }
        } //创建或更新Item（非虚拟列表用）


        _createOrUpdateItem2(listId) {
          let item = this.content.children[listId],
              elementList = [];
          let listItem;

          if (!item) {
            //如果不存在
            item = instantiate(this._itemTmp);
            let component = item.getComponent(_crd && ScrollListItem === void 0 ? (_reportPossibleCrUseOfScrollListItem({
              error: Error()
            }), ScrollListItem) : ScrollListItem);
            component.layerNodeList.forEach((node, index) => {
              node.posV3 = node.position.clone();
              elementList.push(node);
            });
            item._listId = listId;
            this.content.addChild(item);
            elementList.forEach((element, index) => {
              element._listId = listId;
              element.parent = this._contentList[index];
            });
            listItem = item.getComponent(_crd && ScrollListItem === void 0 ? (_reportPossibleCrUseOfScrollListItem({
              error: Error()
            }), ScrollListItem) : ScrollListItem);
            item["listItem"] = listItem;

            if (listItem) {
              listItem.listId = listId;
              listItem.list = this;

              listItem._registerEvent();
            }

            if (this.renderEvent) {
              EventHandler.emitEvents([this.renderEvent], item, listId % this._actualNumItems);
            }
          } else if (this._forceUpdate && this.renderEvent) {
            //强制更新
            item._listId = listId;
            elementList.forEach((element, index) => {
              element._listId = listId;
              element.parent = this._contentList[index];
            });
            if (listItem) listItem.listId = listId;

            if (this.renderEvent) {
              EventHandler.emitEvents([this.renderEvent], item, listId % this._actualNumItems);
            }
          }

          this._updateListItem(listItem);

          if (this._lastDisplayData.indexOf(listId) < 0) {
            this._lastDisplayData.push(listId);
          }
        }

        _updateListItem(listItem) {
          if (!listItem) return;

          if (this.selectedMode > SelectedType.NONE) {
            let item = listItem.node;

            switch (this.selectedMode) {
              case SelectedType.SINGLE:
                listItem.selected = this.selectedId == item._listId;
                break;

              case SelectedType.MULT:
                listItem.selected = this.multSelected.indexOf(item._listId) >= 0;
                break;
            }
          }
        } //仅虚拟列表用


        _resetItemSize(item) {
          // return;
          let size;
          let ut = item.getComponent(UITransform);

          if (this._customSize && this._customSize[item._listId]) {
            size = this._customSize[item._listId];
          } else {
            if (this._colLineNum > 1) ut.setContentSize(this._itemSize);else size = this._sizeType ? this._itemSize.height : this._itemSize.width;
          }

          if (size) {
            if (this._sizeType) ut.height = size;else ut.width = size;
          }
        }
        /**
         * 更新Item位置
         * @param {Number||Node} listIdOrItem
         */


        _updateItemPos(listIdOrItem) {
          let item = isNaN(listIdOrItem) ? listIdOrItem : this.getItemByListId(listIdOrItem);
          let pos = this.getItemPos(item._listId);
          item.setPosition(pos.x, pos.y);
        }
        /**
         * 设置多选
         * @param {Array} args 可以是单个listId，也可是个listId数组
         * @param {Boolean} bool 值，如果为null的话，则直接用args覆盖
         */


        setMultSelected(args, bool) {
          let t = this;
          if (!t.checkInited()) return;

          if (!Array.isArray(args)) {
            args = [args];
          }

          if (bool === false) {
            t.multSelected = args;
          } else {
            let listId, sub;

            if (bool) {
              for (let n = args.length - 1; n >= 0; n--) {
                listId = args[n];
                sub = t.multSelected.indexOf(listId);

                if (sub < 0) {
                  t.multSelected.push(listId);
                }
              }
            } else {
              for (let n = args.length - 1; n >= 0; n--) {
                listId = args[n];
                sub = t.multSelected.indexOf(listId);

                if (sub >= 0) {
                  t.multSelected.splice(sub, 1);
                }
              }
            }
          }

          t._forceUpdate = true;

          t._onScrolling();
        }
        /**
         * 获取多选数据
         * @returns
         */


        getMultSelected() {
          return this.multSelected;
        }
        /**
         * 多选是否有选择
         * @param {number} listId 索引
         * @returns
         */


        hasMultSelected(listId) {
          return this.multSelected && this.multSelected.indexOf(listId) >= 0;
        }
        /**
         * 更新指定的Item
         * @param {Array} args 单个listId，或者数组
         * @returns
         */


        updateItem(args) {
          if (!this.checkInited()) return;

          if (!Array.isArray(args)) {
            args = [args];
          }

          for (let n = 0, len = args.length; n < len; n++) {
            let listId = args[n];
            let item = this.getItemByListId(listId);
            if (item) EventHandler.emitEvents([this.renderEvent], item, listId % this._actualNumItems);
          }
        }
        /**
         * 更新全部
         */


        updateAll() {
          if (!this.checkInited()) return;
          this.numItems = this.numItems;
        }
        /**
         * 根据ListID获取Item
         * @param {Number} listId
         * @param content
         * @returns
         */


        getItemByListId(listId, content) {
          content = content || this.content;

          if (content) {
            for (let n = content.children.length - 1; n >= 0; n--) {
              let item = content.children[n];
              if (item._listId === listId) return item;
            }
          }
        }
        /**
         * 获取在显示区域外的Item
         * @returns
         */


        _getOutsideItem(content) {
          content = content || this.content;
          let item;
          let result = [];

          for (let n = content.children.length - 1; n >= 0; n--) {
            item = content.children[n];

            if (!this.displayData.find(d => d.id === item._listId)) {
              result.push(item);
            }
          }

          return result;
        } //删除显示区域以外的Item


        _delRedundantItem() {
          if (this._virtual) {
            let arr = this._getOutsideItem();

            for (let n = arr.length - 1; n >= 0; n--) {
              let item = arr[n];
              if (this._scrollItem && item._listId === this._scrollItem._listId) continue;
              item.isCached = true;

              this._mainPool.put(item);

              for (let m = this._lastDisplayData.length - 1; m >= 0; m--) {
                if (this._lastDisplayData[m] === item._listId) {
                  this._lastDisplayData.splice(m, 1);

                  break;
                }
              }
            }

            this._contentList.forEach((content, index) => {
              let arr = this._getOutsideItem(content);

              for (let n = arr.length - 1; n >= 0; n--) {
                let item = arr[n];
                if (this._scrollItem && item._listId === this._scrollItem._listId) continue;

                this._poolList[index].put(item);
              }
            });
          } else {
            while (this.content.children.length > this._numItems) {
              this._delSingleItem(this.content.children[this.content.children.length - 1]);
            }

            this._contentList.forEach((content, index) => {
              while (content.children.length > this._numItems) {
                this._delSingleItem(content.children[content.children.length - 1]);
              }
            });
          }
        } //删除单个Item


        _delSingleItem(item) {
          // cc.log('DEL::', item['_listId'], item);
          item.removeFromParent();
          if (item.destroy) item.destroy();
          item = null;
        }
        /**
         * 动效删除Item（此方法只适用于虚拟列表，即_virtual=true）
         * 一定要在回调函数里重新设置新的numItems进行刷新，毕竟本List是靠数据驱动的。
         */


        aniDelItem(listId, callFunc, aniType) {
          let t = this;
          if (!t.checkInited() || t.cyclic || !t._virtual) return console.error("This function is not allowed to be called!");
          if (!callFunc) return console.error("CallFunc are not allowed to be NULL, You need to delete the corresponding index in the data array in the CallFunc!");
          if (t._aniDelRuning) return console.warn("Please wait for the current deletion to finish!");
          let item = t.getItemByListId(listId);
          let listItem;

          if (!item) {
            callFunc(listId);
            return;
          } else {
            listItem = item.getComponent(_crd && ScrollListItem === void 0 ? (_reportPossibleCrUseOfScrollListItem({
              error: Error()
            }), ScrollListItem) : ScrollListItem);
          }

          t._aniDelRuning = true;
          t._aniDelCB = callFunc;
          t._aniDelItem = item;
          t._aniDelBeforePos = item.position;
          t._aniDelBeforeScale = item.scale;
          let curLastId = t.displayData[t.displayData.length - 1].id;
          let resetSelectedId = listItem.selected;
          listItem.showAni(aniType, () => {
            //判断有没有下一个，如果有的话，创建粗来
            let newId;

            if (curLastId < t._numItems - 2) {
              newId = curLastId + 1;
            }

            if (newId !== 0) {
              let newData = t._calcItemPos(newId);

              t.displayData.push(newData);
              if (t._virtual) t._createOrUpdateItem(newData, t._showAnimation);else t._createOrUpdateItem2(newId);
            } else t._numItems--;

            if (t.selectedMode == SelectedType.SINGLE) {
              if (resetSelectedId) {
                t._selectedId = -1;
              } else if (t._selectedId - 1 >= 0) {
                t._selectedId--;
              }
            } else if (t.selectedMode == SelectedType.MULT && t.multSelected.length) {
              let sub = t.multSelected.indexOf(listId);

              if (sub >= 0) {
                t.multSelected.splice(sub, 1);
              } //多选的数据，在其后的全部减一


              for (let n = t.multSelected.length - 1; n >= 0; n--) {
                let id = t.multSelected[n];
                if (id >= listId) t.multSelected[n]--;
              }
            }

            if (t._customSize) {
              if (t._customSize[listId]) delete t._customSize[listId];
              let newCustomSize = {};
              let size;

              for (let id in t._customSize) {
                size = t._customSize[id];
                let idNumber = parseInt(id);
                newCustomSize[idNumber - (idNumber >= listId ? 1 : 0)] = size;
              }

              t._customSize = newCustomSize;
            } //后面的Item向前怼的动效


            let sec = 0.2333;
            let twe, haveCB;

            for (let n = newId !== 0 ? newId : curLastId; n >= listId + 1; n--) {
              item = t.getItemByListId(n);

              if (item) {
                let posData = t._calcItemPos(n - 1);

                twe = tween(item).to(sec, {
                  position: new Vec3(posData.x, posData.y, 0)
                });

                if (n <= listId + 1) {
                  haveCB = true;
                  twe.call(() => {
                    t._aniDelRuning = false;
                    callFunc(listId);
                    delete t._aniDelCB;
                  });
                }

                twe.start();
              }
            }

            if (!haveCB) {
              t._aniDelRuning = false;
              callFunc(listId);
              t._aniDelCB = null;
            }
          }, true);
        }
        /**
         * 滚动到..
         * @param {Number} listId 索引（如果<0，则滚到首个Item位置，如果>=_numItems，则滚到最末Item位置）
         * @param {Number} timeInSecond 时间
         * @param {Number} offset 索引目标位置偏移，0-1
         * @param {Boolean} overStress 滚动后是否强调该Item（这只是个实验功能）
         */


        scrollTo(listId, timeInSecond = 0.5, offset = 0, overStress = false) {
          let t = this;
          if (!t.checkInited(false)) return; // t._scrollView.stopAutoScroll();

          if (timeInSecond === 0) //默认0.5
            timeInSecond = 0.5;else if (timeInSecond < 0) timeInSecond = 0;
          if (listId < 0) listId = 0;else if (listId >= t._numItems) listId = t._numItems - 1; // 以防设置了numItems之后layout的尺寸还未更新

          if (!t._virtual && t._layout && t._layout.enabled) t._layout.updateLayout();
          let pos = t.getItemPos(listId);

          if (!pos) {
            return DEV && console.error("pos is null", listId);
          }

          let targetX, targetY;

          switch (t._alignCalcType) {
            case 1:
              //单行HORIZONTAL（LEFT_TO_RIGHT）、网格VERTICAL（LEFT_TO_RIGHT）
              targetX = pos.left;
              if (offset !== 0) targetX -= t._thisNodeUt.width * offset;else targetX -= t._leftGap;
              pos = new Vec3(targetX, 0, 0);
              break;

            case 2:
              //单行HORIZONTAL（RIGHT_TO_LEFT）、网格VERTICAL（RIGHT_TO_LEFT）
              targetX = pos.right - t._thisNodeUt.width;
              if (offset !== 0) targetX += t._thisNodeUt.width * offset;else targetX += t._rightGap;
              pos = new Vec3(targetX + t._contentUt.width, 0, 0);
              break;

            case 3:
              //单列VERTICAL（TOP_TO_BOTTOM）、网格HORIZONTAL（TOP_TO_BOTTOM）
              targetY = pos.top;
              if (offset !== 0) targetY += t._thisNodeUt.height * offset;else targetY += t._topGap;
              pos = new Vec3(0, -targetY, 0);
              break;

            case 4:
              //单列VERTICAL（BOTTOM_TO_TOP）、网格HORIZONTAL（BOTTOM_TO_TOP）
              targetY = pos.bottom + t._thisNodeUt.height;
              if (offset !== 0) targetY -= t._thisNodeUt.height * offset;else targetY -= t._bottomGap;
              pos = new Vec3(0, -targetY + t._contentUt.height, 0);
              break;
          }

          let viewPos = t.content.getPosition();
          viewPos = Math.abs(t._sizeType ? viewPos.y : viewPos.x);
          let comparePos = t._sizeType ? pos.y : pos.x;
          let runScroll = Math.abs((t._scrollPos !== 0 ? t._scrollPos : viewPos) - comparePos) > 0.5; // cc.log(runScroll, t._scrollPos, viewPos, comparePos)
          // t._scrollView.stopAutoScroll();

          if (runScroll) {
            t._scrollView.scrollToOffset(pos, timeInSecond);

            t._scrollToListId = listId;
            t._scrollToEndTime = new Date().getTime() / 1000 + timeInSecond; // cc.log(listId, t.content.width, t.content.getPosition(), pos);

            t._scrollToSo = t.scheduleOnce(() => {
              if (!t._adheringBarrier) {
                t.adhering = t._adheringBarrier = false;
              }

              t._scrollPos = t._scrollToListId = t._scrollToEndTime = t._scrollToSo = 0; //cc.log('2222222222', t._adheringBarrier)

              if (overStress) {
                // t.scrollToListId = listId;
                let item = t.getItemByListId(listId);

                if (item) {
                  tween(item).to(0.1, {
                    scale: 1.05
                  }).to(0.1, {
                    scale: 1
                  }).start();
                }
              }
            }, timeInSecond + 0.1);

            if (timeInSecond <= 0) {
              t._onScrolling();
            }
          }
        }
        /**
         * 计算当前滚动窗最近的Item
         */


        _calcNearestItem() {
          let t = this;
          t.nearestListId = 0;
          let data, center;
          if (t._virtual) t._calcViewPos();
          let vTop, vRight, vBottom, vLeft;
          vTop = t.viewTop;
          vRight = t.viewRight;
          vBottom = t.viewBottom;
          vLeft = t.viewLeft;
          let breakFor = false;

          for (let n = 0; n < t.content.children.length && !breakFor; n += t._colLineNum) {
            data = t._virtual ? t.displayData[n] : t._calcExistItemPos(n);

            if (data) {
              center = t._sizeType ? (data.top + data.bottom) / 2 : center = (data.left + data.right) / 2;

              switch (t._alignCalcType) {
                case 1:
                  //单行HORIZONTAL（LEFT_TO_RIGHT）、网格VERTICAL（LEFT_TO_RIGHT）
                  if (data.right >= vLeft) {
                    t.nearestListId = data.id;
                    if (vLeft > center) t.nearestListId += t._colLineNum;
                    breakFor = true;
                  }

                  break;

                case 2:
                  //单行HORIZONTAL（RIGHT_TO_LEFT）、网格VERTICAL（RIGHT_TO_LEFT）
                  if (data.left <= vRight) {
                    t.nearestListId = data.id;
                    if (vRight < center) t.nearestListId += t._colLineNum;
                    breakFor = true;
                  }

                  break;

                case 3:
                  //单列VERTICAL（TOP_TO_BOTTOM）、网格HORIZONTAL（TOP_TO_BOTTOM）
                  if (data.bottom <= vTop) {
                    t.nearestListId = data.id;
                    if (vTop < center) t.nearestListId += t._colLineNum;
                    breakFor = true;
                  }

                  break;

                case 4:
                  //单列VERTICAL（BOTTOM_TO_TOP）、网格HORIZONTAL（BOTTOM_TO_TOP）
                  if (data.top >= vBottom) {
                    t.nearestListId = data.id;
                    if (vBottom > center) t.nearestListId += t._colLineNum;
                    breakFor = true;
                  }

                  break;
              }
            }
          } //判断最后一个Item。。。（哎，这些判断真心恶心，判断了前面的还要判断最后一个。。。一开始呢，就只有一个布局（单列布局），那时候代码才三百行，后来就想着完善啊，艹..这坑真深，现在这行数都一千五了= =||）


          data = t._virtual ? t.displayData[t.displayItemNum - 1] : t._calcExistItemPos(t._numItems - 1);

          if (data && data.id == t._numItems - 1) {
            center = t._sizeType ? (data.top + data.bottom) / 2 : center = (data.left + data.right) / 2;

            switch (t._alignCalcType) {
              case 1:
                //单行HORIZONTAL（LEFT_TO_RIGHT）、网格VERTICAL（LEFT_TO_RIGHT）
                if (vRight > center) t.nearestListId = data.id;
                break;

              case 2:
                //单行HORIZONTAL（RIGHT_TO_LEFT）、网格VERTICAL（RIGHT_TO_LEFT）
                if (vLeft < center) t.nearestListId = data.id;
                break;

              case 3:
                //单列VERTICAL（TOP_TO_BOTTOM）、网格HORIZONTAL（TOP_TO_BOTTOM）
                if (vBottom < center) t.nearestListId = data.id;
                break;

              case 4:
                //单列VERTICAL（BOTTOM_TO_TOP）、网格HORIZONTAL（BOTTOM_TO_TOP）
                if (vTop > center) t.nearestListId = data.id;
                break;
            }
          } // cc.log('t.nearestListId =', t.nearestListId);

        } //上一页


        prePage(timeInSecond = 0.5) {
          // cc.log('👈');
          if (!this.checkInited()) return;
          this.skipPage(this.curPageNum - 1, timeInSecond);
        } //下一页


        nextPage(timeInSecond = 0.5) {
          // cc.log('👉');
          if (!this.checkInited()) return;
          this.skipPage(this.curPageNum + 1, timeInSecond);
        } //跳转到第几页


        skipPage(pageNum, timeInSecond) {
          let t = this;
          if (!t.checkInited()) return;
          if (t._slideMode != SlideType.PAGE) return console.error("This function is not allowed to be called, Must SlideMode = PAGE!");
          if (pageNum < 0 || pageNum >= t._numItems) return;
          if (t.curPageNum == pageNum) return; // cc.log(pageNum);

          t.curPageNum = pageNum;

          if (t.pageChangeEvent) {
            EventHandler.emitEvents([t.pageChangeEvent], pageNum);
          }

          t.scrollTo(pageNum, timeInSecond);
        } //计算 CustomSize（这个函数还是保留吧，某些罕见的情况的确还是需要手动计算customSize的）


        calcCustomSize(numItems) {
          let t = this;
          if (!t.checkInited()) return;
          if (!t._itemTmp) return console.error("Unset template item!");
          if (!t.renderEvent) return console.error("Unset Render-Event!");
          t._customSize = {};
          let temp = instantiate(t._itemTmp);
          let ut = temp.getComponent(UITransform);
          t.content.addChild(temp);

          for (let n = 0; n < numItems; n++) {
            EventHandler.emitEvents([t.renderEvent], temp, n);

            if (ut.height != t._itemSize.height || ut.width != t._itemSize.width) {
              t._customSize[n] = t._sizeType ? ut.height : ut.width;
            }
          }

          if (!Object.keys(t._customSize).length) t._customSize = null;
          temp.removeFromParent();
          if (temp.destroy) temp.destroy();
          return t._customSize;
        }

      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "contentLayerType", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return LayerType.NONE;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "tmpNode", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "tmpPrefab", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "pageDistance", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0.3;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "cyclic", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return false;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "lackCenter", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return false;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "lackSlide", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return false;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "frameByFrameRenderNum", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "renderEvent", [_dec13], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return new EventHandler();
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "selectedMode", [_dec14], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return SelectedType.NONE;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "selectedEvent", [_dec15], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return new EventHandler();
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "repeatEventSingle", [_dec16], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return false;
        }
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "canTouchCancel", [_dec17], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return false;
        }
      }), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "templateType", [_dec18], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return TemplateType.NODE;
        }
      }), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "pageChangeEvent", [_dec19], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return new EventHandler();
        }
      }), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "animationEvent", [_dec20], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return new EventHandler();
        }
      }), _descriptor17 = _applyDecoratedDescriptor(_class2.prototype, "_slideMode", [_dec21], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return SlideType.NORMAL;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "slideMode", [_dec22], Object.getOwnPropertyDescriptor(_class2.prototype, "slideMode"), _class2.prototype), _descriptor18 = _applyDecoratedDescriptor(_class2.prototype, "_virtual", [_dec23], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return true;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "virtual", [_dec24], Object.getOwnPropertyDescriptor(_class2.prototype, "virtual"), _class2.prototype), _descriptor19 = _applyDecoratedDescriptor(_class2.prototype, "_updateRate", [_dec25], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "updateRate", [_dec26], Object.getOwnPropertyDescriptor(_class2.prototype, "updateRate"), _class2.prototype), _descriptor20 = _applyDecoratedDescriptor(_class2.prototype, "_numItems", [_dec27], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0;
        }
      })), _class2)) || _class) || _class) || _class) || _class) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=ScrollList.js.map