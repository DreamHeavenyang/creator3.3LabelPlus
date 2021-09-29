/*
 Copyright (c) 2020 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
 worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
 not use Cocos Creator software for developing other software or tools that's
 used for developing games. You are not granted to publish, distribute,
 sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */

import { BASELINE_RATIO, Color, director, Director, error, getBaselineOffset, ImageAsset, js, macro, MIDDLE_RATIO, safeMeasureText, Texture2D, warnID } from "cc";

/**
 * @packageDocumentation
 * @hidden
 */

export interface ISharedLabelData {
	canvas: HTMLCanvasElement;
	context: CanvasRenderingContext2D | null;
}

let _canvasPool: CanvasPool;

export class CanvasPool {
	static getInstance(): CanvasPool {
		if (!_canvasPool) {
			_canvasPool = new CanvasPool();
		}
		return _canvasPool;
	}
	public pool: ISharedLabelData[] = [];
	public get() {
		let data = this.pool.pop();

		if (!data) {
			const canvas = document.createElement("canvas");
			const context = canvas.getContext("2d");
			data = {
				canvas,
				context,
			};
		}

		return data;
	}

	public put(canvas: ISharedLabelData) {
		if (this.pool.length >= macro.MAX_LABEL_CANVAS_POOL_SIZE) {
			return;
		}
		this.pool.push(canvas);
	}
}

// export function packToDynamicAtlas(comp, frame) {
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

interface ILabelInfo {
	fontSize: number;
	lineHeight: number;
	hash: string;
	fontFamily: string;
	fontDesc: string;
	hAlign: number;
	vAlign: number;
	color: Color;
	isOutlined: boolean;
	out: Color;
	margin: number;
}

const WHITE = Color.WHITE.clone();
const space = 0;
const bleed = 2;

class FontLetterDefinition {
	public u = 0;
	public v = 0;
	public w = 0;
	public h = 0;
	public texture: LetterRenderTexture | null = null;
	public offsetX = 0;
	public offsetY = 0;
	public valid = false;
	public xAdvance = 0;
}

const _backgroundStyle = `rgba(255, 255, 255, ${(1 / 255).toFixed(3)})`;
const BASELINE_OFFSET = getBaselineOffset();

class LetterTexture {
	public image: ImageAsset | null = null;
	public labelInfo: ILabelInfo;
	public char: string;
	public data: ISharedLabelData | null = null;
	public canvas: HTMLCanvasElement | null = null;
	public context: CanvasRenderingContext2D | null = null;
	public width = 0;
	public height = 0;
	public offsetY = 0;
	public hash: string;
	constructor(char: string, labelInfo: ILabelInfo) {
		this.char = char;
		this.labelInfo = labelInfo;
		this.hash = char.charCodeAt(0) + labelInfo.hash;
	}

	public updateRenderData() {
		this._updateProperties();
		this._updateTexture();
	}

	public destroy() {
		this.image = null;
		// Label._canvasPool.put(this._data);
	}

