let mainMenu,
    newGameMenu,
    loadGameMenu,
    optionsMenu,
    config;

mainMenu = [{
    text: 'New game',
    targetState: 'NewGameMenu'
}, {
    text: 'Load game',
    targetState: 'LoadGameMenu'
}, {
    text: 'Options',
    targetState: 'OptionsMenu'
}];

newGameMenu = [{
    text: 'Start a new game'
}, {
    text: 'Back',
    targetState: 'MainMenu'
}];

loadGameMenu = [{
    text: 'Load a saved game'
}, {
    text: 'Back',
    targetState: 'MainMenu'
}];

optionsMenu = [{
    text: 'Text speed: ',
    value: 1,
    options: [
        'slow',
        'medium',
        'fast'
    ],
    configProperty: 'textSpeed'
}, {
    text: 'Music: ',
    value: 1,
    options: [
        'off',
        'on'
    ],
    configProperty: 'music'
}, {
    text: 'Sound FX: ',
    value: 1,
    options: [
        'off',
        'on'
    ],
    configProperty: 'soundFx'
}, {
    text: 'Back',
    targetState: 'MainMenu'
}];

config = {
    textStyle: {
        font: "20px monospace",
        fill: "#888"
    },
    textStyleFocused: {
        font: '20px monospace',
        fill: '#000',
        backgroundColor: '#888'
    }
};

class Game extends Phaser.Game {
    constructor() {
        super(320, 320, Phaser.AUTO, 'gameScreen');

        this.scene.add('MainMenu', () => {
            return new Menu('Main menu', mainMenu);
        });

        this.scene.add('NewGameMenu', () => {
            return new Menu('New game', newGameMenu);
        });

        this.scene.add('LoadGameMenu', () => {
            return new Menu('Load game', loadGameMenu);
        });

        this.scene.add('OptionsMenu', () => {
            return new Menu('Options', optionsMenu);
        });

        this.scene.start('MainMenu');
    }
}

class Menu extends Phaser.Scene {
    constructor(heading, options) {
        super();

        this.heading = heading;
        this.options = options;
    }

    create() {
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.maxWidth = 320;
        this.game.scale.maxHeight = 320;

        this.focused = 0;

        this.keyboard = this.game.input.keyboard;

        this.controls = this.keyboard.addKeys({
            up: Phaser.Keyboard.UP,
            down: Phaser.Keyboard.DOWN,
            left: Phaser.Keyboard.LEFT,
            right: Phaser.Keyboard.RIGHT,
            interact: Phaser.Keyboard.SPACEBAR
        });

        this.game.add.text(20, 20, this.heading, config.textStyle);

        this.menuItems = [];

        for (let i = 0; i < this.options.length; i++) {
            let options,
                menuItem;

            options = this.options[i];

            menuItem = new MenuItem(this.game, 20, (((i + 1) * 40) + 40), options.text, options.targetState, options.value, options.options, options.configProperty);

            this.menuItems.push(menuItem);
        }

        this.menuItems[this.focused].focus(true);

        this.controls.interact.onDown.add(this.activateFocusedItem, this);
        this.controls.up.onDown.add(this.selectItem, this, 0, -1);
        this.controls.down.onDown.add(this.selectItem, this, 0, 1);
        this.controls.left.onDown.add(this.selectOption, this, 0, -1);
        this.controls.right.onDown.add(this.selectOption, this, 0, 1);
    }

    selectItem(key, delta) {
        this.menuItems[this.focused].focus(false);

        this.focused += delta;

        if (this.focused >= this.menuItems.length) {
            this.focused -= this.menuItems.length;
        } else if (this.focused < 0) {
            this.focused += this.menuItems.length;
        }

        this.menuItems[this.focused].focus(true);
    }

    selectOption(key, delta) {
        let menuItem;

        menuItem = this.menuItems[this.focused];
        menuItem.value += delta;

        if (menuItem.value >= menuItem.options.length) {
            menuItem.value -= menuItem.options.length;
        } else if (menuItem.value < 0) {
            menuItem.value += menuItem.options.length;
        }

        menuItem.select();
    }

    activateFocusedItem() {
        this.menuItems[this.focused].navigate();
    }
}

class MenuItem extends Phaser.GameObjects.Text {
    constructor(game, x, y, text, targetState, value, options, configProperty, focused = false) {
        super(game, x, y, text, config.textStyle);

        this.baseText = text;
        this.targetState = targetState;
        this.value = config[configProperty] >= 0 ? config[configProperty] : value;
        this.options = options;
        this.configProperty = configProperty;
        this.focused = focused;

        if (this.value >= 0) {
            this.text += this.options[this.value];
        }

        this.game.world.addChild(this);
    }

    focus(focused) {
        if (focused) {
            this.focused = true;
            this.setStyle(config.textStyleFocused);
        } else {
            this.focused = false;
            this.setStyle(config.textStyle);
        }
    }

    navigate() {
        if (this.targetState) {
            this.game.scene.start(this.targetState);
        }
    }

    select() {
        this.text = this.baseText + this.options[this.value];
        config[this.configProperty] = this.value;
    }
}

new Game();