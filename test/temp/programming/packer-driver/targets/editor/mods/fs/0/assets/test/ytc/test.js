System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Component, Node, Label, ScrollList, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp, _crd, ccclass, property, test;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfScrollList(extras) {
    _reporterNs.report("ScrollList", "../src/common/base/ui/ScrollList", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Node = _cc.Node;
      Label = _cc.Label;
    }, function (_unresolved_2) {
      ScrollList = _unresolved_2.default;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "ccd047W/CVPxIqp/2Ul8eYV", "test", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      _export("default", test = (_dec = ccclass("test"), _dec2 = property(_crd && ScrollList === void 0 ? (_reportPossibleCrUseOfScrollList({
        error: Error()
      }), ScrollList) : ScrollList), _dec3 = property(Node), _dec4 = property(Label), _dec(_class = (_class2 = (_temp = class test extends Component {
        constructor(...args) {
          super(...args);

          _defineProperty(this, "baseBundle", void 0);

          _initializerDefineProperty(this, "ScrollList", _descriptor, this);

          _initializerDefineProperty(this, "dialog", _descriptor2, this);

          _initializerDefineProperty(this, "label", _descriptor3, this);

          _defineProperty(this, "shareLabelInfo", void 0);
        }

        onLoad() {
          this.ScrollList.numItems = 100;
          this.scheduleOnce(() => {
            this.label.string = "此时是两秒后的文字更改";
          }, 2);
        }

        onEventStart(event) {
          console.log("开始提示");
          let posUI = event.getUILocation();
          let arg = {
            id: "41001",
            defaultWidth: 200,
            fontSize: 20,
            duration: 3
          }; // LabelToast.show(posUI, arg);
        }

        onEventMove(event) {}

        onEventCancel(event) {}

        onEventEnd(event) {}

        onClickShow(data) {// this.labelTest.show();
        }

        onClickHide(data) {
          console.log("data:", data);
        }

        showDialog() {
          this.ScrollList.numItems = 100; // this.label.string = "撒西安市潇洒献爱心鞍山西安属性鞍山西安市新撒西安属性鞍山西安市新撒虚弱拜访别人果然个人股宝宝贝贝干饭";

          this.dialog.active = true;
        }

        hideDialog() {
          this.ScrollList.numItems = 0; // // this.label.string = "";
          // this.shareLabelInfo.fontAtlas.reset();
          // this.label.string = "char清楚了";

          this.dialog.active = false;
        }

      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "ScrollList", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "dialog", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "label", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=test.js.map