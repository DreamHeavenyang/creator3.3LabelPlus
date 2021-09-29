/******************************************
 * @author kL <klk0@qq.com>
 * @date 2019/12/9
 * @doc 列表Item组件.
 * 说明：
 *      1、此组件须配合List组件使用。（配套的配套的..）
 * @end
 ******************************************/
 const {ccclass, property, disallowMultiple, menu, executionOrder} = _decorator;
 import {
     _decorator,
     Button,
     Component,
     Enum,
     EventHandler,
     Node,
     Sprite,
     SpriteFrame,
     tween,
     Tween,
     UITransform,
     Vec3
 } from 'cc';
 import {DEV} from 'cc/env';
 import ScrollList from './ScrollList';
 enum LayerType {
     /** 不分层 */
     NONE,
     /** 分层 */
     SLICE,
 }
 enum SelectedType {
     NONE = 0,
     TOGGLE = 1,
     SWITCH = 2,
 }

 @ccclass
 @disallowMultiple()
 @menu('组件库/ScrollListItem')
 @executionOrder(-5001)          //先于List
 export default class ScrollListItem extends Component {
     @property({ type: Enum(LayerType), tooltip: "是否分层渲染" })
     public contentLayerType: LayerType = LayerType.NONE;
     @property({
         type: [Node],
         tooltip: "列表除主容器外的其他容器\n需要分层显示时使用，一般用于降低draw call",
         visible() {
             return this.contentLayerType === LayerType.SLICE;
         },
     })
     public layerNodeList: Node[] = [];
     //选择模式
     @property({
         type: Enum(SelectedType),
         tooltip: DEV && '选择模式'
     })
     selectedMode: SelectedType = SelectedType.NONE;
     //被选标志
     @property({
         type: Node, tooltip: DEV && '被选标识',
         visible() {
             return this.selectedMode > SelectedType.NONE;
         }
     })
     selectedFlag: Node = null;
     //被选择的SpriteFrame
     @property({
         type: SpriteFrame, tooltip: DEV && '被选择的SpriteFrame',
         visible() {
             return this.selectedMode == SelectedType.SWITCH;
         }
     })
     selectedSpriteFrame: SpriteFrame = null!;
     //未被选择的SpriteFrame
     _unselectedSpriteFrame: SpriteFrame = null!;
     //自适应尺寸
     @property({
         tooltip: DEV && '自适应尺寸（宽或高）',
     })
     adaptiveSize: boolean = false;
     //依赖的List组件
     public list: ScrollList;
     //序列id
     public listId: number;
     //是否已经注册过事件
     private _eventReg = false;
 
     //选择
     _selected: boolean = false;
 
     get selected() {
         return this._selected;
     }
 
     set selected(val: boolean) {
         this._selected = val;
         Tween;
         if (!this.selectedFlag)
             return;
         switch (this.selectedMode) {
             case SelectedType.TOGGLE:
                 this.selectedFlag.active = val;
                 break;
             case SelectedType.SWITCH:
                 let sp: Sprite = this.selectedFlag.getComponent(Sprite);
                 if (sp) {
                     sp.spriteFrame = val ? this.selectedSpriteFrame : this._unselectedSpriteFrame;
                 }
                 break;
         }
     }
 
     //按钮组件
     private _btnCom: any;
 
     get btnCom() {
         if (!this._btnCom)
             this._btnCom = this.node.getComponent(Button);
         return this._btnCom;
     }
 
     onLoad() {
         // //没有按钮组件的话，selectedFlag无效
         // if (!this.btnCom)
         //     this.selectedMode == SelectedType.NONE;
         //有选择模式时，保存相应的东西
         if (this.selectedMode == SelectedType.SWITCH) {
             let com: Sprite = this.selectedFlag.getComponent(Sprite);
             this._unselectedSpriteFrame = com.spriteFrame;
         }
     }
 
     onDestroy() {
         this.node.off(Node.EventType.SIZE_CHANGED, this._onSizeChange, this);
     }
 
     _registerEvent() {
         if (!this._eventReg) {
             if (this.btnCom && this.list.selectedMode > 0) {
                 this.btnCom.clickEvents.unshift(this.createEvt(this, 'onClickThis'));
             }
             if (this.adaptiveSize) {
                 this.node.on(Node.EventType.SIZE_CHANGED, this._onSizeChange, this);
             }
             this._eventReg = true;
         }
     }
 
     _onSizeChange() {
         this.list._onItemAdaptive(this.node);
     }
 
     /**
      * 创建事件
      * @param {cc.Component} component 组件脚本
      * @param {string} handlerName 触发函数名称
      * @param {cc.Node} node 组件所在node（不传的情况下取component.node）
      * @returns cc.Component.EventHandler
      */
     createEvt(component: Component, handlerName: string, node: Node = null) {
         if (!component.isValid)
             return;//有些异步加载的，节点以及销毁了。
         component['comName'] = component['comName'] || component.name.match(/\<(.*?)\>/g).pop().replace(/\<|>/g, '');
         let evt = new EventHandler();
         evt.target = node || component.node;
         evt.component = component['comName'];
         evt.handler = handlerName;
         return evt;
     }
 
     showAni(aniType: number, callFunc: Function, del: boolean) {
         let t: any = this;
         let twe: Tween<Node>;
         let ut: UITransform = t.node.getComponent(UITransform);
         switch (aniType) {
             case 0: //向上消失
                 twe = tween(t.node)
                     .to(.2, {scale: new Vec3(.7, .7, 1.0)})
                     .by(.3, {position: new Vec3(0, ut.height * 2, 0)});
                 break;
             case 1: //向右消失
                 twe = tween(t.node)
                     .to(.2, {scale: new Vec3(.7, .7, 1.0)})
                     .by(.3, {position: new Vec3(ut.width * 2, 0, 0)});
                 break;
             case 2: //向下消失
                 twe = tween(t.node)
                     .to(.2, {scale: new Vec3(.7, .7, 1.0)})
                     .by(.3, {position: new Vec3(0, ut.height * -2, 0)});
                 break;
             case 3: //向左消失
                 twe = tween(t.node)
                     .to(.2, {scale: new Vec3(.7, .7, 1.0)})
                     .by(.3, {position: new Vec3(ut.width * -2, 0, 0)});
                 break;
             default: //默认：缩小消失
                 twe = tween(t.node)
                     .to(.3, {scale: new Vec3(.1, .1, 1.0)});
                 break;
         }
 
         if (callFunc || del) {
             twe.call(() => {
                 if (del) {
                     t.list._delSingleItem(t.node);
                     for (let n: number = t.list.displayData.length - 1; n >= 0; n--) {
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
     }
 
     onClickThis() {
         this.list.selectedId = this.listId;
     }
 
 }
 