
import { _decorator, Component, Node, Label, BitmapFont, CacheMode, SpriteFrame, ImageAsset, Texture2D, dynamicAtlasManager, CCString, Enum, log } from "cc";
import { ECharCacheType } from "./font-utils";
const { ccclass, property } = _decorator;

/**
 * 增加char模式下多种类型的缓存Texture
 * Name = LabelPlus
 * DateTime = Mon Sep 27 2021 10:24:01 GMT+0800 (中国标准时间)
 * Author = hellotion
 * FileBasename = LabelPlus.ts
 * FileBasenameNoExtension = LabelPlus
 * URL = db://assets/LabelPlus.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */
@ccclass("LabelPlus")
export class LabelPlus extends Label {
	// public charCacheType: ECharCacheType = ECharCacheType.normal;
	private _charCacheType: ECharCacheType = ECharCacheType.normal;
	@property({ type: Enum(ECharCacheType), tooltip: "char模式缓存Txture种类" })
	public get charCacheType(): ECharCacheType {
		return this._charCacheType;
	}
	public set charCacheType(value: ECharCacheType) {
		this._charCacheType = value;
		this.updateRenderData();
	}

	/** 重写父类，char模式传入此label */
	protected _applyFontTexture() {
		this.markForUpdateRenderData();
		const font = this._font;
		if (font instanceof BitmapFont) {
			const spriteFrame = font.spriteFrame;
			if (spriteFrame && spriteFrame.texture) {
				this._texture = spriteFrame;
				this.changeMaterialForDefine();
				if (this._assembler) {
					this._assembler.updateRenderData(this);
				}
			}
		} else {
			if (this.cacheMode === CacheMode.CHAR) {
				this._letterTexture = this._assembler!.getAssemblerData(this);
				this._texture = this._letterTexture;
			} else if (!this._ttfSpriteFrame) {
				this._ttfSpriteFrame = new SpriteFrame();
				this._assemblerData = this._assembler!.getAssemblerData();
				const image = new ImageAsset(this._assemblerData!.canvas);
				const texture = new Texture2D();
				texture.image = image;
				this._ttfSpriteFrame.texture = texture;
			}

			if (this.cacheMode !== CacheMode.CHAR) {
				// this._frame._refreshTexture(this._texture);
				this._texture = this._ttfSpriteFrame;
			}
			this.changeMaterialForDefine();
		}
	}
}
