/*
 * @Author: 
 * @Date: 2021-09-17 09:37:18
 * @LastEditTime: 2021-09-28 11:15:25
 * @LastEditors: 
 * @Description: In User Settings Edit
 * @FilePath: /poker3/assets/ytc/test_ytc.ts
 */
import { _decorator, Component, AssetManager, Node, assetManager, Prefab, v3, EventTouch, UITransform, UI, Label } from "cc";
// import { LabelToast } from "../src/common/base/ui/LabelToast";
import ScrollList from "../src/common/base/ui/ScrollList";
const { ccclass, property } = _decorator;

@ccclass("test")
export default class test extends Component {
	private baseBundle: AssetManager.Bundle;
	@property(ScrollList)
	ScrollList: ScrollList = null;

	@property(Node)
	dialog: Node = null!;

	@property(Label)
	label: Label = null!;
	
	shareLabelInfo;
	onLoad() {
		this.ScrollList.numItems = 100;

		this.scheduleOnce(() => {
			this.label.string = "此时是两秒后的文字更改";
		}, 2);
	}
	onEventStart(event: EventTouch) {
		console.log("开始提示");
		let posUI = event.getUILocation();
		let arg = {
			id: "41001",
			defaultWidth: 200,
			fontSize: 20,
			duration: 3,
		};
		// LabelToast.show(posUI, arg);
	}
	onEventMove(event) {}
	onEventCancel(event) {}
	onEventEnd(event) {}
	onClickShow(data) {
		// this.labelTest.show();
	}
	onClickHide(data) {
		console.log("data:", data);
	}
	showDialog() {
		this.ScrollList.numItems = 100;
		// this.label.string = "撒西安市潇洒献爱心鞍山西安属性鞍山西安市新撒西安属性鞍山西安市新撒虚弱拜访别人果然个人股宝宝贝贝干饭";

		this.dialog.active = true;
	}
	hideDialog() {
		this.ScrollList.numItems = 0;
		// // this.label.string = "";
		// this.shareLabelInfo.fontAtlas.reset();
		// this.label.string = "char清楚了";
		this.dialog.active = false;
	}
}
