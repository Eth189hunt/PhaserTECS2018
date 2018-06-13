import 'phaser';

var Space = new Phaser.Class({
	
	Extends: Phaser.Scene,
			cursors: null,
			thrust: null,
			flares: null,
			bullets: null,
			lastFired: 0,
			text: null,
			
	initialize:
	
	function Space(){
		Phaser.Scene.call(this, {key: 'space' });
	},
	
	preload: function (){
		this.load.image('ship', 'assets/ship.png');
		this.load.image('shipB', 'assets/shipB.png');
		this.load.image('laser', 'assets/laser.png');
	},
	
	create: function (){
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
		//bullets
		this.bullets = this.add.group({classType: Bullet, runChildUpdate: true})
	
		this.cursors = this.input.keyboard.createCursorKeys();	
		console.log("cddgdghjgbooo");
		this.input.on('pointermove', function (pointer) {
			
			this.me.x = Phaser.Math.Clamp(pointer.x, 52, 748);
		
		}, this);
	},
	update: function (time, delta){
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
})
var Menu = new Phaser.Class ({
	
	Extends: Phaser.scene,
	
	initialize:
	
	function Menu ()
	{
		Phaser.Scene.call(this, { key: 'menu' });
	},
	
	preload: function ()
	{
		    var progressBar = this.add.graphics();
			var progressBox = this.add.graphics();
			progressBox.fillStyle(0x222222, 0.8);
			progressBox.fillRect(240, 270, 320, 50);
            
			var width = this.cameras.main.width;
			var height = this.cameras.main.height;
			var loadingText = this.make.text({
				x: width / 2,
				y: height / 2 - 65,
				text: 'Death Ray Pew Pew',
				style: {
                    font: '48px monospace',
                    fill: '#ff0000'
                }
            });
            loadingText.setOrigin(0.5, 0.5);
            
			var loadingText = this.make.text({
                x: width / 2,
                y: height = 340,
                text: 'click to start',
                style: {
                    font: '18px monospace',
                    fill: '#ffffff'
                }
            });
            loadingText.setOrigin(0.5, 0.5);
			
            var percentText = this.make.text({
                x: width / 2,
                y: height = 300,
                text: '0%',
                style: {
                    font: '18px monospace',
                    fill: '#ffffff'
                }
            });
            percentText.setOrigin(0.5, 0.5);
            
            var assetText = this.make.text({
                x: width / 2,
                y: height / 2 + 50,
                text: '',
                style: {
                    font: '18px monospace',
                    fill: '#ff0000'
                }
            });
 
            assetText.setOrigin(0.5, 0.5);
            
            this.load.on('progress', function (value) {
                percentText.setText(parseInt(value * 100) + '%');
                progressBar.clear();
                progressBar.fillStyle(0xffffff, 1);
                progressBar.fillRect(250, 280, 300 * value, 30);
            });
 
            this.load.on('complete', function () {
                progressBar.destroy();
                progressBox.destroy();
                loadingText.destroy();
                percentText.destroy();
                assetText.destroy();
            });
            
            this.load.image('logo', 'transparent.png');
            for (var i = 0; i < 10; i++) {
                this.load.image('logo'+i, 'transparent.png');
            }
	},
	
	create: function ()
	{
		var logo = this.add.image(400, 300, 'logo');
		this.input.once('pointerdown', function (event) {
			console.log('hi');
			this.scene.start('space');
		
		}, this);
	}
})
var config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	backgroundColor: '#000000',
	parent: 'phaser-example',
	scene: [Menu, Space]
};
var game = new Phaser.Game(config);
/*var config = {
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
}*/