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
 * Tracks ongoing game loop state.
 */
class Tracker {
	stopMain;
	lastRender;
	lastTick;
	tickLength;

	/**
	 * Instantiates this tracker with the given tick length.
	 * @param tickLength Tick length. Defaults to 1000.
	 */
	constructor(tickLength = 1000) {
		this.stopMain = 0;
		this.lastRender = 0;
		this.lastTick = 0;
		this.tickLength = tickLength;
	}

	/**
	 * Gets the next tick based on the last tracked tick and current tick length.
	 * @return Next tick.
	 */
	nextTick() {
		return this.lastTick + this.tickLength;
	}
}

/**
 * Core game engine and functions.
 */
class GameOfLife {
	canvas;
	board;
	renderer;
	tracker;

	/**
	 * Instantiates this game with the given canvas.
	 * @param canvas HTML5 canvas the game will play on.
	 */
	constructor(canvas) {
		this.canvas = canvas;
		this.board = new Board();
		this.renderer = new Renderer();
		this.tracker = new Tracker();
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
		const nextTick = this.tracker.nextTick();

		// Find tick delta since last loop
		let ticks = 0;
		if (tFrame > nextTick) {
			const timeSince = tFrame - this.tracker.lastTick;
			ticks = Math.floor(timeSince / this.tracker.tickLength);
		}

		// Catch up game state since last loop
		for (let i = 0; i < ticks; i++) {
			this.tracker.lastTick += this.tracker.tickLength;
			this.update(this.tracker.lastTick);
		}
		
		this.render();
		this.tracker.lastRender = tFrame;
	}

	/**
	 * Update step of the game loop.
	 * @param tFrame Current loop tick.
	 */
	update(tick) {
		let point = new Point(1, 1);
		if (this.board.isAlive(point)) {
			this.board.kill(point);
		} else {
			this.board.live(point);
		}
	}
}
