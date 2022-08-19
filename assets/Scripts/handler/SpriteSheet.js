export default class SpriteSheet{
    constructor(image, width, height) {
        this.image = image;
        this.width = width;
        this.height = height;
        this.elements = new Map();
        this.animations = new Map();
    }
    define(name, x, y, width, height) {
        let AspectWidth = width;
        let AspectHeight = height;
        const buffers = [false].map(flip => {
            const buffer = document.createElement('canvas');
            buffer.width = AspectWidth;
            buffer.height = AspectHeight;
            const context = buffer.getContext('2d');
            if (flip) {
                context.scale(-1, 1);
                context.translate(-width, 0);
            }
            context.drawImage(
                this.image,
                x,
                y,
                width,
                height,
                0,
                0,
                AspectWidth,
                AspectHeight);
            buffer.id = name;
            //$(GLOBAL.CANVAS_CONTAINER).append(buffer);
            return buffer;
        });
        this.elements.set(name, buffers[0]);
    }
    defineTile(name, x, y) {
        this.define(name, x * this.width, y * this.height, this.width, this.height);
    }
    getCanvas(name){
        const buffer = this.elements.get(name);
        return buffer;
    }
    draw(name, context, x, y, flip = false) {
        if(this.elements.get(name)){
            const buffer = this.elements.get(name);//[flip ? 1 : 0];
            context.drawImage(buffer, x, y);
        }
    }
    drawAnim(name, context, x, y, distance) {
        const animation = this.animations.get(name);
        this.drawTile(animation(distance), context, x, y);
    }
    drawTile(name, context, x, y) {
        this.draw(name, context, x * this.width, y * this.height);
    }
    defineAnim(name, animation) {
        this.animations.set(name, animation);
    }
}