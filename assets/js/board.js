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
// TODO Is there a way to give this index-syntax as a custom class (like Kotlin can do)?
class Board {
	board;

	/**
	 * Instantiates this board with the given size. Board will be square.
	 * @param canvas HTML5 canvas the game will play on.
	 */
	constructor(span = 50) {
		this.board = this.#makeBoard(span);
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
	 * Makes the cell at the given point alive.
	 * @param point Point of the cell to make alive.
	 */
	live(point) {
		this.board[point.x][point.y].live();
	}

	/**
	 * Makes the cell at the given point dead.
	 * @param point Point of the cell to kill.
	 */
	kill(point) {
		this.board[point.x][point.y].die();
	}

	/**
	 * Determines if the cell at the given point is alive.
	 * @param point Point of the cell to check.
	 * @return True if the cell is alive, false if it is dead.
	 */
	isAlive(point) {
		return this.board[point.x][point.y].isAlive();
	}

	/**
	 * Gets the length of a side of this board.
	 * @return Board length.
	 */
	length() {
		return this.board.length;
	}

	/**
	 * Constructs a game board as a 2-dimentional array whose dimenions
	 * are the given size.
	 * @param span Dimension size.
	 * @return New board.
	 */
	#makeBoard(span) {
		let board = new Array(span);
		for (let column = 0; column < board.length; column++) {
			board[column] = new Array(span);
			for (let row = 0; row < board.length; row++) {
				board[column][row] = new Cell(new Point(row, column));
			}
		}

		return board;
	}
}
