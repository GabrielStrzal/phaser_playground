class SceneB extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'sceneB' });
    }

    preload ()
    {
        this.load.image('arrow', 'assets/dude.png');
    }

    create ()
    {
        this.arrow = this.add.sprite(400, 300, 'arrow').setOrigin(0, 0.5);

        this.input.once('pointerdown', function (event) {

            this.scene.start('sceneC');

        }, this);
    }

    update ()
    {
        this.arrow.rotation += 0.01;
    }

}