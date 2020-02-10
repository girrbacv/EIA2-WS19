var Endabgabe;
(function (Endabgabe) {
    window.addEventListener("load", init);
    let golden = 0.62;
    let objects = [];
    let birds = [];
    let imagedata;
    let fps = 25;
    let i = 0;
    let xMouse;
    let yMouse;
    let snowball;
    Endabgabe.score = 0;
    let gameEndbool = false;
    let trees = [];
    function listeners() {
        console.log("listeners");
        document.getElementsByTagName("canvas")[0].addEventListener("click", mouseEvent);
        //"Click"-Eventlistener vom Typ MouseEvent an canvas
    }
    function init() {
        let anleitung = document.getElementById("Anleitung");
        anleitung.addEventListener("click", startGame);
        let ende = document.getElementById("ende");
        ende.classList.add("canvassize");
        //Nach laden der Seite wird die Funktion init aufgerufen, die an das HtmlElement "Anleitung" einen click-Eventlistener anhängt, 
        //der die Funktion startGame aufruft
        //an das HTML Element "ende" die Klasse 
    }
    function startGame() {
        let nameinput = document.getElementById("nameinput");
        Endabgabe.name = nameinput.value;
        anzeigeCanvas();
        listeners();
        console.log("maininit");
        let canvas = document.getElementsByTagName("canvas")[0];
        Endabgabe.crc2 = canvas.getContext("2d");
        drawBackground();
        drawSun();
        drawCloud();
        drawCloud2();
        drawCloud3();
        drawMountains();
        drawBirdhouse();
        drawSnowman();
        drawTrees();
        //generateChild();
        //generateSlowChildren();
        generateSnow();
        imagedata = Endabgabe.crc2.getImageData(0, 0, canvas.width, canvas.height);
        setTimeout(gameEnds, 180000);
        update();
    }
    function anzeigeCanvas() {
        document.getElementsByTagName("canvas")[0].classList.remove("canvassize");
        document.getElementsByTagName("div")[0].classList.add("canvassize");
    }
    function update() {
        Endabgabe.crc2.clearRect(0, 0, 1400, 900);
        Endabgabe.crc2.putImageData(imagedata, 0, 0);
        window.setTimeout(update, 1000 / fps);
        for (let i = 0; i < objects.length; i++) {
            let object = objects[i];
            object.draw();
            object.move();
        }
        if (snowball) {
            if (snowball.xP >= xMouse - 20 && snowball.xP <= xMouse + 20) {
                if (snowball.yP >= yMouse - 20 && snowball.yP <= yMouse + 20) {
                    console.log("ball angekommen");
                    checkIfHit();
                }
            }
        }
        drawScore();
    }
    //Schneeball
    function generateSnowball(_xMouse, _yMouse) {
        console.log(snowball);
        snowball = new Endabgabe.Snowball(_xMouse, _yMouse);
        //            console.log(snowball);
        console.log("neuer schneeball");
        objects.push(snowball);
    }
    function drawTrees() {
    }
    function mouseEvent(_event) {
        if (!snowball) {
            xMouse = _event.clientX;
            yMouse = _event.clientY;
            generateSnowball(xMouse, yMouse);
        }
    }
    function checkIfHit() {
        for (let i = 0; i < birds.length; i++) {
            if (xMouse >= birds[i].xP - 60 && xMouse <= birds[i].xP + 20) {
                if (yMouse >= birds[i].yP - 25 && yMouse <= birds[i].yP + 60) {
                    console.log("vogel getroffen", birds[i]);
                    birds.splice(i, 1);
                    for (let a = 0; a < objects.length; a++) {
                        if (objects[a].typ == "birds") { //|| objects[a].typ == "pickingBirds") {
                            if (xMouse >= objects[a].xP - 60 && xMouse <= objects[a].xP + 20) {
                                if (yMouse >= objects[a].yP - 25 && yMouse <= objects[a].yP + 60) {
                                    console.log("object getroffen");
                                    objects.splice(a, 1);
                                    let bird = new Endabgabe.Birds();
                                    objects.push(bird);
                                    birds.push(bird);
                                    if (objects[a].typ == "birds") {
                                        Endabgabe.score += 20;
                                    }
                                    /*else if (objects[a].typ == "pickingBirds") {
                                        score += 10;
                                    }*/
                                }
                            }
                        }
                    }
                }
            }
        }
        for (let i = 0; i < objects.length; i++) {
            if (objects[i].typ == "snowball") {
                objects.splice(i, 1);
                console.log("ball löschen");
                console.log(objects[i]);
            }
        }
        snowball = null;
    }
    function drawMountains() {
        //Hintere Reihe
        Endabgabe.crc2.fillStyle = "HSLA(360,0%,41%)";
        Endabgabe.crc2.beginPath();
        Endabgabe.crc2.moveTo(390, 210);
        Endabgabe.crc2.lineTo(550, 400);
        Endabgabe.crc2.lineTo(170, 400);
        Endabgabe.crc2.closePath();
        Endabgabe.crc2.fill();
        Endabgabe.crc2.fillStyle = "HSLA(0,100%,99%)";
        Endabgabe.crc2.beginPath();
        Endabgabe.crc2.moveTo(390, 210);
        Endabgabe.crc2.lineTo(435, 260);
        Endabgabe.crc2.lineTo(330, 260);
        Endabgabe.crc2.closePath();
        Endabgabe.crc2.fill();
        Endabgabe.crc2.fillStyle = "HSLA(360,0%,41%)";
        Endabgabe.crc2.beginPath();
        Endabgabe.crc2.moveTo(630, 110);
        Endabgabe.crc2.lineTo(400, 400);
        Endabgabe.crc2.lineTo(700, 400);
        Endabgabe.crc2.closePath();
        Endabgabe.crc2.fill();
        Endabgabe.crc2.fillStyle = "HSLA(0,100%,99%)";
        Endabgabe.crc2.beginPath();
        Endabgabe.crc2.moveTo(630, 109);
        Endabgabe.crc2.lineTo(597, 150);
        Endabgabe.crc2.lineTo(640, 150);
        Endabgabe.crc2.closePath();
        Endabgabe.crc2.fill();
        Endabgabe.crc2.fillStyle = "HSLA(360,0%,41%)";
        Endabgabe.crc2.beginPath();
        Endabgabe.crc2.moveTo(790, 170);
        Endabgabe.crc2.lineTo(600, 400);
        Endabgabe.crc2.lineTo(920, 400);
        Endabgabe.crc2.moveTo(910, 110);
        Endabgabe.crc2.lineTo(700, 400);
        Endabgabe.crc2.lineTo(1200, 400);
        Endabgabe.crc2.moveTo(1150, 110);
        Endabgabe.crc2.lineTo(1000, 400);
        Endabgabe.crc2.lineTo(1400, 400);
        Endabgabe.crc2.closePath();
        Endabgabe.crc2.fill();
        Endabgabe.crc2.fillStyle = "HSLA(0,100%,99%)";
        Endabgabe.crc2.beginPath();
        Endabgabe.crc2.moveTo(1150, 110);
        Endabgabe.crc2.lineTo(1127, 150);
        Endabgabe.crc2.lineTo(1186, 150);
        Endabgabe.crc2.closePath();
        Endabgabe.crc2.fill();
        //Vordere Reihe
        Endabgabe.crc2.fillStyle = "HSLA(360,0%,83%)";
        Endabgabe.crc2.beginPath();
        Endabgabe.crc2.moveTo(130, 170);
        Endabgabe.crc2.lineTo(400, 400);
        Endabgabe.crc2.lineTo(-100, 400);
        Endabgabe.crc2.closePath();
        Endabgabe.crc2.fill();
        Endabgabe.crc2.beginPath();
        Endabgabe.crc2.moveTo(520, 290);
        Endabgabe.crc2.lineTo(350, 400);
        Endabgabe.crc2.lineTo(550, 400);
        Endabgabe.crc2.closePath();
        Endabgabe.crc2.fill();
        Endabgabe.crc2.beginPath();
        Endabgabe.crc2.moveTo(800, 270);
        Endabgabe.crc2.lineTo(400, 400);
        Endabgabe.crc2.lineTo(890, 400);
        Endabgabe.crc2.closePath();
        Endabgabe.crc2.fill();
        Endabgabe.crc2.beginPath();
        Endabgabe.crc2.moveTo(1000, 100);
        Endabgabe.crc2.lineTo(800, 400);
        Endabgabe.crc2.lineTo(1200, 400);
        Endabgabe.crc2.closePath();
        Endabgabe.crc2.fill();
        Endabgabe.crc2.beginPath();
        Endabgabe.crc2.moveTo(1300, 230);
        Endabgabe.crc2.lineTo(1000, 400);
        Endabgabe.crc2.lineTo(1400, 400);
        Endabgabe.crc2.closePath();
        Endabgabe.crc2.fill();
        Endabgabe.crc2.fillStyle = "HSLA(0,100%,99%)";
        Endabgabe.crc2.beginPath();
        Endabgabe.crc2.moveTo(1000, 100);
        Endabgabe.crc2.lineTo(965, 150);
        Endabgabe.crc2.lineTo(1035, 150);
        Endabgabe.crc2.closePath();
        Endabgabe.crc2.fill();
    }
    /*function drawTrees(): void {
    crc2.fillStyle = "HSLA(25,76%,31%)";
    crc2.beginPath();
    crc2.fillRect(300, 500, 25, 80); //310
    crc2.fillRect(500, 500, 25, 80); //500
    crc2.fillRect(400, 470, 23, 80); //410
    crc2.fillRect(700, 650, 23, 80); //710
    crc2.closePath();
    crc2.fill();

    crc2.fillStyle = "HSLA(120,100%,20%)"
    crc2.beginPath();
    crc2.moveTo(310, 300);
    crc2.lineTo(260, 500);
    crc2.lineTo(360, 500);
    crc2.moveTo(410, 350);
    crc2.lineTo(360, 520);
    crc2.lineTo(460, 520);
    crc2.moveTo(510, 300);
    crc2.lineTo(460, 500);
    crc2.lineTo(560, 500);
    crc2.moveTo(710, 450);
    crc2.lineTo(660, 650);
    crc2.lineTo(760, 650);
    crc2.closePath();
    crc2.fill();


}*/
    //Schnee
    function generateSnow() {
        for (let i = 0; i < 70; i++) {
            let snowflake = new Endabgabe.Snow();
            objects.push(snowflake);
        }
    }
    function generateBird() {
        for (let i = 0; i < 5; i++) {
            let bird = new Endabgabe.Birds();
            objects.push(bird);
            birds.push(bird);
        }
    }
    /*function pickingBirds(): void {
        for (let i: number = 0; i < 5; i++) {
    
            let child: slowChildren = new slowChildren();
            objects.push(child);
            children.push(child);
        }
    }*/
    function gameEnds() {
        document.getElementsByTagName("canvas")[0].classList.add("canvassize");
        let ende = document.getElementById("ende");
        ende.classList.remove("canvassize");
        let reload = document.getElementById("reload");
        ende.classList.remove("canvassize");
        document.getElementById("yourScore").innerText = "Deine Punktzahl:" + " " + Endabgabe.score.toString();
        document.getElementById("reload").addEventListener("click", reload);
        DatabaseClient.insert();
        DatabaseClient.getHighscore();
    }
    function reload() {
        window.location.reload();
    }
    function drawCloud() {
        Endabgabe.crc2.beginPath();
        Endabgabe.crc2.arc(70, 170, 45, 0, 2 * Math.PI);
        Endabgabe.crc2.arc(140, 170, 60, 0, 2 * Math.PI);
        Endabgabe.crc2.arc(200, 170, 45, 0, 2 * Math.PI);
        Endabgabe.crc2.arc(240, 170, 30, 0, 2 * Math.PI);
        Endabgabe.crc2.fillStyle = "#FFFFFF";
        Endabgabe.crc2.fill();
    }
    function drawCloud2() {
        Endabgabe.crc2.beginPath();
        Endabgabe.crc2.arc(650, 100, 30, 0, 2 * Math.PI);
        Endabgabe.crc2.arc(810, 100, 60, 0, 2 * Math.PI);
        Endabgabe.crc2.arc(870, 100, 40, 0, 2 * Math.PI);
        Endabgabe.crc2.arc(750, 100, 70, 0, 2 * Math.PI);
        Endabgabe.crc2.arc(700, 100, 50, 0, 2 * Math.PI);
        Endabgabe.crc2.fillStyle = "#FFFFFF";
        Endabgabe.crc2.fill();
    }
    function drawCloud3() {
        Endabgabe.crc2.beginPath();
        Endabgabe.crc2.arc(595, 220, 15, 0, 2 * Math.PI);
        Endabgabe.crc2.arc(620, 220, 25, 0, 2 * Math.PI);
        Endabgabe.crc2.arc(650, 220, 30, 0, 2 * Math.PI);
        Endabgabe.crc2.arc(680, 220, 25, 0, 2 * Math.PI);
        Endabgabe.crc2.arc(705, 220, 15, 0, 2 * Math.PI);
        Endabgabe.crc2.arc(720, 220, 10, 0, 2 * Math.PI);
        Endabgabe.crc2.arc(730, 220, 8, 0, 2 * Math.PI);
        Endabgabe.crc2.arc(740, 220, 6, 0, 2 * Math.PI);
        Endabgabe.crc2.fillStyle = "#FFFFFF";
        Endabgabe.crc2.fill();
    }
    function drawBackground() {
        console.log("Background");
        let gradiant = Endabgabe.crc2.createLinearGradient(0, 0, 0, Endabgabe.crc2.canvas.height);
        gradiant.addColorStop(0, "HSL(197,71%,73%");
        gradiant.addColorStop(golden, "white");
        gradiant.addColorStop(1, "HSL(0, 100%, 99%)");
        Endabgabe.crc2.fillStyle = gradiant;
        Endabgabe.crc2.fillRect(0, 0, Endabgabe.crc2.canvas.width, Endabgabe.crc2.canvas.height);
    }
    function drawSun() {
        Endabgabe.crc2.beginPath();
        Endabgabe.crc2.arc(150, 100, 70, 0, 2 * Math.PI);
        Endabgabe.crc2.fillStyle = "#fff91d";
        Endabgabe.crc2.fill();
    }
    function drawBirdhouse() {
        //Pfahl
        Endabgabe.crc2.fillStyle = "HSLA(34,57%,70%)";
        Endabgabe.crc2.beginPath();
        Endabgabe.crc2.fillRect(100, 500, 15, 100);
        Endabgabe.crc2.closePath();
        Endabgabe.crc2.fill();
        //Häuschen
        Endabgabe.crc2.fillStyle = "HSLA(34,57%,70%)";
        Endabgabe.crc2.beginPath();
        Endabgabe.crc2.fillRect(78, 480, 60, 40);
        Endabgabe.crc2.closePath();
        Endabgabe.crc2.fill();
        //"Loch"
        Endabgabe.crc2.fillStyle = "black";
        Endabgabe.crc2.beginPath();
        Endabgabe.crc2.arc(108, 500, 10, 0, 2 * Math.PI);
        Endabgabe.crc2.closePath();
        Endabgabe.crc2.fill();
        //Dach
        Endabgabe.crc2.fillStyle = "HSLA(0,53%,58%)";
        Endabgabe.crc2.beginPath();
        Endabgabe.crc2.moveTo(110, 430);
        Endabgabe.crc2.lineTo(68, 480);
        Endabgabe.crc2.lineTo(150, 480);
        Endabgabe.crc2.closePath();
        Endabgabe.crc2.fill();
    }
    //Bäume
    /*function drawTrees(): void {
        crc2.fillStyle = "HSLA(25,76%,31%)";
        crc2.beginPath();
        crc2.fillRect(300, 500, 25, 80); //310
        crc2.fillRect(500, 500, 25, 80); //500
        crc2.fillRect(400, 470, 23, 80); //410
        crc2.fillRect(700, 650, 23, 80); //710
        crc2.closePath();
        crc2.fill();

        crc2.fillStyle = "HSLA(120,100%,20%)"
        crc2.beginPath();
        crc2.moveTo(310, 300);
        crc2.lineTo(260, 500);
        crc2.lineTo(360, 500);
        crc2.moveTo(410, 350);
        crc2.lineTo(360, 520);
        crc2.lineTo(460, 520);
        crc2.moveTo(510, 300);
        crc2.lineTo(460, 500);
        crc2.lineTo(560, 500);
        crc2.moveTo(710, 450);
        crc2.lineTo(660, 650);
        crc2.lineTo(760, 650);
        crc2.closePath();
        crc2.fill();


    }*/
    //Schneemann
    function drawSnowman() {
        //Unterste Kugel
        Endabgabe.crc2.fillStyle = "#FdF5E6";
        Endabgabe.crc2.beginPath();
        Endabgabe.crc2.arc(900, 550, 50, 0, 2 * Math.PI);
        Endabgabe.crc2.closePath();
        Endabgabe.crc2.fill();
        //Mittlere Kugel
        Endabgabe.crc2.beginPath();
        Endabgabe.crc2.arc(900, 480, 40, 0, 2 * Math.PI);
        Endabgabe.crc2.closePath();
        Endabgabe.crc2.fill();
        //Kopf
        Endabgabe.crc2.beginPath();
        Endabgabe.crc2.arc(899, 420, 30, 0, 2 * Math.PI);
        Endabgabe.crc2.closePath();
        Endabgabe.crc2.fill();
        //Nase
        Endabgabe.crc2.fillStyle = "HSLA(16,100%,50%)";
        Endabgabe.crc2.beginPath();
        Endabgabe.crc2.moveTo(860, 430);
        Endabgabe.crc2.lineTo(893, 420);
        Endabgabe.crc2.lineTo(893, 430);
        Endabgabe.crc2.closePath();
        Endabgabe.crc2.fill();
        //Augen
        Endabgabe.crc2.fillStyle = "black";
        Endabgabe.crc2.beginPath();
        Endabgabe.crc2.arc(885, 413, 4, 0, 2 * Math.PI);
        Endabgabe.crc2.arc(900, 413, 4, 0, 2 * Math.PI);
        Endabgabe.crc2.closePath();
        Endabgabe.crc2.fill();
        //Hut
        Endabgabe.crc2.beginPath();
        Endabgabe.crc2.fillRect(862, 380, 70, 20);
        Endabgabe.crc2.fillRect(875, 347, 45, 50);
        Endabgabe.crc2.closePath();
        Endabgabe.crc2.fill();
    }
    function drawScore() {
        Endabgabe.crc2.beginPath();
        Endabgabe.crc2.moveTo(50, 700);
        Endabgabe.crc2.lineTo(300, 700);
        Endabgabe.crc2.lineTo(300, 770);
        Endabgabe.crc2.lineTo(50, 770);
        Endabgabe.crc2.closePath();
        Endabgabe.crc2.fillStyle = "HSLA(182,25%,50%)";
        Endabgabe.crc2.fill();
        Endabgabe.crc2.lineWidth = 1.5;
        Endabgabe.crc2.strokeStyle = "black";
        Endabgabe.crc2.stroke();
        Endabgabe.crc2.font = "55px Amatic SC";
        Endabgabe.crc2.fillStyle = "#000000";
        Endabgabe.crc2.fillText("Score", 85, 750);
        Endabgabe.crc2.font = "55px Amatic SC";
        Endabgabe.crc2.fillStyle = "#000000";
        Endabgabe.crc2.fillText(Endabgabe.score.toString(), 200, 750);
    }
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=Main.js.map