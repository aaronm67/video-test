$(function() {
	var vid = $("video");
	var canvas = $("canvas");
	
	var width = vid.width();
	var height = vid.height();
	canvas.width(width);
	canvas.height(height);
	
	var ctx = canvas[0].getContext("2d");
	
	vid.on("play", function(e) {
		start();
	});

	vid.on("stop pause", function(e) {
		stop();
	});

	var interval;
	function start() {
		interval = setInterval(drawVid, 15);
	}

	function stop() {
		clearInterval(interval);
	}

	function drawVid() {
		console.log("draw");
		ctx.drawImage(vid[0], 0, 0, width, height);
		var data = process(ctx);
		ctx.putImageData(data, 0, 0);
	}
	
	function process(ctx) {
		var data = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);						
		
		// remove all the red from imagedata
		for (var i = 0; i < data.data.length; i+= 4) {
			data.data[i] = 0;
		}
		
		return data;
	}		
});			
			/*
			    function getColorArray(ctx) {
			        var imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
			        var width = imageData.width;
			        var height = imageData.height;
			        var data = imageData.data;

			        var colors = [];
			        for (var y = 0; y < height; y++) {
			            var row = [];
			            for (var x = 0; x < width; x++) {
			                var idx = ((width * y) + x) * 4;
			                var r = data[idx];
			                var g = data[idx + 1];
			                var b = data[idx + 2];
			                var a = data[idx + 3];
			                row.push([r, g, b, a]);
			            }

			            colors[y] = row;
			        }

			        return colors;
			    }

*/