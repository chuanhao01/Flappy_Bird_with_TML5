function Bird(gravity, lift, air_res){
    this.gravity = gravity;
    this.lift = lift;
    this.air_res = air_res;
    this.x = 50;
    this.y = HEIGHT/2;
    this.rad = 26;
    this.vel = 0;

    this.enabled = true;

    // For drawing
    this.timer = 0;

    this.drawBird = function(img1, img2, img3){
        push();
        imageMode(CENTER);
        translate(this.x, this.y);
        angleMode(DEGREES);
        if(this.vel < 10) {
        this.rotationAngle = -30;
        rotate(this.rotationAngle);

        } else if(this.vel <= 25){
        this.rotationAngle += 20;
        this.rotationAngle = constrain(this.rotationAngle, -30, 90);
        rotate(this.rotationAngle);

        } else {
        rotate(90);
        }

        if(this.timer >= 0 && this.timer < 5) {
        image(img1, 0, 0, this.rad * 2.6, this.rad * 2);

        } else if(this.timer >= 5 && this.timer < 10) {
        image(img2, 0, 0, this.rad * 2.6, this.rad * 2);

        } else if(this.timer >= 10 && this.timer < 15) {
        image(img3, 0, 0, this.rad * 2.6, this.rad * 2);

        } else {
        this.timer = 0;
        image(img1, 0, 0, this.rad * 2.6, this.rad * 2);
        }

        pop();
        this.timer++;
    };
    this.updateBird = function(){
        this.vel += this.gravity;
        this.vel *= this.air_res;
        this.y += this.vel;
    };
    this.checkCollision = function(){
        if(0 < this.y && this.y < HEIGHT){
            return true;
        }
        else{
            return false;
        } 
    };
    this.birdJump = function(){
        // console.log('i am jumpping');
        this.vel += this.lift;
    };
}

