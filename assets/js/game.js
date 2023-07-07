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
