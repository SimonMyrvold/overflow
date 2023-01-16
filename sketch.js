new p5();
const cols = 50;
const rows = 50;
var grid = new Array(cols);
const cellwidth = 650 / cols;
const cellHeight = 650 / rows;
const squares = (cols * rows);
let allowDiagonals = false;
let outputFailureP = undefined;
let outputSuccessP = undefined;
let outputSuccessContainer = undefined;
let outputFailureContainer = undefined;

// Lists
let openSet = [];
let closedSet = [];
let start;
let path = [];
let current;
let savePath = 1;
let piujdfrh = [];
let point = [];
let amountofpoints = 21;
let pathlength = 0;


function rmvFromOpen(arr, el){
    for(var i = arr.length; i >= 0; i--){
        if(arr[i] == el){
            arr.splice(i, 1);
        }
    }
}

function heuristic(a, b) {
    var d;
    d = abs(a.x - b.x) + abs(a.y - b.y);
    return d;
}



function startPathfinding(){
    clearPathfinding();
    loop();
    pathlength = 0;
}
function clearPathfinding(){
    openSet = [];
    closedSet = [];
    path = [];
    setup();
    draw();
    savePath = 1;
}
function setup(){
    background(0);
    frameRate(20);
    outputFailureP = select("#failureResultP");
    outputSuccessP = select("#successResultP");
    outputSuccessContainer = select(".success");
    outputFailureContainer = select(".failure");
    // allowDiagonals = diagInput.value();
    let cnv = createCanvas(650, 650);
    cnv.parent('canvasContainer');
    console.log("A* Pathfinding");
    // Create 2D array of spaces
    for(var i = 0; i < cols; i++){
        grid[i] = new Array(rows);
    }
    // Define squares
    for(var i = 0; i < cols; i++){
        for(var j = 0; j < rows; j++){
            grid[i][j] = new Square(i*cellwidth, j*cellHeight);
            
        }
    }

    function calculateCorner(x0, y0, r, n) {
        var theta = 2 * Math.PI / amountofpoints; // Angle between each corner in radians
        var x = Math.floor(x0 + r * Math.cos(theta * n));
        var y = Math.floor(y0 + r * Math.sin(theta * n));
        return [x, y];
      }
      
      var canvasSize = cols;
      var centerX = canvasSize / 2;
      var centerY = canvasSize / 2;
      var radius = canvasSize / 2 - 2; // Subtract 2 to leave a small border around the edges

      for (let i = -1; i < amountofpoints+1; i++) {
        piujdfrh[i] = calculateCorner(centerX, centerY, radius, i);

      }
      // Calculate and save the coordinates of the remaining corners in the same way

    startrandomX = piujdfrh[0][0];
    startrandomY = piujdfrh[0][1];

    for (let i = 0; i < amountofpoints+1; i++) {
        point[i] = grid[piujdfrh[i][0]][piujdfrh[i][1]];
    }
    
    start = grid[piujdfrh[0][0]][piujdfrh[0][1]];
    
    // Fill neighbors
    for(var i = 0; i < cols; i++){
        for(var j = 0; j < rows; j++){
            grid[i][j].addNeighbors(grid);
        }
    }
    openSet.push(point[0]); // Add start point to open list
    noLoop();
}


function draw(){
    
    if(openSet.length > 0){

        // Algorithm not done

        // find lowest F Cost
        let winner = 0;
        for(var i = 0; i < openSet.length; i++){
            if(openSet[i].fCost == openSet[winner].fCost){
                if(openSet[i].gCost > openSet[winner].gCost){
                    winner = i;
                }
            }
        }
        // Found End
        
        let current = openSet[winner];
        for (let i = 0; i < 3; i++) {
            
        }

        if(current == point[savePath]){
            var tmp = current;
            path.push(tmp);
            while(tmp.previous){
                path.push(tmp.previous);
                tmp = tmp.previous;
            }
            outputFailureP.html("")
            outputSuccessP.html("")
            pathlength = path.length - pathlength;
            outputSuccessP.html("Solution Found - " + pathlength + " Squares")
            outputSuccessContainer.addClass("show")
            savePath++;
            openSet = [];
            if (savePath == amountofpoints+1) {
                noLoop();
            }

        }
        if(current == start){
            var tmp = current;
            path.push(tmp);
            while(tmp.previous){
                path.push(tmp.previous);
                tmp = tmp.previous;
            }
            outputFailureP.html("")
            outputSuccessP.html("")
            outputSuccessContainer.addClass("show")
        }
        
        rmvFromOpen(openSet, current);        
        closedSet.push(current);

            const neighbors = current.neighbors;
            for(var i = 0; i < neighbors.length; i++){
                var neighbor = neighbors[i];
                if(!closedSet.includes(neighbor)){
                    const tempG = current.gCost + heuristic(neighbor, current);
                    if(!openSet.includes(neighbor)){
                        openSet.push(neighbor);
                    } else if(tempG >= neighbor.gCost){
                        continue;
                    }
                        neighbor.gCost = tempG;
                        neighbor.hCost = this.heuristic(neighbor, point[savePath]);
                        neighbor.fCost = neighbor.hCost + neighbor.gCost;
                        neighbor.previous = current;
                }
            }      


    } else{
        outputFailureP.html("")
        outputSuccessP.html("")
        outputFailureP.html("No Solution Found")
        outputFailureContainer.addClass("show")
    }

    
    stroke(0)
    for(var i = 0; i < cols; i++){
        for(var j = 0; j < rows; j++){
            grid[i][j].show(color(255, 255, 255));
        }
    }

    for(var i = 0; i < closedSet.length; i++){
        closedSet[i].show(color(255, 0, 0));
    }

    for(var i = 0; i < openSet.length; i++){
        openSet[i].show(color(0, 255, 0));
    }

    if(path){
        noFill();
        stroke(0);
        beginShape();
        for(var i = 0; i < path.length; i++){
            path[i].show(color(0, 0, 255));
            // vertex(path[i].x * cellwidth, path[i].y*cellHeight);
        }
        endShape();
    }

    for (let i = 0; i < point.length; i++) {
        point[i].show(color(255, 0, 239));   
    }
}