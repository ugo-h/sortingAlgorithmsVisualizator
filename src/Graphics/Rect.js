// const { SHOW_CENTERS, DEFAULT_COLOR } = config;

const DEFAULT_COLOR = 'white';
const SHOW_CENTERS = false;

class Point2d {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}
  
  class Rect extends Point2d {
    constructor(x, y, width, height) {
        super(x, y);
        this.color = DEFAULT_COLOR;
        this.dColor = DEFAULT_COLOR;
        this.width = width*0.5;
        this.height = height*0.5;
        this.vy = 0;
        this.vx = 0;
    };

    draw(ctx) {
      ctx.fillStyle = this.color;
      ctx.fillRect(
        this.x - this.width, this.y + this.height,
        this.width * 2, -this.height * 2
     );
     if(SHOW_CENTERS){
       ctx.fillStyle = 'red';
       ctx.fillRect(
        this.x - 2.5, this.y -2.5, 5, 5
        )
      }
    };

    update() {
      
    }
};
  
 
  
  
  export default Rect;