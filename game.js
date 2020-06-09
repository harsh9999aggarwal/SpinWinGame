//Set up basic game with Phaser

//brackets IDE

let prizes_config = {
    count:12,
    prize_names : ["3000 Credits","35% Off","Hard Luck","70% OFF","Swagpack","100% OFF","Netflix","50% Off","Amazon Voucher","2 Extra Spin", "CB Tshirt","CB Book"]
}


let config = {
    type : Phaser.AUTO,
    width : 1200,
    height : 570,
    scene : {
        preload : preload,
        create : create,
        update : update,
    }
};
let game = new Phaser.Game(config);
    
function preload(){
    //load an image
    console.log(this);
    this.load.image('background',"Assets/back.jpg");
    this.load.image('logo',"Assets/spin-n-win-logo.png");
    this.load.image('mybutton',"Assets/spin-now-logo.jpeg");
    this.load.image('wheel',"Assets/wheel.png");
    this.load.image('stand',"Assets/stand.png");
    this.load.image('pin',"Assets/pin.png");
    this.load.audio('music', "Assets/music.ogg");
    
     console.log("everything successfully loaded");
    
    
}
let button;

function create(){
    //create that image
    let W = game.config.width;
    let H = game.config.height;
    
    this.add.sprite(W/2+300,H/2,'background');
    
    let pin = this.add.sprite(W/2+300,H/2-250,'pin').setScale(0.25);
    pin.depth = 5;
    
    this.add.sprite(W/2+300,H/2 + 250,'stand').setScale(0.25);
    this.add.sprite(250,100,'logo').setScale(0.25);
    
    /**let myButton=game.add.myButton(250,H/2+200,'mybutton',actionOnClick,this).setScale(2);
    let button = game.add.button(95, 400, 'mybutton', actionOnClick());**/
    
    // button created
    this.button = this.add.sprite(250,H/2+200, 'mybutton').setInteractive({ useHandCursor: true });
    this.button.setScale(2);
    
    this.button.on('pointerover', function (event) { /* Do something when the mouse enters */
        console.log("over")
        this.clearTint();
    });
    this.button.on('pointerout', function (event) { /* Do something when the mouse exits. */
        console.log("out")
        this.clearTint();

    });
    this.button.on('pointerdown', spinwheel, this); 
    
    //let create wheel
    this.wheel = this.add.sprite(W/2+300,H/2,"wheel");
    this.wheel.setScale(0.235); 
    console.log(this.wheel.depth);
     /** this.input.on("pointerdown",spinwheel,this);    it move wheel on anywhere click **/
    
     //lets create text object
    font_style = {
        font : "bold 40px Arial",
        align : "center",
        color : "red",
    }
    this.game_text = this.add.text(50,200,"Welcome to Spin & Win \n\n Click Button below",font_style);
    
    //sound
    this.sound = this.sound.add("music");

}

function update(){
    console.log("In Update");
    //this.wheel.angle -= 1;
}


  

function spinwheel(){
    console.log("Time to spin the wheel");
    
     var musicconfig = {
        mute: false,
        volume: 1,
        rate: 1,
        loop: false,
        delay: 0
    }
    this.sound.play(musicconfig);
    
    let rounds = Phaser.Math.Between(6,10);
    console.log(rounds);
    
    let extra_degrees = Phaser.Math.Between(0,11)*30;
    let total_angle = rounds*360 + extra_degrees;
    
    let idx = prizes_config.count - 1 - Math.floor(extra_degrees/(360/prizes_config.count));
    
    this.button.removeInteractive();
    
    let tween = this.tweens.add({
        targets: this.wheel,
        angle: total_angle,
        ease:"Cubic.easeOut",
        duration: 5500,
        callbackScope:this,
        onComplete:function(){
            this.game_text.setText("You won something !!! \n\n" + prizes_config.prize_names[idx]);
            this.button.setInteractive({ useHandCursor: true });
        },
        
        
    });
}
                        
