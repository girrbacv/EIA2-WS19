namespace Alley {
    interface Vector {
        x: number;
        y: number;
    }

    window.addEventListener("load", handleLoad);
    let crc2: CanvasRenderingContext2D;
    let golden: number = 0.62;
    
    function handleLoad(_event: Event): void {
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        let horizon: number = crc2.canvas.height * golden;

        drawBackground();
        drawSun({x: 80, y: 45});
        drawCloud({x: 500, y: 40} , {x: 250, y: 75});
       // drawStreet({x: crc2.canvas.width / 2, y: horizon}, 100, 600);
        drawMountains({x: 0, y: horizon}, 75, 200, "HSLA(360, 0%, 40%)", "HSLA(0, 100%, 99%)");
        drawMountains({x: 0, y: horizon}, 50, 100, "HSLA(360, 0%, 40%)", "HSLA(360, 0%, 70%)");
        //drawTrees({x: 0, y: horizon}, 500, 100);

    }
   

    function drawBackground(): void {
        console.log("Background");       
        let gradiant: CanvasGradient = crc2.createLinearGradient(0, 0, 0, crc2.canvas.height);
        gradiant.addColorStop(0, "HSL(180, 100%, 97%)");
        gradiant.addColorStop(golden, "white");
        gradiant.addColorStop(1, "HSL(0, 100%, 99%)");

        crc2.fillStyle = gradiant;
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
    }
    function drawSun(_position: Vector): void { 
        console.log("Sun", _position);  
        let r1: number = 30;
        let r2: number = 150;
        let gradiant: CanvasGradient = crc2.createRadialGradient(0, 0, r1, 0, 0, r2);
        
        gradiant.addColorStop(0, "HSLA(60, 100%, 90%, 1)");
        gradiant.addColorStop(1, "HSLA(60, 100%, 50%, 0)");
        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.fillStyle = gradiant;
        crc2.arc(0, 0, r2, 0, 2 * Math.PI);
        crc2.fill();
        crc2.restore();      
    }
    function drawCloud(_position: Vector, _size: Vector): void {
        console.log("Cloud", _position, _size);  
        
        let nParticles: number = 20;
        let radiusParticle: number = 50;
        let particle: Path2D = new Path2D();
        let gradiant: CanvasGradient = crc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);

        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
        gradiant.addColorStop(0, "red");
        gradiant.addColorStop(0, "HSLA(360, 0%, 96%, 1");

        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.fillStyle = gradiant;

        for (let drawn: number = 0; drawn < nParticles; drawn++) {
            crc2.save();
            let x: number = (Math.random() - 0.5) * _size.x;
            let y: number = (Math.random() * _size.y);
            crc2.translate(x, y);
            crc2.fill(particle);
            crc2.restore();
        }
        crc2.restore();
    }

   /*function drawStreet(_position: Vector, _widthBack: number, _widthFront: number): void {
       crc2.beginPath();
       crc2.moveTo(_position.x + _widthBack / 2, _position.y);
       crc2.lineTo(crc2.canvas.width / 2 + _widthFront / 2, crc2.canvas.height);
       crc2.lineTo(crc2.canvas.width / 2 - _widthFront / 2, crc2.canvas.height);
       crc2.lineTo(_position.x - _widthBack / 2, _position.y);
       crc2.closePath();

       let gradiant: CanvasGradient = crc2.createLinearGradient(0, _position.y, 0, crc2.canvas.height);
       gradiant.addColorStop(0, "darkgrey");
       gradiant.addColorStop(0.6, "black");

       crc2.fillStyle = gradiant;
       crc2.fill();
   }*/

    function drawMountains(_position: Vector, _min: number, _max: number, _colorLow: string, _colorHigh: string) : void{
       console.log("Mountains");
       let stepMin: number = 50;
       let stepMax: number = 150;
       let x: number = 0;

       crc2.save();
       crc2.translate(_position.x, _position.y);
       crc2.beginPath();
       crc2.moveTo(0, 0);
       crc2.lineTo(0, - _max);
       
       do {
           x += stepMin + Math.random() * (stepMax - stepMin);
           let y: number =  - _min - Math.random() * (_max - _min);

           crc2.lineTo(x, y);

       } while (x < crc2.canvas.width);

       crc2.lineTo(x, 0);
       crc2.closePath();

       let gradiant: CanvasGradient = crc2.createLinearGradient(0, 0, 0, -_max);
       gradiant.addColorStop(0, _colorLow);
       gradiant.addColorStop(0.7, _colorHigh);

       crc2.fillStyle = gradiant;
       crc2.fill();
       crc2.restore();
   }

    /*function drawTrees(_position: Vector, _widthBack: number, _widthFront: number): void {
    console.log("Tree");


    // let x: number = Math.random() * 800;
    let blätterZahl: number = 300;
    let maxRadius: number = 66;
    let blätter: Path2D = new Path2D();
    blätter.arc(500, 450, maxRadius, 0, 2 * Math.PI);

    // Baumstamm
    crc2.fillStyle = "HSL(30, 80%, 30%)";
    crc2.fillRect(460, 450, 100, -200);
    crc2.save();
    crc2.translate(0, -120);

    do {
        let y: number = Math.random() * 190; // Höhe der Blätter
        let x: number = (Math.random() - 0.5) * 2 * maxRadius; // Radius der Kreise und Blätter

        crc2.save();
        crc2.translate(x, -y);

        let colorAngle: number = 123 - Math.random() * 60; // Farbe der Blätter
        let color: string = "HSLA(" + colorAngle + ", 50%, 30%, 0.5)";

        crc2.fillStyle = color;
        crc2.fill(blätter);
        crc2.restore();
    } while (--blätterZahl > 0);

    crc2.restore();
    crc2.setTransform(transform);
}*/


}