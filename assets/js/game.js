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

class GameOfLife {
	stopMain;
	count = 0;
	canvas;

	constructor(canvas) {
		this.canvas = canvas;
	}

	render() {
		const grid = new Grid();
		grid.draw(this.canvas);
	}

	run(tFrame) {
		if (this.count === 0) {
			this.stopMain = window.requestAnimationFrame(() => this.run());
			this.update(tFrame);
			this.render();	
		}
		this.count++;
	}

	update(tFrame) {
	}
}
