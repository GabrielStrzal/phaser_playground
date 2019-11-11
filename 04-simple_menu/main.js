var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#333399',
    parent: 'phaser-example',
    scene: [ MainMenu, SceneA, SceneB, SceneC ]
};

var game = new Phaser.Game(config);