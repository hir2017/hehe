import SpriteAnim from './spriteanim';
import json  from './data.js';

var mergePic = require('../../../images/loading.png');

let anim = {

    requestIndex: 0,
    mergePics: [],
    parsedJson: [],

    play(container, jsons, mergePics, onStart, onComplete) {
        let canvasDom = $('<canvas id="canvas1"></canvas>');
       
        canvasDom.css({
            position: 'fixed',
            zIndex: 99999,
            left: 200,
            top: 200
        });
        let wrap = container || $(document.body);
        
        wrap.append(canvasDom);

        let frames = [];

        let img = $('<img src="' + mergePic + '" />')[0];
        
        frames = [...frames, ...this.extractFrames(json, img)];

        var animation = new SpriteAnim("canvas1");
            
        animation.start({
            canvasWidth: 110,
            canvasHeight: 70,
            scale: 0.2,
            offsetX: 0,
            offsetY: 0,
            frames: frames,
            fps: 48,
            loop: true
        });
    },

    extractFrames(jsonData, img) {

        var frames = [];
        var rawFrames = jsonData && jsonData.frames;
        if (rawFrames) {
            rawFrames.forEach(function(frameData) {

                frames.push({
                    name: frameData.filename,
                    image: img,
                    sx: frameData.frame.x,
                    sy: frameData.frame.y,
                    sWidth: frameData.frame.w,
                    sHeight: frameData.frame.h,
                    dx: frameData.spriteSourceSize.x,
                    dy: frameData.spriteSourceSize.y,
                    dWidth: frameData.spriteSourceSize.w,
                    dHeight: frameData.spriteSourceSize.h
                });
            });
        }
        return frames;
    }
};

export default anim;





