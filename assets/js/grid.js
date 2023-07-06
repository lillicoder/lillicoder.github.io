function draw() {
	var canvas = document.getElementById("canvas");
	if (canvas.getContext) {
		const context = canvas.getContext("2d");
		context.fillStyle = "rgb(200, 200, 200)";
		context.fillRect(0, 0, 800, 800);
	}
}

function drawGrid() {
    var cnv = document.getElementById("canvas");
    
    var gridOptions = {
        majorLines: {
            separation: 50,
            color: '#FF0000'
        }
    };

    drawGridLines(cnv, gridOptions.majorLines);

    return;
}

function drawGridLines(cnv, lineOptions) {
    var iWidth = cnv.width;
    var iHeight = cnv.height;

    var ctx = cnv.getContext('2d');

    ctx.strokeStyle = lineOptions.color;
    ctx.strokeWidth = 1;
    
    ctx.beginPath();

    var iCount = null;
    var i = null;
    var x = null;
    var y = null;

    iCount = Math.floor(iWidth / lineOptions.separation);

    for (i = 1; i <= iCount; i++) {
        x = (i * lineOptions.separation);
        ctx.moveTo(x, 0);
        ctx.lineTo(x, iHeight);
        ctx.stroke();
    }


    iCount = Math.floor(iHeight / lineOptions.separation);

    for (i = 1; i <= iCount; i++) {
        y = (i * lineOptions.separation);
        ctx.moveTo(0, y);
        ctx.lineTo(iWidth, y);
        ctx.stroke();
    }

    ctx.closePath();

    return;
}