class SceneA extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'sceneA' });
    }

    preload ()
    {
        this.load.image('face', 'assets/star.png');
    }

    create ()
    {
        this.face = this.add.image(400, 300, 'face');

        this.input.manager.enabled = true;

        this.input.once('pointerdown', function () {

            this.scene.start('sceneB');

        }, this);
    }

}