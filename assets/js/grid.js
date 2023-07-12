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

            // Now I need to update cells
            this.#drawBoard(board, context);
        }
    }

    /**
     * Draws a background for the grid on the given canvas.
     * @param canvas HTML5 canvas to draw on.
     * @param context Canvas content to perform drawing operations with
     */
    #drawBackground(canvas, context) {
        context.fillStyle = "rgb(200, 200, 200)";
        context.fillRect(0, 0, canvas.width, canvas.height);
    }

    #drawBoard(board, context) {
        // TODO Introduce an interator to the board class to avoid this
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

    #paintCell(cell, context) {
        // Each cell is 16px by `16`px
        // TODO Refactor this to be dynamic
        let length = 16;
        let x = length * cell.point.x + 1; // TODO Use stroke size as variable
        let y = length * cell.point.y + 1; // TODO Use stroke size as variable

        if (cell.isAlive()) {
            context.fillStyle = "rgb(0, 0, 0)";
        } else {
            context.fillStyle = "rgb(200, 200, 200)";
        }

        context.fillRect(x, y, length - 1, length - 1); // TODO Use stroke size as variable
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
