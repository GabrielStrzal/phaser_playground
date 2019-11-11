var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#6600cc',
    parent: 'phaser-example',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600 },
            debug: false
        }
    },
    scene: [ MainMenu, TiledGame ]
};

var game = new Phaser.Game(config);

