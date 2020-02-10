var Endabgabe;
(function (Endabgabe) {
    class Birds extends Endabgabe.DrawObject {
        constructor() {
            super();
            this.xP = Math.random() * 300 + 150;
            this.yP = Math.random() * 100 + 360;
            this.colorBody = "hsl(" + Math.random() * 360 + ", 90%, 80%)";
        }
        move() {
            if (this.md == true)
                this.moveDown();
            else {
                this.moveUp();
            }
        }
        moveDown() {
            this.xD = 10;
            this.yD = 3;
            this.xP += this.xD;
            this.yP += this.yD;
            if (this.xP > 1400) {
                this.md = false;
            }
        }
        moveUp() {
            this.xD = Math.random() * (-10);
            this.yD = Math.random() * (-3);
            this.xP += this.xD;
            this.yP += this.yD;
            if (this.xP < 50) {
                this.md = true;
            }
            this.draw();
        }
        draw() {
            //Kinder
            Endabgabe.crc2.beginPath();
            Endabgabe.crc2.fillStyle = "#FFD8BE";
            Endabgabe.crc2.arc(this.xP - 20, this.yP - 10, 8, 0, 2 * Math.PI);
            Endabgabe.crc2.fill();
            Endabgabe.crc2.beginPath();
            Endabgabe.crc2.fillStyle = this.colorBody;
            Endabgabe.crc2.fillRect(this.xP - 25, this.yP + 2, 15, 30);
            Endabgabe.crc2.stroke();
            Endabgabe.crc2.fill();
            //Schlitten
            Endabgabe.crc2.beginPath();
            Endabgabe.crc2.moveTo(this.xP - 37, this.yP + 25);
            Endabgabe.crc2.lineTo(this.xP - 10, this.yP + 42);
            Endabgabe.crc2.lineTo(this.xP - 6, this.yP + 43);
            Endabgabe.crc2.lineWidth = 3;
            Endabgabe.crc2.lineCap = "round";
            Endabgabe.crc2.strokeStyle = "#000000";
            Endabgabe.crc2.stroke();
            Endabgabe.crc2.fill();
        }
    }
    Endabgabe.Birds = Birds;
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=birds.js.map