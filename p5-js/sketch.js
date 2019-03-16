function setup() {
	createCanvas(800, 800);

	const start = [20, 20];

	// 	var endPoints = drawBranch(start);
	// 	var end = converge(endPoints[0], endPoints[1]);
	// 	endPoints = drawBranch(end);
	// 	endPoints = [drawPrint(endPoints[0]), drawPrint(endPoints[1])];
	// 	end = converge(endPoints[0], endPoints[1]);

	// var end = example1(start);
	let end = example3(start);

	drawOpen(start);
	drawOpen(end);
}

// branching example
function example1(start) {
	let endPoints = drawBranch(start);
	let end = converge(endPoints[0], endPoints[1]);
	drawPrint(endPoints[0]);
	drawPrint(endPoints[1]);
	return end;
}

// while / loop example
function example2(start) {
	let points = drawWhile(start, ['print']);
	return points.end;
}

// branch in loop
function example3(start) {
	let points = drawWhile(start, ['branch']);
	return points.end;
}

// loop nested in loop
function example4(start) {
	// var endPoints = drawBranch(start);
	// var end = converge(endPoints[0], endPoints[1]);
	// drawPrint(endPoints[0]);
	// drawPrint(endPoints[1]);
	let points = drawWhile(start, ['while']);
	return points.end;
}

function draw() {}

// height of branch or while
const HEIGHT = 160;
const HEIGHT_WHILE_BASE = 70;
const HEIGHT_WHILE_INCREMENT = 40;
const WIDTH_BRANCH = 160;
const LEN_BOX = 20;
const CIRCLE_RAD = 5;
const WHILE_HORIZONTAL_LINE = 50;

function drawWhile(start, nodes) {
	let x = start[0];
	let y = start[1];

	// base box height
	let boxHeight = HEIGHT_WHILE_BASE + HEIGHT_WHILE_INCREMENT * nodes.length;

	fill(255);
	rect(x + 5, y + 20, 70, boxHeight, 10);

	fill(0);
	let xWhile, yWhile;
	for (let i = nodes.length - 1; i >= 0; i--) {
		xWhile = x + 75;
		yWhile = HEIGHT_WHILE_BASE + y + i * HEIGHT_WHILE_INCREMENT;

		if (nodes[i] == 'print') {
			drawPrint([xWhile, yWhile]);
		} else {
			line(xWhile, yWhile, xWhile + WHILE_HORIZONTAL_LINE, yWhile);
			fill(0);
			circle(xWhile, yWhile, CIRCLE_RAD);
		}

		if (nodes[i] == 'while') {
			let endInner = drawWhile([xWhile + WHILE_HORIZONTAL_LINE, yWhile], ['print']);
			connect(endInner.end, [xWhile, yWhile]);
		}

		if (nodes[i] == 'branch') {
			let endInner = example1([xWhile + WHILE_HORIZONTAL_LINE, yWhile]);
			connect(endInner, [xWhile, yWhile]);
		}
	}

	fill(0);
	// circle(x, y, CIRCLE_RAD);

	line(x, y, x, y + boxHeight + HEIGHT_WHILE_INCREMENT);

	fill(255);
	rect(x - 10, y + 60, LEN_BOX, LEN_BOX);

	return {
		end: [x, y + boxHeight + HEIGHT_WHILE_INCREMENT],
		nodes: []
	};
}

function drawPrint(p) {
	let x = p[0];
	let y = p[1];

	fill(255);
	// line(p[0], p[1], x, y + HEIGHT_PRINT);
	quad(x, y - LEN_BOX / 2, x + LEN_BOX / 2, y, x, y + LEN_BOX / 2, x - LEN_BOX / 2, y);

	return [x, y];
}

// for start, end circles
function drawOpen(point) {
	fill(255);
	circle(point[0], point[1], CIRCLE_RAD);
}

// connect two coordinates
function connect(p1, p2) {
	fill(0);
	line(p1[0], p1[1], p1[0], p1[1]);
	line(p2[0], p2[1], p1[0], p1[1]);

	return [p1[0], p1[1] + HEIGHT / 2];
}

// merge two coordinates at a lower coord
function converge(p1, p2) {
	fill(0);
	line(p1[0], p1[1], p1[0], p1[1] + HEIGHT / 2);
	line(p2[0], p2[1], p1[0], p1[1] + HEIGHT / 2);

	return [p1[0], p1[1] + HEIGHT / 2];
}

// Only supporting if else right now
function drawBranch(start) {
	let x = start[0];
	let y = start[1];
	let end1 = [x, y + HEIGHT];
	let end2 = [x + WIDTH_BRANCH / 2, y + HEIGHT];

	fill(0);

	line(x, y, x, y + HEIGHT);
	line(x + WIDTH_BRANCH / 2, y + WIDTH_BRANCH / 2, x + WIDTH_BRANCH / 2, y + HEIGHT);
	line(x, y + HEIGHT / 2, x + WIDTH_BRANCH / 2, y + HEIGHT / 2);

	fill(255);
	rect(x - LEN_BOX / 2, y + WIDTH_BRANCH / 2 - LEN_BOX / 2, LEN_BOX, LEN_BOX);

	return [end1, end2];
}