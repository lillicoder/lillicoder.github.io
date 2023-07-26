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
 * Renders a game board on an HTML5 canvas.
 */
class Renderer {
    // TODO Find a way to make these immutable to avoid side effects
    config = {
        strokeWidth: 2,
        strokeColor: "#dddddd",
        cellLength: 16,
        aliveCellColor: "rgb(0, 0, 255)",
        deadCellColor: "rgb(200, 200, 200)"
    };
    
    /**
     * Renders the given board on the given canvas.
     * @param canvas HTML5 canvas to render on.
     * @param board Board to render.
     */
    render(canvas, board) {
        if (canvas.getContext) {
            this.#resize(canvas);

            const context = canvas.getContext("2d");
            this.#renderBackground(context, canvas.width, canvas.height);
            this.#renderGrid(context, canvas.width, canvas.height);
            this.#renderBoard(context, board);
        }
    }

    /**
     * Renders a background of the given width and height with the given canvas context.
     * @param context Canvas context.
     * @param width Desired width.
     * @param height Desired height.
     */
    #renderBackground(context, width, height) {
        context.fillStyle = this.config.deadCellColor;
        context.fillRect(0, 0, width, height);
    }

    /**
     * Renders all cells of the given board.
     * @param context Canvas context.
     * @param board Board to render.
     */
    #renderBoard(context, board) {
        // TODO Introduce an iterator to the board class to avoid this
        let length = board.length();
        for(let row = 0; row < length; row++) {
            for (let column = 0; column < length; column++) {
                let cell = board.cell(new Point(row, column));
                this.#renderCell(context, cell);
            }
        }
    }

    /**
     * Renders the given cell.
     * @param context Canvas context.
     * @param cell Cell to render.
     */
    #renderCell(context, cell) {
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
     * Renders a grid on the given canvas.
     * @param context Canvas context.
     * @param width Desired width.
     * @param height Desired height.
     */
    #renderGrid(context, width, height) {
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

        // Render a border
        context.strokeStyle = window.getComputedStyle(document.body).backgroundColor;
        context.beginPath();
        context.strokeRect(0, 0, width, height);
        
        context.closePath();
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
