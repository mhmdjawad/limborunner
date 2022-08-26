import Rectangle from '../module/Rectangle.js';
export class Paint{
	static drawGrid(ctx,x,y,w,h,size,color1,color2){
        if(size < 1) return;
        let countR = w / size;
        let countC = h / size;
        //rows
        for(let i =0 ; i <= countR ; i++){
            ctx.strokeStyle = (i%2 ==0 ) ? color1 : color2;
            ctx.beginPath();
            ctx.moveTo(x + i * size ,y + 0);
            ctx.lineTo(x + i * size ,y + h);
            ctx.stroke();
        }
        //columns
        for(let i =0 ; i <= countC ; i++){
            ctx.strokeStyle = (i%2 ==0 ) ? color1 : color2;
            ctx.beginPath();
            ctx.moveTo(x + 0, y + i * size );
            ctx.lineTo(x + w, y + i * size );
            ctx.stroke();
        }
	}
	static drawBord(ctx,x,y,w,h,size,col1,col2,drawLetters = false){
        let blocks = this.makeBoardBlocks(x,y,w,h,size,col1,col2,drawLetters);
        this.blocks = blocks;
        [...this.blocks].forEach(block=>{
            block.draw(ctx);
        })
    }
    static makeBoardBlocks(x,y,w,h,size,col1,col2,drawLetters = false){
        if(this.blocks) return this.blocks;
        let countR = w / size;
        let countC = h / size;
        let blocks = [];
        // let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
        for(let i = 0; i < countR;i++){
            for(let j = 0 ; j < countC;j++){
                let style,fill;
                if(((i % 2 ==0 || j %2 == 0) && !(i % 2 == 0 && j %2 == 0) )){
                    fill = col1;
                    style = col2;
                }
                else{
                    fill = col2;
                    style = col1;
                }
                let center = {
                    x : x + i * size + size/2 ,
                    y : y + j * size + size/2 
                };
                let letter ='';
                if(drawLetters){
                    if(i ==0 //|| i == countR-1
                        ){
                        // letter = (countC - j).toString();    //reverse
                        letter = (j+1).toString();
                    }
                    else if(j == 0 //|| j == countC-1
                        ){
                        // letter = (countC - i).toString();    //reverse
                        letter = (i+1).toString();
                    }
                }
                
                let block = new ChessCell(center,size,size,fill,letter,style);
                block.setRowCol(i+1,j+1);
                blocks.push(block);
            }
        }
        return this.blocks = blocks;
    }
}
export class ChessCell extends Rectangle{
    constructor(center,width,height,fill, letter,style){
        super(center,width,height,fill);
        this.letter = letter;
        this.style = style;
    }
    setRowCol(r,c){
        this.cell = {
            r:r,
            c:c
        };
    }
    draw(ctx){
        super.draw(ctx);
        if(this.letter.length > 0){
            ctx.font = "16px sans-serif";
            ctx.fillStyle = this.style;
            ctx.fillText(this.letter.toString().padStart(2,'0'),
                this.center.x - 4,//this.width / 2,
                this.center.y + 4//+ this.height / 2
            );
        }
	}
}