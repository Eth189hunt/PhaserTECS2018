import 'phaser';
//PhaserTECS2018
var Space = new Phaser.Class({
	
	Extends: Phaser.Scene,
			cursors: null,
			thrust: null,
			flares: null,
			bads: [],
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
		this.me = this.physics.add.sprite(400, 550, 'ship');
		
		for (var gb = 0; gb < 5; gb++){
			this.bads.push(this.add.sprite(200 + gb * 100, 300, 'shipB'));
			this.bads[gb].setAngle(180);
		}
		this.laser = this.add.group();
	
		this.me.displayWidth = 80; 
		this.me.displayHeight = 80;
		this.me.setAngle(180);
		console.log(this.bad);
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
				
				for (var i = 0; i < this.scene.bads.length; i++ ){
					var bad = this.scene.bads[i];
					if (this.y > bad.y - 40 && this.y < bad.y + 40 && this.x > bad.x - 40 && this.x < bad.x + 40) {
						bad.destroy();
						this.scene.bads.splice(i, 1);
						i = 0;
					}
				}
				
				this.born += delta;
			
				if (this.born > 1000){
					this.setActive(false);
					this.setVisible(false);
				}
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
		/*this.input.on('pointermove', function (pointer) {
			
			this.me.x = Phaser.Math.Clamp(pointer.x, 52, 748);
		
		}, this);*/
		
		//this.physics.add.collider(this.bad, this.bullets);
		
	},
	update: function (time, delta){
		if(this.cursors.space.isDown && time > this.lastFired){
			var bullet = this.bullets.get();
			bullet.setActive(true);
			bullet.setVisible(true);
			if(bullet){
				bullet.fire(this.me);
			
				this.lastFired = time + 350;
			}
		}
		if (this.cursors.left.isDown)
		{
			this.me.body.setVelocityX(-300);
		}
		else if (this.cursors.right.isDown)
		{
			this.me.body.setVelocityX(300);
		}
		else{
			this.me.body.setVelocityX(0);
		}
		if (this.me.x < 60){
			this.me.x = 60;
		}
		if (this.me.x > 740){
			this.me.x = 740;
		}
	},

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
                text: '100%',
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
            
	},
	
	create: function ()
	{
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
	physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
	scene: [Menu, Space]
};
var game = new Phaser.Game(config);