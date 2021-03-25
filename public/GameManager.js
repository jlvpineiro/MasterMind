class GameManager {
    // constructor(socket, remotePlayer, MasterMind, InputManager, Actuator) {
    constructor(MasterMind, socket, InputManager) {
  
        this.mm = MasterMind;

        this.inputManager   = new InputManager(socket);
        // Change Actuator to take in remotePlayer as an argument!
        // this.actuator = new Actuator(remotePlayer);


        // Add these two lines
        this.socket = socket;
        // this.remotePlayer = remotePlayer;

        // if (this.remotePlayer) {
        //     this.socket.on('move', this.handleRemoteMove.bind(this));
        // }


        this.setup();
    }

    move = function (direction) {
        this.mm.move(direction);
        this.socket.emit('localMove', direction);
    }

    handleRemoteMove = function (direction) {
        this.mm.move(direction);
    }

    onEnter = function () {
        if (!this.mm.end) {
            this.mm.onEnter();
            this.socket.emit('localOnEnter');
        } else {
            this.startGame();
        }
    }

    handleRemoteOnEnter = function () {
        this.mm.onEnter();
    }

    startGame = function () {
        let answer = this.mm.randomizeAnswer();

        this.mm.startGame(answer);
        this.socket.emit('localStartGame',answer);
    }

    handleRemoteStartGame = function (answer) {
        this.mm.startGame(answer);
    }

    remove = function () {
        this.mm.remove();
        this.socket.emit('localRemove');
    }

    handleRemoteRemove = function () {
        this.mm.remove();
    }

    setup = function () {
        this.inputManager.on('move', this.move.bind(this));
        this.inputManager.on('onEnter', this.onEnter.bind(this));
        this.inputManager.on('startGame', this.startGame.bind(this));
        this.inputManager.on('remove', this.remove.bind(this));

        this.socket.on('move', this.handleRemoteMove.bind(this));
        this.socket.on('onEnter', this.handleRemoteOnEnter.bind(this));
        this.socket.on('startGame', this.handleRemoteStartGame.bind(this));
        this.socket.on('remove', this.handleRemoteRemove.bind(this));

        this.startGame();
    }

    restart = function () {
        this.setup();
    }
}

export default GameManager;