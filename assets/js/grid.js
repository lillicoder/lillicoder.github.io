// Render
function draw() {
	const canvas = document.getElementById("canvas");
	if (canvas.getContext) {
		resize(canvas);

		const context = canvas.getContext("2d");
		drawBackground(canvas, context);
		drawGrid(canvas, context)
	}
}


// Render background
function drawBackground(canvas, context) {
	context.fillStyle = "rgb(200, 200, 200)";
	context.fillRect(0, 0, canvas.width, canvas.height);
}


// Render grid
function drawGrid(canvas, context) {
    var width = canvas.width;
    var height = canvas.height;

    const cellSize = 16;
    const columns = Math.floor(width / cellSize);
    const rows = Math.floor(height / cellSize);

    context.strokeStyle = "#dddddd";
    context.strokeWidth = 2;
    
    context.beginPath();

    var position = 0;
    for (column = 1; column < columns; column++) {
        position = (column * cellSize);
        context.moveTo(position, 0);
        context.lineTo(position, height);
        context.stroke();
    }

    position = 0;
    for (var row = 1; row < rows; row++) {
        position = (row * cellSize);
        context.moveTo(0, position);
        context.lineTo(width, position);
        context.stroke();
    }

    context.closePath();

    return;
}

// Resizes the given canvas based on its rendered CSS style
function resize(canvas) {
	canvas.width = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;
}