	private _updateProperties() {
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

	private _updateTexture() {
		if (!this.context || !this.canvas) {
			return;
		}

		const context = this.context;
		const labelInfo = this.labelInfo;
		const width = this.canvas.width;
		const height = this.canvas.height;

		context.textAlign = "center";
		context.textBaseline = "alphabetic";
		context.clearRect(0, 0, width, height);
		// Add a white background to avoid black edges.
		context.fillStyle = _backgroundStyle;
		context.fillRect(0, 0, width, height);
		context.font = labelInfo.fontDesc;

		const fontSize = labelInfo.fontSize;
		const startX = width / 2;
		const startY = height / 2 + fontSize * MIDDLE_RATIO + fontSize * BASELINE_OFFSET;
		const color = labelInfo.color;
		// use round for line join to avoid sharp intersect point
		context.lineJoin = "round";
		context.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${1})`;
		if (labelInfo.isOutlined) {
			const strokeColor = labelInfo.out || WHITE;
			context.strokeStyle = `rgba(${strokeColor.r}, ${strokeColor.g}, ${strokeColor.b}, ${strokeColor.a / 255})`;
			context.lineWidth = labelInfo.margin * 2;
			context.strokeText(this.char, startX, startY);
		}
		context.fillText(this.char, startX, startY);

		// this.texture.handleLoadedTexture();
		// (this.image as Texture2D).updateImage();
	}
}

const PixelFormat = { RGBA8888: 35 };

export class LetterRenderTexture extends Texture2D {
	/**
	 * @en
	 * Init the render texture with size.
	 * @zh
	 * 初始化 render texture。
	 * @param [width]
	 * @param [height]
	 * @param [string]
	 */
	public initWithSize(width: number, height: number, format: number = PixelFormat.RGBA8888) {
		this.reset({
			width,
			height,
			format,
		});
	}

	/**
	 * @en Draw a texture to the specified position
	 * @zh 将指定的图片渲染到指定的位置上。
	 * @param {Texture2D} image
	 * @param {Number} x
	 * @param {Number} y
	 */
	public drawTextureAt(image: ImageAsset, x: number, y: number) {
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
		gfxDevice.copyTexImagesToTexture([image.data as HTMLCanvasElement], gfxTexture, [region]);
	}
}
export enum ECharCacheType {
	normal = 1, //不要改
	main,
	dialog,
	scrollview,
}
export class LetterAtlas {
	get width() {
		return this._width;
	}

	get height() {
		return this._height;
	}

	private _x = space;
	private _y = space;
	private _nextY = space;
	private _width = 0;
	private _height = 0;
	private _halfBleed = 0;
	public declare fontDefDictionary: Map<number, FontAtlas>;
	private _dirty = false;

	private _charCacheType = ECharCacheType.normal;

	constructor(width: number, height: number) {
		//TODO: 待优化
        this.fontDefDictionary = new Map();
		for (let key in ECharCacheType) {
			const texture = new LetterRenderTexture();
			texture.initWithSize(width, height);
			this.fontDefDictionary.set(Number(ECharCacheType[key]), new FontAtlas(texture));
		}
		//TODO: 待优化

		this._halfBleed = bleed / 2;
		this._width = width;
		this._height = height;
		director.on(Director.EVENT_BEFORE_SCENE_LAUNCH, this.beforeSceneLoad, this);
	}

	public insertLetterTexture(letterTexture: LetterTexture, charCacheType) {
		const texture = letterTexture.image;
		const device = director.root!.device;
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

	public update() {
		if (!this._dirty) {
			return;
		}
		// this.texture.update();
		this._dirty = false;
	}

	public reset() {
		this._x = space;
		this._y = space;
		this._nextY = space;

		// const chars = this.letterDefinitions;
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

	public destroy() {
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

	public beforeSceneLoad() {
		this.clearAllCache();
	}

	public clearAllCache() {
		this.destroy();

		for (let value of this.fontDefDictionary.values()) {
			const texture = new LetterRenderTexture();
			texture.initWithSize(this._width, this._height);
			value.texture.texture = texture;
		}
	}

	public getLetter(key: string, charCacheType) {
		if (!charCacheType) charCacheType = this._charCacheType;
		return this.fontDefDictionary.get(charCacheType).letterDefinitions[key];
	}

	public getLetterDefinitionForChar(char: string, labelInfo: ILabelInfo, charCacheType) {
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
		}
		// console.log(this.fontDefDictionary)
		return letter;
	}
}

export interface IShareLabelInfo {
	fontAtlas: FontAtlas | LetterAtlas | null;
	fontSize: number;
	lineHeight: number;
	hAlign: number;
	vAlign: number;
	hash: string;
	fontFamily: string;
	fontDesc: string;
	color: Color;
	isOutlined: boolean;
	out: Color;
	margin: number;
}

export const shareLabelInfo: IShareLabelInfo = {
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
	margin: 0,
};

export function computeHash(labelInfo) {
	const hashData = "";
	const color = labelInfo.color.toHEX();
	let out = "";
	if (labelInfo.isOutlined && labelInfo.margin > 0) {
		out = out + labelInfo.margin + labelInfo.out.toHEX();
	}

	return hashData + labelInfo.fontSize + labelInfo.fontFamily + color + out;
}

export class BufferTextureCopy {
	private declare _token: never; // to make sure all usages must be an instance of this exact class, not assembled from plain object

	constructor(public buffStride: number = 0, public buffTexHeight: number = 0, public texOffset: Offset = new Offset(), public texExtent: Extent = new Extent(), public texSubres: TextureSubresLayers = new TextureSubresLayers()) {}

	public copy(info: BufferTextureCopy) {
		this.buffStride = info.buffStride;
		this.buffTexHeight = info.buffTexHeight;
		this.texOffset.copy(info.texOffset);
		this.texExtent.copy(info.texExtent);
		this.texSubres.copy(info.texSubres);
		return this;
	}
}

export class Offset {
	private declare _token: never; // to make sure all usages must be an instance of this exact class, not assembled from plain object

	constructor(public x: number = 0, public y: number = 0, public z: number = 0) {}

	public copy(info: Offset) {
		this.x = info.x;
		this.y = info.y;
		this.z = info.z;
		return this;
	}
}

export class Extent {
	private declare _token: never; // to make sure all usages must be an instance of this exact class, not assembled from plain object

	constructor(public width: number = 0, public height: number = 0, public depth: number = 1) {}

	public copy(info: Extent) {
		this.width = info.width;
		this.height = info.height;
		this.depth = info.depth;
		return this;
	}
}
export class TextureSubresLayers {
	private declare _token: never; // to make sure all usages must be an instance of this exact class, not assembled from plain object

	constructor(public mipLevel: number = 0, public baseArrayLayer: number = 0, public layerCount: number = 1) {}

	public copy(info: TextureSubresLayers) {
		this.mipLevel = info.mipLevel;
		this.baseArrayLayer = info.baseArrayLayer;
		this.layerCount = info.layerCount;
		return this;
	}
}

export class FontAtlas {
	public letterDefinitions;
	public texture;
	public _x = space;
	public _y = space;
	public _nextY = space;

	constructor(texture) {
		this.letterDefinitions = {};
		this.texture = texture;
		this._x = 0;
		this._y = 0;
		this._nextY = 0;
	}

	public addLetterDefinitions(letter, letterDefinition) {
		this.letterDefinitions[letter] = letterDefinition;
	}

	public cloneLetterDefinition() {
		const copyLetterDefinitions = {};
		for (const key of Object.keys(this.letterDefinitions)) {
			const value = new FontLetterDefinition();
			js.mixin(value, this.letterDefinitions[key]);
			copyLetterDefinitions[key] = value;
		}
		return copyLetterDefinitions;
	}

	public getTexture() {
		return this.texture;
	}

	public getLetter(key) {
		return this.letterDefinitions[key];
	}

	public getLetterDefinitionForChar(char, labelInfo?) {
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

	public clear() {
		this.letterDefinitions = {};
	}
}
