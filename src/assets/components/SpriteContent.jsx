import { useEffect } from 'react';
import * as PIXI from 'pixi.js'
import '@pixi-spine/all-3.8';
import { Spine } from '@pixi-spine/all-3.8';
const path = '../../../public/assets/';
let assetSkel = 'xuefeng';

function launch() {
    let app;
    const canvas = document.getElementById('app');
    app = new PIXI.Application({
        backgroundColor: 0x1099bb,
        antialias: true,
        width: 800,
        height: 500,
        view: canvas
    });

    let assetPath = path + assetSkel + '.skel';
    console.log(assetPath)

    PIXI.Assets.load(assetPath).then((resource) => {
        console.log(resource)
        const spine = new Spine(resource.spineData);
        console.log(spine)
        spine.x = 400;
        spine.y = 500;
        spine.state.setAnimation(0, 'dance', true);
        app.stage.addChild(spine);
    });
}

const AppSprite = () => {
    useEffect(() => {
        launch();
    }, []);

    return null; // Asegúrate de devolver algo en tu componente
}

export default AppSprite;
