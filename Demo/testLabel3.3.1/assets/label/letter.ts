/*
 Copyright (c) 2017-2020 Xiamen Yaji Software Co., Ltd.

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

/**
 * @packageDocumentation
 * @module ui-assembler
 */

import { Color, js, Label, Vec3, Node, Mat4, SpriteFrame, Rect } from "cc";
import { bmfont } from "./bmfont";
import { letterFont } from "./letter-font";

const WHITE = new Color(255, 255, 255, 255);

/**
 * letter 组装器
 * 可通过 `UI.letter` 获取该组装器。
 */
export const letter = {
	createData(comp: Label) {
		return comp.requestRenderData();
	},

	fillBuffers(comp: Label, renderer) {
		if (!comp.renderData) {
			return;
		}

		const node = comp.node;
		comp._setCacheAlpha(node._uiProps.opacity);
		WHITE.a = node._uiProps.opacity * 255;
		fillMeshVertices3D(node, renderer, comp.renderData, WHITE);
	},

	appendQuad(comp: Label, spriteFrame: SpriteFrame, rect: Rect, rotated: boolean, x: number, y: number, scale: number) {
		bmfont.appendQuad(comp, spriteFrame, rect, rotated, x, y, scale);
	},
};

js.addon(letter, letterFont);

const vec3_temp = new Vec3();
const _worldMatrix = new Mat4();
export function fillMeshVertices3D(node: Node, renderer, renderData, color: Color) {
	const dataList = renderData.data;
	let buffer = renderer.acquireBufferBatch()!;
	let vertexOffset = buffer.byteOffset >> 2;

	const vertexCount = renderData.vertexCount;
	let indicesOffset = buffer.indicesOffset;
	let vertexId = buffer.vertexOffset;

	const isRecreate = buffer.request(vertexCount, renderData.indicesCount);
	if (!isRecreate) {
		buffer = renderer.currBufferBatch!;
		vertexOffset = 0;
		indicesOffset = 0;
		vertexId = 0;
	}

	// buffer data may be realloc, need get reference after request.
	const vBuf = buffer.vData!;
	const iBuf = buffer.iData!;

	node.getWorldMatrix(_worldMatrix);

	for (let i = 0; i < vertexCount; i++) {
		const vert = dataList[i];
		Vec3.set(vec3_temp, vert.x, vert.y, 0);
		Vec3.transformMat4(vec3_temp, vec3_temp, _worldMatrix);
		vBuf[vertexOffset++] = vec3_temp.x;
		vBuf[vertexOffset++] = vec3_temp.y;
		vBuf[vertexOffset++] = vec3_temp.z;
		vBuf[vertexOffset++] = vert.u;
		vBuf[vertexOffset++] = vert.v;
		Color.toArray(vBuf, color, vertexOffset);
		vertexOffset += 4;
	}

	// fill index data
	for (let i = 0, count = vertexCount / 4; i < count; i++) {
		const start = vertexId + i * 4;
		iBuf[indicesOffset++] = start;
		iBuf[indicesOffset++] = start + 1;
		iBuf[indicesOffset++] = start + 2;
		iBuf[indicesOffset++] = start + 1;
		iBuf[indicesOffset++] = start + 3;
		iBuf[indicesOffset++] = start + 2;
	}
}
