class SceneC extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'sceneC' });
    }

    preload ()
    {
        this.load.image('mech', 'assets/bomb.png');
    }

    create ()
    {
        this.add.sprite(Phaser.Math.Between(300, 600), 300, 'mech');

        this.input.once('pointerdown', function (event) {

            this.scene.start('sceneA');

        }, this);
    }

}