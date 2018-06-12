import 'phaser';

var config = {
    type: Phaser.CANVAS,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
		update: update
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('ship', 'assets/ship.png');
	this.load.image('shipB', 'assets/shipB.png');
	this.load.image('laser', 'assets/laser.png');
}
var me = null;
var bad = null;
var laser = null;
var cursors;
function create ()
{
    this.me = this.add.sprite(400, 550, 'ship');
	this.bad = this.add.sprite(400, 300, 'shipB');
	this.laser = this.add.group();
	this.laser.enableBody = true;
    this.laser.physicsBodyType = Phaser.Physics.ARCADE;
	
	this.laser.displayWidth = 10;
	this.laser.displayHeight = 30;
	
    for (var i = 0; i < 20; i++)
    {
        var b = this.laser.create(400, 550, 'laser');
        b.name = 'laser' + i;
		b.displayWidth = 10;
		b.displayHeight = 30;
        b.exists = false;
        b.visible = false;
        b.checkWorldBounds = true;
    }
	
	this.me.displayWidth = 80; 
	this.me.displayHeight = 80;
	this.me.setAngle(180);
	console.log(this.me);
	this.input.on('pointermove', function (pointer) {

        this.me.x = Phaser.Math.Clamp(pointer.x, 52, 748);

        }, this);
	
	this.bad.displayWidth = 80; 
	this.bad.displayHeight = 80;
	this.bad.setAngle(180);
	
    game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);	
	
}
function update(){
	/*if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
		fireLaser();
	}*/
}
function fireLaser(){
        l = this.laser.getFirstExists(false);

        if (l)
        {
            l.reset(sprite.x + 6, sprite.y - 8);
            l.body.velocity.y = -300;
        }
}
function resetLaser(){
	leaser.kill();
}