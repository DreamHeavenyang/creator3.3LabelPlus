System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _decorator, Component, Label, _dec, _dec2, _class, _class2, _descriptor, _temp, _crd, ccclass, property, UpdateText;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Label = _cc.Label;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "3a0f12mBu9NVYgNXbCHAvZg", "UpdateText", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      _export("UpdateText", UpdateText = (_dec = ccclass("UpdateText"), _dec2 = property({
        type: Label
      }), _dec(_class = (_class2 = (_temp = class UpdateText extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "_label", _descriptor, this);

          _defineProperty(this, "_deltaTime", 0);
        }

        start() {// let mapYangtianchao:Map<number, number> =new  Map();
          // this._label = this.node.getChildByName("_label").getComponent(Label);
          // let shareLabelInfo = LabelPlus.Assembler.getAssembler(this._label)._getShareLabelInfo();
          // this.scheduleOnce(() => {
          // 	console.log(shareLabelInfo); //.fontAtlas.clearAllCache()
          // }, 1);
          // this.scheduleOnce(() => {
          // 	// this._label.string = "";
          // 	shareLabelInfo.fontAtlas.reset();
          // 	console.log(shareLabelInfo.fontAtlas._nextY, shareLabelInfo.fontAtlas._x, shareLabelInfo.fontAtlas._y); //.fontAtlas.clearAllCache()
          // }, 2);
          // this.scheduleOnce(() => {
          // 	this._label.string = "saxsaxasxasxasxasxasxasxasx";
          // }, 3);
          // this.scheduleOnce(() => {
          // 	this._label.string = "";
          // 	shareLabelInfo.fontAtlas.reset();
          // 	console.log(shareLabelInfo.fontAtlas._nextY, shareLabelInfo.fontAtlas._x, shareLabelInfo.fontAtlas._y); //.fontAtlas.clearAllCache()
          // }, 5);
          // this.scheduleOnce(() => {
          // 	this._label.string = "这是另一个文本，请看一下";
          // }, 7);
          // console.log(this._label.color.a);
          // this._label.color = new Color(255,255,255,122)
          // console.log(this._label.color.a);   updateRenderData
          // [3]
        }

        update(dt) {// if (this._deltaTime > 5) return;
          // console.log(this._deltaTime);
          // this._deltaTime += dt;
          // this._label.string = text_list[Math.floor(this._deltaTime % 4)];
          // this._label.fontSize = Math.floor(Math.random() * 20 + 10);
          // this._label.color = color(Math.random() * 255, Math.random() * 255, Math.random() * 255, 255);
        }

        onClickThis(event) {
          console.log(event);
        }

      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_label", [_dec2], {
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
//# sourceMappingURL=UpdateText.js.map