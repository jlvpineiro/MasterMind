class InputManager {
    constructor() {
        this.events = {};

        this.listen();
    }

    on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }

    emit = function (event, data) {
        const callbacks = this.events[event];
        if (callbacks) {
            callbacks.forEach(callback => {
                callback(data);
            });
        }
    }

    listen = function () {

        const self = this;

        const map = {
            "ArrowUp": 0, // Up
            "ArrowRight": 1, // Right
            "ArrowDown": 2, // Down
            "ArrowLeft": 3, // Left
            //75: 0, // Vim up
            //76: 1, // Vim right
            //74: 2, // Vim down
            //72: 3, // Vim left
            "W": 0, // W
            "D": 1, // D
            "S": 2, // S
            "A": 3  // A
        };

        document.addEventListener("keydown", event => {

            const keyName = event.key;
            const mapped = map[keyName];

            if (mapped !== undefined) {
                event.preventDefault();
                self.emit("move",mapped);
            }

            if (keyName === "R") {
                self.restart.call(self,event);
            }

            if (keyName === "Enter") {
                self.emit("onEnter");
            }

        });
    }

    restart = function (event) {
        event.preventDefault();
        this.emit("startGame");
    }

    //keepPlaying = function (event) { 
        //event.preventDefault();
        //this.emit("keepPlaying");
    //}

}

export default InputManager;