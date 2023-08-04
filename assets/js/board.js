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
 * Represents a point with x- and y-coordinate.
 */
class Point {
	x;
	y;

	/**
	 * Instantiates this point with the given coordinates.
	 * @param x X-coordinate.
	 * @param y Y-coordinate.
	 */
	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}

	/**
	 * Clones this point.
	 * @return Clone.
	 */
	clone() {
		return new Point(this.x, this.y);
	}
}

/**
 * Represents a cell on the game board.
 */
class Cell {
	point;
	alive;

	/**
	 * Instantiates this cell with a given point and liveliness.
	 * @param point Coordinate for this cell.
	 * @param alive True if the cell is alive, false if not.
	 */
	constructor(point = new Point(), alive = false) {
		this.point = point;
		this.alive = alive;
	}

	/**
	 * Clones this cell.
	 * @return Clone.
	 */
	clone() {
		return new Cell(this.point.clone(), this.alive)
	}

	/**
	 * Kills this cell.
	 */
	die() {
		this.alive = false;
	}

	/**
	 * Makes this cell alive.
	 */
	live() {
		this.alive = true;
	}

	/**
	 * Determines if this cell is alive or dead.
	 * @return True if alive, false if dead.
	 */
	isAlive() {
		return this.alive;
	}
}

/**
 * Represents the state of the game board.
 */
class Board {
	board;

	*[Symbol.iterator]() {
		for (const row of this.board) {
			for (const cell of row) {
				yield cell;
			}
		}
	};

	/**
	 * Instantiates this board with the given size. Board will be square.
	 * @param board Board to copy instead of creating a new one.
	 * @param canvas HTML5 canvas the game will play on.
	 */
	constructor(board = null, span = 50) {
		this.board = board ?? this.#makeBoard(span);
	}

	/**
	 * Gets the cell for this board at the given point.
	 * @param point Point of the cell to get;
	 * @return Cell at the given point.
	 */
	cell(point) {
		return this.board[point.x][point.y]; 
	}

	/**
	 * Gets the length of a side of this board. Boards are square.
	 * @return Board length.
	 */
	length() {
		return this.board.length;
	}

	/**
	 * Clones this board.
	 * @return Clone.
	 */
	clone() {
		let span = this.length();
		let board = Array.from(
			{length: span}, (row, y) => Array.from(
				{length: span}, (cell, x) => this.cell(new Point(x, y)).clone()
			)
		);
		return new Board(board);
	}

	/**
	 * Gets the count of living neighbors for the given cell.
	 * @param cell Cell to count neighbors of.
	 * @return Count of living neighbors.
	 */
	countAliveNeighbors(cell) {
		let columnIndex = cell.point.x;
		let rowIndex = cell.point.y;
		let span = this.length();

		// Populate cell neighbors, edge cells wrap to other side
		let leftColumnIndex = columnIndex - 1;
		if (leftColumnIndex < 0) {
			leftColumnIndex = span - 1;
		}

		let rightColumnIndex = columnIndex + 1;
		if (rightColumnIndex >= span) {
			rightColumnIndex = 0;
		}

		let topRowIndex = rowIndex - 1;
		if (topRowIndex < 0) {
			topRowIndex = span - 1;
		}

		let bottomRowIndex = rowIndex + 1;
		if (bottomRowIndex >= span) {
			bottomRowIndex = 0;
		}

		let neighbors = [
			this.board[topRowIndex][leftColumnIndex], // top left
			this.board[topRowIndex][columnIndex], // top middle
			this.board[topRowIndex][rightColumnIndex], // top right
			this.board[rowIndex][leftColumnIndex], // left
			this.board[rowIndex][rightColumnIndex], // right
			this.board[bottomRowIndex][leftColumnIndex], // bottom left
			this.board[bottomRowIndex][columnIndex], // bottom middle
			this.board[bottomRowIndex][rightColumnIndex] // bottom right
		];
		return neighbors.filter(cell => cell.isAlive()).length;
	}

	/**
	 * Constructs a game board as a 2-dimentional array whose dimenions
	 * are the given size.
	 * @param span Dimension size.
	 * @return New board.
	 */
	#makeBoard(span) {
		// Create a 2D of unique instances (Array.prototype.fill() reuses instances)
		let board = Array.from(
			{length: span}, (row, y) => Array.from(
				{length: span}, (cell, x) => new Cell(new Point(x, y))
			)
		);
		return board;
	}
}
