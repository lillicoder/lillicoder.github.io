class Grid {
    
    draw(canvas) {
        if (canvas.getContext) {
            this.#resize(canvas);

            const context = canvas.getContext("2d");
            this.#drawBackground(canvas, context);
            this.#drawGrid(canvas, context)
        }
    }

    #drawBackground(canvas, context) {
        context.fillStyle = "rgb(200, 200, 200)";
        context.fillRect(0, 0, canvas.width, canvas.height);
    }

    #drawGrid(canvas, context) {
        var width = canvas.width;
        var height = canvas.height;

        const cellSize = 16;
        const columns = Math.floor(width / cellSize);
        const rows = Math.floor(height / cellSize);

        context.strokeStyle = "#dddddd";
        context.strokeWidth = 2;
        
        context.beginPath();

        var position = 0;
        for (var column = 1; column < columns; column++) {
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

    #resize(canvas) {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
}
