var player;
var cursors;
var debug = false;

    var keyUp;


class TiledGame extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'tiledGame' });
    }

    preload ()
    {
        this.load.image("tiles", "../assets/tile/tiles.png");
        this.load.tilemapTiledJSON("map", "../assets/tile/untitled.json");

        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });

    }

    create () {


        // When loading a CSV map, make sure to specify the tileWidth and tileHeight!
        const map = this.make.tilemap({ key: "map", tileWidth: 48, tileHeight: 48 });

        // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
        // Phaser's cache (i.e. the name you used in preload)
        const tileset = map.addTilesetImage("tiles", "tiles");

        // Parameters: layer name (or index) from Tiled, tileset, x, y
        const wallsLayer = map.createStaticLayer("walls", tileset, 0, 0);
        const itemLayer = map.createStaticLayer("items", tileset, 0, 0);
        // const worldLayer = map.createStaticLayer("World", tileset, 0, 0);
        // const aboveLayer = map.createStaticLayer("Above Player", tileset, 0, 0);


        // The 13th tile through and including the 45th tile will be marked as colliding
        wallsLayer.setCollisionBetween(0, 44);
        itemLayer.setCollisionBetween(0, 44);
    

        if(debug){
            //debug graphics
            const debugGraphics = this.add.graphics().setAlpha(0.75);
            wallsLayer.renderDebug(debugGraphics, {
              tileColor: null, // Color of non-colliding tiles
              collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
              faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
            });    
        }
        






         // The player and its settings
        player = this.physics.add.sprite(100, 450, 'dude');

        //  Player physics properties. Give the little guy a slight bounce.
        player.setBounce(0.12);
        player.setCollideWorldBounds(true);

        //  Our player animations, turning, walking left and walking right.
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });


        //  Collide the player and the stars with the platforms
        this.physics.add.collider(player, wallsLayer);
        this.physics.add.collider(player, itemLayer);

        //  Input Events
        cursors = this.input.keyboard.createCursorKeys();



        keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);

    }

    update ()
    {

        if (cursors.left.isDown)
        {
            player.setVelocityX(-160);

            player.anims.play('left', true);
        }
        else if (cursors.right.isDown)
        {
            player.setVelocityX(160);

            player.anims.play('right', true);
        }
        else
        {
            player.setVelocityX(0);

            player.anims.play('turn');
        }

        // if (cursors.up.isDown && player.body.touching.down)
        if (Phaser.Input.Keyboard.JustDown(keyUp))
        {
            player.setVelocityY(-330);
        }
    }

}