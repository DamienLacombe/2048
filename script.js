window.onload = () => {

    const initBoardData = () => {
        boardDataTmp = new Array(1); 
        for (let i = 0; i < 4; i++) {
            boardDataTmp[i] = new Array(4);
        }
        return(boardDataTmp);
    }
    const btn = document.querySelector(".btn");
    const container = document.querySelector(".container");
    const board = document.createElement('canvas');
    const scoreArray = document.createElement('canvas');
    const context = scoreArray.getContext('2d');
    const ctx = board.getContext('2d');
    const ratio = window.devicePixelRatio;
    const boardWidth = 421;
    const boardHeigth = 421;
    const block = 400 / 4 * ratio;
    const boardData = initBoardData();
    const scoreArrayW = 425;
    const scoreArrayH = 60;
    let score = 0;
    let direction = "";
    let validDirection = true;
    let end = 0;
    scoreArray.width = scoreArrayW * ratio;
    scoreArray.height = scoreArrayH * ratio;
    scoreArray.style.width = scoreArrayW + "px";
    scoreArray.style.height = scoreArrayH + "px";
    board.width = boardWidth * ratio;
    board.height = boardHeigth * ratio;
    board.style.width = boardWidth + "px";
    board.style.height = boardHeigth + "px";
    board.style.backgroundColor = "#F7F2FF";
    board.style.border = "black solid 8px";
    
    class Pawn {
        constructor(score,change,color) {
            this.score = 2;
            this.change = false;
            this.color = ["#FFF7C7","#FFEF95","#FFDA7A","#FFBF7B","#FFA74A","#FE8F58","#FE6C58","#FF4343","#FF5E8C","#FF5EDA","#E25EFF","#BE5EFF","#925EFF","#5E69FF"];
        }
    }
    
    const boardUpdate = () => {
        let a = 0;
        validDirection = false;
        
        if (direction === "left") {
            while (a < 3) {  
                for (let x = 0; x < boardData.length ; x++) {
                    for (let y = 0; y < boardData.length; y++) {
                        if (boardData[y][x] != undefined && x > 0 && boardData[y][x - 1] === undefined) {
                           boardData[y][x - 1] = boardData[y][x];
                           boardData[y][x] = undefined; 
                           validDirection = true;
                        }
                        else if (boardData[y][x - 1] !== undefined && boardData[y][x] != undefined) {
                            if ( boardData[y][x - 1].score === boardData[y][x].score && boardData[y][x - 1].change === false && boardData[y][x].change === false) {
                                boardData[y][x - 1].score = boardData[y][x - 1].score * 2;
                                boardData[y][x - 1].change = true;
                                score += boardData[y][x - 1].score;
                                boardData[y][x - 1].color.splice(0,1);
                                boardData[y][x] = undefined;
                                validDirection = true;
                            }
                        }
                    }
                }
                a++; 
            }
        }
        if (direction === "right") {
            while (a < 3) {  
                for (let x = 3; x >= 0; x--) {
                    for (let y = 3; y >= 0; y--) {
                        if (boardData[y][x] != undefined && x < 3 && boardData[y][x + 1] === undefined) {
                           boardData[y][x + 1] = boardData[y][x];
                           boardData[y][x] = undefined; 
                           validDirection = true;
                        }
                        else if (boardData[y][x + 1] !== undefined && boardData[y][x] != undefined) {
                            if ( boardData[y][x + 1].score === boardData[y][x].score && boardData[y][x + 1].change === false && boardData[y][x].change === false) {
                                boardData[y][x + 1].score = boardData[y][x + 1].score * 2;
                                boardData[y][x + 1].change = true;
                                score += boardData[y][x + 1].score;
                                boardData[y][x + 1].color.splice(0,1);
                                boardData[y][x] = undefined;
                                validDirection = true;
                            }
                        }
                    }
                }
                a++; 
            }
        }
        if (direction === "up") {
            while (a < 3) {
                for (let x = 0; x < boardData.length ; x++) {
                    for (let y = 0; y < boardData.length ; y++) {
                        if (boardData[y][x] != undefined && y > 0 && boardData[y - 1][x] === undefined) {
                           boardData[y - 1][x] = boardData[y][x];
                           boardData[y][x] = undefined; 
                           validDirection = true;
                        }
                        else if (y > 0 && boardData[y - 1][x] != undefined && boardData[y][x] != undefined  ) {
                            if ( boardData[y - 1][x].score === boardData[y][x].score && boardData[y - 1][x].change === false && boardData[y][x].change === false) {
                            boardData[y - 1][x].score = boardData[y - 1][x].score * 2;
                            boardData[y - 1][x].change = true;
                            score += boardData[y - 1][x].score;
                            boardData[y - 1][x].color.splice(0,1);
                            boardData[y][x] = undefined;
                            validDirection = true;
                            }
                        }  
                    }
                }
                a++;
            }
        }
        if (direction === "down") {
            while (a < 3) {  
                for (let x = 3; x >= 0; x--) {
                    for (let y = 3; y >= 0; y--) {
                        if (boardData[y][x] != undefined && y < 3 && boardData[y + 1][x ] === undefined) {
                           boardData[y + 1][x ] = boardData[y][x];
                           boardData[y][x] = undefined; 
                           validDirection = true;
                        }
                        else if (y < 3 && boardData[y + 1][x] !== undefined && boardData[y][x] != undefined) {
                            if (boardData[y + 1][x].score === boardData[y][x].score && boardData[y + 1][x].change === false && boardData[y][x].change === false) {
                                boardData[y + 1][x].score = boardData[y + 1][x].score * 2;
                                boardData[y + 1][x].change = true;
                                score += boardData[y + 1][x].score; 
                                boardData[y + 1][x].color.splice(0,1);
                                boardData[y][x] = undefined;
                                validDirection = true;
                            }
                        }
                    }
                }
                a++; 
            }
        }
    }

    const checkEnd = () => {
        for (let x = 0; x < boardData.length ; x++) {
            for (let y = 0; y < boardData.length ; y++) {
               if (boardData[y][x] === undefined) {
                    end = 1;
               }
            }
        }
        if (end !== 1) {
            if (boardData[0][0].score === boardData[0][1].score || boardData[0][0].score === boardData[1][0].score || boardData[0][3].score === boardData[0][2].score || boardData[0][3].score === boardData[1][3].score || boardData[3][0].score === boardData[2][0].score || boardData[3][0].score === boardData[3][1].score || boardData[3][3].score === boardData[3][2].score || boardData[3][3].score === boardData[2][3].score || boardData[1][0].score === boardData[2][0].score || boardData[0][1].score === boardData[0][2].score || boardData[1][3].score === boardData[2][3].score || boardData[3][1].score === boardData[3][2].score) {
                end = 1;
            } 
            for (let x = 0; x < boardData.length ; x++) {
                for (let y = 0; y < boardData.length ; y++) {
                   if (x > 0 && x < 3 && y > 0 && y < 3) {
                       if (boardData[y][x].score === boardData[y + 1][x].score || boardData[y][x].score === boardData[y - 1][x].score || boardData[y][x].score === boardData[y][x + 1].score || boardData[y][x].score === boardData[y][x - 1].score) {
                         end = 1;
                       } 
                   }
                }
            }
        }
        if (end !== 1) {
            ctx.fillStyle = "rgba(241, 243, 241, 0.820)";
            ctx.fillRect(0,0,boardWidth * ratio,boardHeigth * ratio);
            ctx.font = "bold 80px sans-serif";
            ctx.fillStyle = "black";
            ctx.shadowOffsetX = 4;
            ctx.shadowOffsetY = 4;
            ctx.shadowBlur = 5;
            ctx.shadowColor = 'rgba(0, 0, 0, 2)'; 
            let textEnd = ctx.measureText("PERDU");
            ctx.fillText("PERDU",boardWidth / 2 * ratio - textEnd.width / 2,boardHeigth /2 * 1.1);
        }
        end = 0;
    }

    const newPawn = () => {
        let x = Math.floor(Math.random() * Math.floor(4));
        let y = Math.floor(Math.random() * Math.floor(4));
        if (boardData[x][y] != undefined) {
            newPawn();
        }
        else 
        boardData[x][y] = new Pawn;
    }

    const initScoreArray = () => {
        context.clearRect(0,0,scoreArrayW, scoreArrayH)
        context.fillStyle = "black";
        context.font = "bold 60px sans-serif";
        context.textAlign = "start";
        context.textBaseline = "top";
        context.fillText(`Score : ${score.toString(10)}`,0,0);
    }

    const initBoard = () => {
        let i = 0;
        let x = 1;
        let y = 1;
        ctx.clearRect(0,0, boardWidth * ratio, boardHeigth * ratio);
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 0;
        while (x < 4 ) {
            y = 0;
            ctx.fillStyle = "black";
            ctx.fillRect(x * block + i * ratio, y, 7 * ratio, boardWidth * ratio);
            x++;
            i+=7;  
        }
        i = 0;
        y = 1;
        while (y < 4 ) {
            x = 0;
            ctx.fillStyle = "black";
            ctx.fillRect(x, y * block + i * ratio, boardWidth * ratio, 7 * ratio);
            y++;
            i+=7;
        }
        if (validDirection === true) {
            newPawn();
        }
        container.appendChild(board);
        container.appendChild(scoreArray);
        initScoreArray();
        drawBoard();
        checkEnd();
    } 

    const drawBoard = () => {
        for (let x = 0; x < boardData.length; x++) {
            for (let y = 0; y < boardData.length; y++) {
                if (boardData[y][x] != undefined) {
                    let widthText = 2;
                    let heightText = 2;
                    boardData[y][x].change = false;
                    let scoreText = boardData[y][x].score;
                    ctx.fillStyle = boardData[y][x].color[0];
                    ctx.fillRect(x * block + 7 * x * ratio, y * block + 7 * y * ratio, block, block);
                    ctx.fillStyle = "black";
                    ctx.font = "bold 80px sans-serif";
                    const text = ctx.measureText(boardData[y][x].score.toString(10));
                    if (text.width > block) {
                        ctx.font = "bold 55px sans-serif";
                        widthText = 2.8;
                        heightText = 2.3;
                    }
                    ctx.fillText(scoreText.toString(10),x * block + 7 * x * ratio + block / 2 - text.width / widthText, y * block + 7 * y * ratio + block / heightText + 30,block + 40);
                }
            }
        }
    }

    window.onkeydown = (e) => {

        key = e.keyCode
        if (key === 39) {
            direction = "right";
            boardUpdate();
            initBoard();
        }
        else if (key === 37) {
            direction = "left";  
            boardUpdate();
            initBoard();

        }
        else if (key === 38) {
            direction = "up";
            boardUpdate();
            initBoard();
        }
        else if (key === 40) {
            direction = "down";
            boardUpdate();
            initBoard();
        }
    }

    const reset = () => {
        for (let x = 0; x < boardData.length; x++) {
            for (let y = 0; y < boardData.length; y++) {
                boardData[y][x] = undefined;
            }
        }
        score = 0;
        validDirection = true;
        initBoard();
    }

    btn.addEventListener("click", reset);
    initBoard();
}