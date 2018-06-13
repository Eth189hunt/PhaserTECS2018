import 'phaser';

var config = {
    type: Phaser.CANVAS,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
		update: update,
		extend: {
			cursors: null,
			thrust: null,
			flares: null,
			bullets: null,
			lastFired: 0,
			text: null,
			createBulletEmitter: createBulletEmitter
		}
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
	
	
	this.me.displayWidth = 80; 
	this.me.displayHeight = 80;
	this.me.setAngle(180);
	console.log(this.me);
	
	this.bad.displayWidth = 80; 
	this.bad.displayHeight = 80;
	this.bad.setAngle(180);
	var Bullet = new Phaser.Class({
		Extends: Phaser.GameObjects.Image,
		
		initialize:
		
		function Bullet (scene){
			Phaser.GameObjects.Sprite.call(this, scene, 0,0, 'laser');
			this.displayWidth = 20;
			this.displayHeight = 50;
			
			this.speed = 0;
			this.born = 0;
		},
		fire: function (me){
			this.born = 0;
			this.setPosition(me.x,me.y);
			
			this.speed = Phaser.Math.GetSpeed(500,-1);
			//this.velocity.y = -300;
		},
		update: function (time, delta){
			this.y += this.speed * delta;
			
			this.born += delta;
			
			if (this.born > 1000){
				this.setActive(false);
				this.setVisible(false);
			}
		}
	})
	this.createBulletEmitter();
	//bullets
	this.bullets = this.add.group({classType: Bullet, runChildUpdate: true})
	
    this.cursors = this.input.keyboard.createCursorKeys();	
	console.log("cddgdghjgbooo");
	this.input.on('pointermove', function (pointer) {
		
		this.me.x = Phaser.Math.Clamp(pointer.x, 52, 748);
		
    }, this);
}
function update(time, delta){
	if(this.cursors.space.isDown && time > this.lastFired){
		var bullet = this.bullets.get();
		bullet.setActive(true);
		bullet.setVisible(true);
		if(bullet){
			bullet.fire(this.me);
			
			this.lastFired = time + 175;
		}
	}
}
function createBulletEmitter(){
	
}
function fireLaser(){
console.log("booo");
    
}
function resetLaser(){
	leaser.kill();
}