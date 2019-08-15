class Pipe{
    constructor(){
    this.distance = 125;
    this.top = Math.floor(random(50,350));
    this.bottom = height-(this.distance+this.top);
    this.x = width;
    this.w = 80;
    this.speed = 6;
    this.scored = false;

    this.highlight = false;
    }

    hits(bird){
        if(bird.y-16 < this.top || bird.y+16 > height - this.bottom){
            if(bird.x+16 > this.x && bird.x-16 < this.x + this.w){
                this.highlight = true;  
                return true;
            }
        }
        this.highlight = false;
        return false;
    }

    show(){
        fill(255);
        if(this.highlight){
            fill(255,0,0);
        }
        rect(this.x, 0, this.w, this.top);
        rect(this.x, this.top+this.distance, this.w, this.bottom);
    }

    update(){
        this.x -= this.speed;
    }

    offscreen(){
        if(this.x < -this.w)
            return true;
        else
            return false;
        
    }
}