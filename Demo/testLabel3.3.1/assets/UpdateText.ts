import { _decorator, Component, Node, Label, Color, color, UI, EventTouch } from "cc";
const { ccclass, property } = _decorator;

@ccclass("UpdateText")
export class UpdateText extends Component {
	@property({ type: Label })
	private _label: Label = null!;

	_deltaTime: number = 0;
	start() {

        // let mapYangtianchao:Map<number, number> =new  Map();
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

	update(dt: number) {
		// if (this._deltaTime > 5) return;
		// console.log(this._deltaTime);
		// this._deltaTime += dt;
		// this._label.string = text_list[Math.floor(this._deltaTime % 4)];
		// this._label.fontSize = Math.floor(Math.random() * 20 + 10);
		// this._label.color = color(Math.random() * 255, Math.random() * 255, Math.random() * 255, 255);
	}

	onClickThis(event: EventTouch) {
		console.log(event);
	}
}
