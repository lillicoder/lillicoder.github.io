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
	canvas;
	board;
	renderer;
	tracker = {
		stopMain: 0,
		lastRender: 0,
		lastTick: 0,
		tickLength: 100
	};

	/**
	 * Instantiates this game with the given canvas.
	 * @param canvas HTML5 canvas the game will play on.
	 */
	constructor(canvas) {
		this.canvas = canvas;
		this.board = new Board();
		this.renderer = new Renderer();
	}

	start() {
		this.loop(window.performance.now())
	}

	/**
	 * Render step of the game loop.
	 */
	render() {
		this.renderer.render(this.canvas, this.board);
	}

	/**
	 * Main game loop.
	 * @param tFrame Current loop timestamp.
	 */
	loop(tFrame) {
		this.tracker.stopMain = window.requestAnimationFrame((tFrame) => this.loop(tFrame));
		const nextTick = this.tracker.lastTick + this.tracker.tickLength;

		// Find tick delta since last loop
		let ticks = 0;
		if (tFrame > nextTick) {
			const timeSince = tFrame - this.tracker.lastTick;
			ticks = Math.floor(timeSince / this.tracker.tickLength);
		}

		// Catch up game state since last loop
		for (let i = 0; i < ticks; i++) {
			this.tracker.lastTick += this.tracker.tickLength;
			this.board = this.update(this.tracker.lastTick);
		}
		
		this.render();
		this.tracker.lastRender = tFrame;
	}

	/**
	 * Update step of the game loop.
	 * @param tFrame Current loop tick.
	 * @return Updated board.
	 */
	update(tick) {
		let nextBoard = this.board.clone();
		for (const cell of this.board) {
			let nextCell = nextBoard.cell(cell.point); // Mutate clone only
			let count = this.board.countAliveNeighbors(cell); // Count from non-mutated original only
		
			let shouldLive = cell.isAlive() ? (count === 2 || count === 3) : count === 3;
			if (shouldLive) {
				nextCell.live();
			} else {
				nextCell.die();
			}
		}

		return nextBoard;
	}
}
