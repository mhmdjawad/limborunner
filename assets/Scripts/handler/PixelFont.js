import SpriteMaker from '../sprite/SpriteMaker.js';
export default class PixelFont{
    constructor(size=8, color = "#fff"){
        this.size = size;
        var t = SpriteMaker.imageToCanvas(GLOBAL.Assets.images['black-font-8.gif']);
        var magnify = SpriteMaker.magnify(t,size/8);
        var colored = SpriteMaker.transformCanvasColors(magnify,{"#ffffff":"_", '#000': color});
        this.chars = {};
        for (let [index, char] of [...GLOBAL.CHARS].entries()) {
            let c = SpriteMaker.crop(colored, index * size, 0, size, size);
            this.chars[char] = c;
        }
    }
    print(line, context, x, y, center = false) {
        let size = this.size;
        let contextWidth = context.canvas.width;
        let possiblelinemax = Math.floor(contextWidth / size);
        let newx = x;
        if(center){
            let emptycells = possiblelinemax - line.length;
            let cellsbeforeText = Math.floor(emptycells/2);
            newx = x + cellsbeforeText * size;
        }
        [...line.toUpperCase()].forEach((char, pos) => {
            let bufferForchar = this.chars[char];
            context.drawImage(
                bufferForchar,
                newx + pos * size,
                y,
                size,
                size);
        });
    }
    printLines(lines,context, x, y,center = false){
        let contextWidth = context.canvas.width;
        let size = this.size;
        let possiblelinemax = Math.floor(contextWidth / size);
        let currentrow = y;
        [...lines].forEach(line=>{
            let newx = x;
            if(center){
                let emptycells = possiblelinemax - line.length;
                let cellsbeforeText = Math.floor(emptycells/2);
                newx = x + cellsbeforeText * size;
            }
            this.print(line,context,newx,currentrow);
            currentrow = currentrow + this.size * 5/4;
        });
    }
    createTextLayer(text,context) {
        let buffer = document.createElement('canvas');
        buffer.width = context.canvas.width;
        buffer.height = context.canvas.height;
        let ctx = buffer.getContext('2d');
        const size = this.size;
        const textW = text.length;
        const screenW = Math.floor(context.canvas.width / size);
        const screenH = Math.floor(context.canvas.height / size);
        const x = screenW / 2 - textW / 2;
        const y = screenH / 2;
        this.print(text, ctx, x * size, y * size);
        console.log(buffer);
        return buffer;
    }
}
