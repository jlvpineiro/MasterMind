class InputManager {
    constructor(socket) {
        this.socket = socket;
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
            "w": 0, // W
            "d": 1, // D
            "s": 2, // S
            "a": 3  // A
        };

        document.addEventListener("keydown", event => {

            const keyName = event.key;
            const mapped = map[keyName];

            console.log(keyName);
            if (mapped !== undefined) {
                event.preventDefault();
                self.emit("move",mapped);
            }

            if (keyName === "r") {
                self.restart.call(self,event);
            }

            if (keyName === "Enter" || keyName === " ") {
                self.emit("onEnter");
            }

            if (keyName === "Backspace") {
                self.emit("remove");
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