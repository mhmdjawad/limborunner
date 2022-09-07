export default class SpriteMaker{
    constructor(){
    }
    static getcolor(r, g, b, a) {
        if(r+g+b+a == 0){
            return null;
        }
        else if(r+g+b == 0){
            return '#000';
        }
        else if (r > 255 || g > 255 || b > 255){
            return '#000';
        }
        return '#' + ((r << 16) | (g << 8) | b).toString(16).slice(-6);
    }
    static imageToCanvas(image,width,height){
        const buffer = document.createElement('canvas');
        if(width) buffer.width = width;
        else buffer.width = image.width;
        if(height) buffer.height = height;
        else buffer.height = image.height;
        const context = buffer.getContext('2d');
        context.drawImage(
            image,
            0,
            0,
            buffer.width,
            buffer.height,
            0,
            0,
            buffer.width,
            buffer.height);
        return buffer;
    }
    static transformCanvasColors(canvas,transformation){
        let scale = 1;
        let ctx = canvas.getContext('2d');
        const canvas2 = document.createElement('canvas');
        canvas2.width = canvas.width * scale;
        canvas2.height = canvas.height * scale;
        let ctx2 = canvas2.getContext('2d');
        let ofx = 0, ofy = -scale;
        for(let i = 0; i < canvas.height; i++){
            ofx = -scale;
            ofy += scale;
            for(let j = 0 ; j < canvas.width; j++){
                ofx += scale;
                let data = ctx.getImageData(j,i,1,1).data;
                data = SpriteMaker.getcolor(data[0],data[1],data[2],data[3]);
                if(data == null){
                    continue;
                }
                if(transformation[data] == "_") continue;
                else if(transformation[data]){
                    ctx2.fillStyle = transformation[data];
                }
                else{
                    ctx2.fillStyle = data;
                }
                ctx2.fillRect(ofx, ofy,scale,scale);
            }
        }
        return canvas2;
    }
    static magnify(canvas,scale = 2){
        if(scale == 1){
            return canvas;
        }
        let ctx = canvas.getContext('2d');
        let canvas2 = document.createElement('canvas');
        canvas2.width = canvas.width * scale;
        canvas2.height = canvas.height * scale;
        let ctx2 = canvas2.getContext('2d');
        let ofx = 0, ofy = -scale;
        for(let i = 0; i < canvas.height; i++){
            ofx = -scale;
            ofy += scale;
            for(let j = 0 ; j < canvas.width; j++){
                ofx += scale;
                let data = ctx.getImageData(j,i,1,1).data;
                data = SpriteMaker.getcolor(data[0],data[1],data[2],data[3]);
                if(data == null){
                    continue;
                }
                ctx2.fillStyle = data;
                ctx2.fillRect(ofx, ofy,scale,scale);
            }
        }
        return canvas2;
    }
    static to64(c){
        return c.toDataURL();
    }
    static screenshot(canvas){
        var imgURL = canvas.toDataURL('image/jpeg');
        var dlLink = document.createElement('a');
        dlLink.download = 'screenshot.jpeg';
        dlLink.href = imgURL;
        document.body.appendChild(dlLink);
        dlLink.click();
        document.body.removeChild(dlLink);
    }
    static crop(canvas,x,y,width,height){
        const buffer = document.createElement('canvas');
        buffer.width = width;
        buffer.height = height;
        const context = buffer.getContext('2d');
        context.drawImage(
            canvas,
            x,
            y,
            width,
            height,
            0,
            0,
            width,
            height);
            return buffer;
    }
    static pxielToCanvas(blueprint,canvasTransformations, width, height){
        let ctx = blueprint.getContext('2d');
        let canvas2 = document.createElement('canvas');
        canvas2.width = blueprint.width * width;
        canvas2.height = blueprint.height * height;
        let ctx2 = canvas2.getContext('2d');
        // console.log(`${blueprint.height} ${height}`)
        let ofx = 0, ofy = Math.min(-height,blueprint.height);
        for(let i = 0; i < blueprint.height; i++){
            ofx = -width;
            ofy += height;
            for(let j = 0 ; j < blueprint.width; j++){
                ofx += width;
                let data = ctx.getImageData(j,i,1,1).data;
                data = SpriteMaker.getcolor(data[0],data[1],data[2],data[3]);
                if(data == null){
                    continue;
                }
                let transformatedCanvas = canvasTransformations[data];
                if(transformatedCanvas && transformatedCanvas.length > 1){
                    transformatedCanvas = transformatedCanvas[randInt(0,transformatedCanvas.length)];
                }
                if(transformatedCanvas && transformatedCanvas != '_'){
                    ctx2.drawImage(transformatedCanvas,ofx, ofy, width, height);
                }
            }
        }
        return canvas2;
    }
}