export const minX = 0;
export const minY = 0;

export class RandomWalker  {

    constructor(pixelSize = 10, rows = 50, columns = 50, speed = 100) {
        this.pixelSize = pixelSize;
        this.columns = columns;
        this.rows = rows;
        this.speed = speed;
        this.withDivs = false;
        this.walkers = [
            // {startingI: rows/2, startingJ: columns/2, color: 'black'}
        ];
    }

    generateGrid() {
        // add height and width to the wrapper div
        $('#wrapper').css({"height": this.pixelSize * this.rows, "width": this.pixelSize * this.columns});
        let i, j;
        for (i = 0; i < this.rows; i++) {
            for (j = 0; j < this.columns; j++) {
                $("#wrapper").append("<div class='box' id='" + i + '_' + j + "'></div>");
            }
        }
        $('.box').css({"width": this.pixelSize, "height": this.pixelSize});
    }

    addWalker(startingX, startingY, color) {
        this.walkers.push({startingI: startingX, startingJ: startingY, color: color});
        return this.walkers.slice(-1)[0];
    }

    move(walker, x, y) {
        let newX = x;
        let newY = y;

        if (x >= this.rows) {
                newX--;
        } else if(x <= minX) {
            newX++;
        } else {
            Math.random() > 0.5 ? newX++ : newX--;
        }

        if (y >= this.columns) {
            newY--;
        } else if (y <= minY) {
            newY++;
        } else {
            Math.random() > 0.5 ? newY++ : newY--;
        }

        return [newX,newY];
    }

    start() {
        // generate grid first
        this.generateGrid();

        // add walkers
        this.walkers.forEach((walker) => {
            this.startWalker(walker)
        });
    }

    setAsVisited(walker, x, y) {
        let currentBlock = $('#' + x + '_' + y);

        if(currentBlock.hasClass("visited")) {
            let opacity = parseFloat(currentBlock.css('opacity'));
            opacity += 0.1;
            currentBlock.css({"opacity": opacity});
        } else {
            currentBlock.css({"background": walker.color, 'opacity': 0.1});
            currentBlock.addClass('visited');
        }
    }

    startWalker(walker) {
        let previousX = walker.startingI;
        let previousY = walker.startingJ;

        let interval = setInterval(() => {
        // let n =0;
        // while(n<3000) {
        //     n++;
            let valuePair = this.move(walker, previousX, previousY);
            previousX = valuePair[0];
            previousY = valuePair[1];
            if(previousX == -1 && previousY == -1) {
                clearInterval(interval);
            }
            this.setAsVisited(walker, previousX, previousY);
        // }
        },this.speed);
    }

}

let randomWalker = new RandomWalker(10, 50, 50, 10);
randomWalker.addWalker(25,25,'#ECD078');
randomWalker.addWalker(0,0,'#D95B43');
randomWalker.addWalker(49,49,'#C02942');
randomWalker.addWalker(49,0,'#542437');
randomWalker.addWalker(0,49,'#53777A');
randomWalker.start();



