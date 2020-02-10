var Endabgabe;
(function (Endabgabe) {
    class Tree extends Endabgabe.DrawObject {
        constructor() {
            super();
            this.xP = 40 + Math.random() * 600;
            this.yP = 600 + Math.random() * 250;
            this.color = "#0B3B17";
        }
        draw() {
            Endabgabe.crc2.fillStyle = "#8A4B08";
            Endabgabe.crc2.fillRect(this.xP - 8, this.yP + 100, 12, 40);
            Endabgabe.crc2.beginPath();
            Endabgabe.crc2.moveTo(this.xP, this.yP);
            Endabgabe.crc2.lineTo(this.xP + 40, this.yP + 110);
            Endabgabe.crc2.lineTo(this.xP - 40, this.yP + 110);
            Endabgabe.crc2.closePath();
            Endabgabe.crc2.fillStyle = this.color;
            Endabgabe.crc2.fill();
        }
    }
    Endabgabe.Tree = Tree;
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=Tree.js.map