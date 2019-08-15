const TOTAL = 500;
var birds = [];
let savedBirds = [];
var pipes = [];
var score = 0;
let counter = 0;
let slider;

function keyPressed(){
    if(key == 's'){
        let bird = birds[0];
        //let json = bird.brain.serialize();
        saveJSON(bird.brain, 'bird.json');
        //console.log(json);
    }
    
}

function setup(){
    createCanvas(640, 480);
    slider = createSlider(1, 10, 1);
    for(let i = 0; i < TOTAL; i++){
        birds[i] = new Bird();
    }
}

function draw(){ 

    for(let n = 0; n < slider.value(); n++){
        if(counter % 75 == 0){
            pipes.push(new Pipe());
        }
        counter++;

        for(var i = pipes.length-1; i >=0; i--){
            pipes[i].update();

            for(let j = birds.length - 1; j >= 0; j--){
                if(pipes[i].hits(birds[j])){
                    savedBirds.push(birds.splice(j, 1)[0]);
                }
            }

            /*if(pipes[i].hits(bird)){
                console.log("HIT");
            }

            if(!pipes[i].hits(bird) && !pipes[i].scored && pipes[i].x + 80 < bird.x){
                pipes[i].scored = true;
                score +=1;
            }*/

            //text('Score: '+score, 10, 30);

            if(pipes[i].offscreen()){
                pipes.splice(i, 1);
            }
        }

        for(let i = birds.length - 1; i >= 0; i--){
            if(birds[i].offScreen()){
                savedBirds.push(birds.splice(i, 1)[0]);
            }
        }

        for(let bird of birds){
            bird.think(pipes);
            bird.update();

        }

        if(birds.length == 0){
            counter = 0;
            nextGerenaration();
            pipes = [];
        }
    }

    //All the drawing stuuf

    background(0); 
    textSize(32);
    fill(0, 102, 153);

    for(let bird of birds){
        bird.show();
    }

    for(let pipe of pipes){
        pipe.show();
    }

}
