class keysDown {
    constructor() {
        // Set isPressed to an empty object
        this.isPressed = {};
        let directions = {
            left: null,
            right: null,
            up: null,
            down: null,
            jump: null,
        }

        // // Registering the buttons (for mobile).
        // const registerButton = (id, dir) => {
        //     const button = document.getElementById(id);
        //     button.addEventListener('touchstart', function (e) {
        //         directions[dir] = true;
        //     }, { passive: true });
        //     button.addEventListener('touchend', function (e) {
        //         directions[dir] = false;
        //     }, { passive: true });
        //     button.addEventListener('mousedown', function (e) {
        //         directions[dir] = true;
        //     })
        //     button.addEventListener('mouseup', function (e) {
        //         directions[dir] = false;
        //     })
        // }
        // registerButton('moveLeft', 'left');
        // registerButton('moveRight', 'right');
        // registerButton('moveUp', 'up');
        // registerButton('moveDown', 'down');


        // Key handlers for traditional keyboard.
        document.addEventListener('keydown', function (ev) {
            if (ev.code === 'KeyA' || ev.key === 'ArrowLeft' || ev.key === 'a') {
                return directions.left = true;
            }
            if (ev.code === 'KeyD' || ev.key === 'ArrowRight' || ev.key === 'd') {
                return directions.right = true;
            }
            if (ev.code === 'KeyW' || ev.key === 'ArrowUp' || ev.key === 'd') {
                return directions.up = true;
            }
            if (ev.code === 'KeyS' || ev.key === 'ArrowDown' || ev.key === 's') {
                return directions.down = true;
            }
            if (ev.code === 'Space') {
                return directions.jump = true;
            }
        });
        // Set up `onkeyup` event handler.
        document.addEventListener('keyup', function (ev) {
            if (ev.code === 'KeyA' || ev.key === 'ArrowLeft' || ev.key === 'a') {
                return directions.left = false;
            }
            if (ev.code === 'KeyD' || ev.key === 'ArrowRight' || ev.key === 'd') {
                return directions.right = false;
            }
            if (ev.code === 'KeyW' || ev.key === 'ArrowUp' || ev.key === 'w') {
                return directions.up = false;
            }
            if (ev.code === 'KeyS' || ev.key === 'ArrowDown' || ev.key === 's') {
                return directions.down = false;
            }
            if (ev.code === 'Space') {
                return directions.jump = false;
            }
        });

        // Define getters for each key
        // * Not strictly necessary. Could just return
        // * an object literal of methods, the syntactic
        // * sugar of `defineProperty` is just so much sweeter :)
        Object.defineProperty(this.isPressed, 'left', {
            get: function () { return directions.left; },
            configurable: true,
            enumerable: true
        });
        Object.defineProperty(this.isPressed, 'right', {
            get: function () { return directions.right; },
            configurable: true,
            enumerable: true
        });
        Object.defineProperty(this.isPressed, 'up', {
            get: function () { return directions.up; },
            configurable: true,
            enumerable: true
        });
        Object.defineProperty(this.isPressed, 'down', {
            get: function () { return directions.down; },
            configurable: true,
            enumerable: true
        });
        Object.defineProperty(this.isPressed, 'jump', {
            get: function () { return directions.jump; },
            configurable: true,
            enumerable: true
        });
        return this;
    }
}

const keys = new keysDown();

export { keys }