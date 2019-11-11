
    var normalStyle =  { fontSize: '25px', color: '#99cc00', backgroundColor: '#333399'}
    var selectedStyle = {fontSize: '32px', color: '#263300', backgroundColor: '#888'};

    var selectedText = 1;
	var maxMenuItens = 3;    

	var spacebar;
    var keyUp;
    var keyDown;	
    var texts = [];				


class MainMenu extends Phaser.Scene {
	
	constructor() {
        super({key: "MainMenu"});
    }

	preload ()
    {

    }


    create() {


		texts[1] = this.add.text(200, 120, 'Text01', normalStyle);
		texts[2] = this.add.text(200, 180, 'Text02', normalStyle);
		texts[3] = this.add.text(200, 240, 'Text03', normalStyle);

        spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);


    }

    update() {

		// 1
		// 2
		// 3

		//verifica o item selecionado
		if(Phaser.Input.Keyboard.JustDown(keyUp)){
			if(selectedText == 1){
				selectedText = maxMenuItens;
			}else{
				selectedText = selectedText - 1;	
			}

		}else if(Phaser.Input.Keyboard.JustDown(keyDown)){
			if(selectedText == maxMenuItens){
				selectedText = 1;
			}else{
				selectedText = selectedText + 1;	
			}
			
		}


		//altera a cor do item selecionado
		//update style
		var i;
		for (i = 1; i < texts.length; i++) {
		    texts[i].setStyle( normalStyle );
		} 
		texts[selectedText].setStyle(selectedStyle)



		// muda a Scene confore o item selecionado.

		if(Phaser.Input.Keyboard.JustDown(spacebar))
		switch(selectedText) {
		    case 1:
		        this.scene.start("sceneA");
		        break;
		    case 2:
		        this.scene.start("sceneB");
		        break;
		    case 3:
		        this.scene.start("sceneC");
		        break;
		    // default:
		    //     this.scene.start("sceneC");
		} 


    }
}