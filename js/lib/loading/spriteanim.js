(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
        (global.Stats = factory());
}(this, (function() {
    'use strict';

    var SpriteAnim = function(canvasId) {
        this.canvas = document.getElementById(canvasId); // Select given canvas ID
        this.context = this.canvas.getContext("2d"); // Get 2D context
    }
    // Start method
    SpriteAnim.prototype.start = function(spriteObj) {
        this.spriteObj = spriteObj;
        this.onStart(); // onStart callback function

        // Sprite Info
        this.width = this.spriteObj.canvasWidth; // Set canvas width
        this.height = this.spriteObj.canvasHeight; // Set canvas width
        this.scale = this.spriteObj.scale;
        this.offsetX = this.spriteObj.offsetX;
        this.offsetY = this.spriteObj.offsetY;
        this.frames = this.spriteObj.frames || [];
        this.totalFrames = this.frames.length;
        this.frameIndex = 0;

        this.canvas.width = this.width; // Set canvas width
        this.canvas.height = this.height; // Set canvas width
        this.context.scale(this.scale, this.scale);
        this.actualWidth = this.width / this.scale;
        this.actualHeight = this.height / this.scale;

        // FPS stuff
        this.fps = this.spriteObj.fps || 30;
        this.timestamp_init = Date.now(); // Before execution of ticker
        this.interval = 1000 / this.fps; // Frame's interval in ms 
        this.timestamp_now, this.delta; // Vars
        this.loopSprite = this.spriteObj.loop || false; // If should loop boolean
        this.playSprite = true; // Play state boolean

        this.canvasTicker(); // Start ticker
    }
    // Stop method
    SpriteAnim.prototype.stop = function() {
        this.playSprite = false;

        this.context.clearRect(0, 0, this.actualWidth, this.actualHeight);
    }
    // New tick update
    SpriteAnim.prototype.canvasUpdate = function() {
        if (this.frameIndex < this.totalFrames - 1) {
            this.frameIndex++;
            this.draw();
        } else {
            if (this.loopSprite) {
                this.frameIndex = 0;
                this.draw();
            } else {
                this.stop();
            }
            this.onComplete();
        }
    };
    // On start callback
    SpriteAnim.prototype.onStart = function() {
        if (this.spriteObj.onStart) {
            this.spriteObj.onStart();
        }
    };
    // On complete callback
    SpriteAnim.prototype.onComplete = function() {
        if (this.spriteObj.onComplete) {
            this.spriteObj.onComplete();
        }
    };
    // Draw new frame
    SpriteAnim.prototype.draw = function() {
        this.context.clearRect(0, 0, this.actualWidth, this.actualHeight);

        var frameData = this.frames[this.frameIndex];
        if (frameData) {
            // void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
            this.context.drawImage(
                frameData.image,
                frameData.sx,
                frameData.sy,
                frameData.sWidth,
                frameData.sHeight,
                frameData.dx + this.offsetX,
                frameData.dy + this.offsetY,
                frameData.dWidth,
                frameData.dHeight);
        }
    };
    // Ticker
    SpriteAnim.prototype.canvasTicker = function() {
        if (this.playSprite) {
            window.requestAnimationFrame(this.canvasTicker.bind(this));
            this.timestamp_now = Date.now();
            this.delta = this.timestamp_now - this.timestamp_init;
            if (this.delta > this.interval) {
                this.timestamp_init = this.timestamp_now - (this.delta % this.interval);
                this.canvasUpdate();
            }
        }
    };
    return SpriteAnim;

})));