namespace Endabgabe {

    export class Tree extends DrawObject {
        color: string;

        constructor() {
            super();
            this.xP = 40 + Math.random() * 600;
            this.yP = 600 + Math.random() * 250;
            this.color = "#0B3B17";
        }

        draw(): void {
            crc2.fillStyle = "#8A4B08";
            crc2.fillRect(this.xP - 8, this.yP + 100, 12, 40);
            crc2.beginPath();
            crc2.moveTo(this.xP, this.yP);
            crc2.lineTo(this.xP + 40, this.yP + 110);
            crc2.lineTo(this.xP - 40, this.yP + 110);
            crc2.closePath();
            crc2.fillStyle = this.color;
            crc2.fill();
        }
    }
}