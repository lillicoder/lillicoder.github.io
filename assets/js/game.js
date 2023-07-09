/*
 * Copyright 2023 Scott Weeden-Moody
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this project except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Core game engine and functions.
 */
class GameOfLife {
	stopMain;
	count = 0;
	canvas;

	/**
	 * Instantiates this game with the given canvas.
	 * @param canvas HTML5 canvas the game will play on.
	 */
	constructor(canvas) {
		this.canvas = canvas;
	}

	/**
	 * Render step of the game loop.
	 */
	render() {
		const grid = new Grid();
		grid.draw(this.canvas);
	}

	/**
	 * Main game loop.
	 * @param tFrame Current loop timestamp.
	 */
	// TODO Rename this method
	run(tFrame) {
		if (this.count === 0) {
			this.stopMain = window.requestAnimationFrame(() => this.run());
			this.update(tFrame);
			this.render();	
		}
		this.count++;
	}

	/**
	 * Update step of the game loop.
	 * @param tFrame Current loop timestamp.
	 */
	update(tFrame) {
	}
}
