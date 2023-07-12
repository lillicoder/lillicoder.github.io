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
 * Draws a 2D grid on an HTML5 canvas.
 */
class Grid {
    // TODO Find a way to make these immutable to avoid side effects
    config = {
        strokeWidth: 2,
        strokeColor: "#dddddd",
        cellLength: 16,
        aliveCellColor: "rgb(0, 0, 255)",
        deadCellColor: "rgb(200, 200, 200)"
    };
    
    /**
     * Draws a grid on the given canvas.
     * @param canvas HTML5 canvas to draw on.
     */
    draw(canvas, board) {
        if (canvas.getContext) {
            // Fix grid and draw
            this.#resize(canvas);

            const context = canvas.getContext("2d");
            this.#drawBackground(canvas, context);
            this.#drawGrid(canvas, context);
            this.#drawBoard(board, context);
        }
    }

    /**
     * Draws a background for the grid on the given canvas.
     * @param canvas HTML5 canvas to draw on.
     * @param context Canvas content to perform drawing operations with
     */
    #drawBackground(canvas, context) {
        context.fillStyle = this.config.deadCellColor;
        context.fillRect(0, 0, canvas.width, canvas.height);
    }

    #drawBoard(board, context) {
        // TODO Introduce an iterator to the board class to avoid this
        let length = board.length();
        for(let row = 0; row < length; row++) {
            for (let column = 0; column < length; column++) {
                let cell = board.cell(new Point(row, column));
                this.#paintCell(cell, context);
            }
        }
    }

    /**
     * Draws grid lines on the given canvas.
     * @param canvas HTML5 canvas to draw on.
     * @param context Canvas content to perform drawing operations with.
     */
    #drawGrid(canvas, context) {
        const width = canvas.width;
        const height = canvas.height;

        /**
         * Span reflects ideal amount of columns/rows regardless of stroke.
         * If we want to paint cells within stroke boundaries, we should
         * find the length of a column accounting for the width of strokes.
         */
        const span = Math.floor(width / this.config.cellLength);
        const totalStrokeWidth = span * this.config.strokeWidth;
        const cellLength = Math.floor((width - totalStrokeWidth) / span);

        context.strokeStyle = this.config.strokeColor;
        context.lineWidth = this.config.strokeWidth;
        context.beginPath();

        // Since the grid is square, we can setup all grid lines in a single loop pass
        let columnPosition = 0;
        let rowPosition = 0;
        for (let pass = 0; pass <= span; pass++) {
            // Column
            context.moveTo(columnPosition, 0);
            context.lineTo(columnPosition, height);
            context.stroke();
            columnPosition += cellLength + this.config.strokeWidth;

            // Row
            context.moveTo(0, rowPosition);
            context.lineTo(width, rowPosition);
            context.stroke();
            rowPosition += cellLength + this.config.strokeWidth;
        }

        // Draw a grid border
        context.strokeStyle = window.getComputedStyle(document.body).backgroundColor;
        context.beginPath();
        context.strokeRect(0, 0, width, height);
        
        context.closePath();
    }

    #paintCell(cell, context) {
        // The strokes are split evenly between all sizes of a cell, so split the stroke width
        let normalizedStrokeWidth = Math.floor(this.config.strokeWidth / 2);
        let strokeWidth = Math.max(normalizedStrokeWidth, 1); // Always have at least 1 for the stroke width
        let x = (this.config.cellLength * cell.point.x) + strokeWidth;
        let y = (this.config.cellLength * cell.point.y) + strokeWidth;

        context.fillStyle = cell.isAlive() ? this.config.aliveCellColor : this.config.deadCellColor;
        context.fillRect(
            x, 
            y, 
            this.config.cellLength - this.config.strokeWidth, 
            this.config.cellLength - this.config.strokeWidth
        );
    }

    /**
     * Resizes the given canvas so its width and height properties reflects its actual styled size.
     * 
     * HTML5 canvases will keep their default 300px by 150px measurements unless you manually reset
     * the values after the DOM finishes laying out.
     * @param canvas Canvas to resize.
     */
    #resize(canvas) {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
}
