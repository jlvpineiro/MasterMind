class GameManager {
    constructor(socket, remotePlayer, MasterMind, InputManager,) {
  
        this.mm = MasterMind;

        this.inputManager   = new InputManager();
        // Change Actuator to take in remotePlayer as an argument!
        //this.actuator = new Actuator(remotePlayer);

        this.inputManager.on("move", this.mm.move.bind(this.mm));
        this.inputManager.on("onEnter", this.mm.onEnter.bind(this.mm));
        this.inputManager.on("startGame", this.mm.startGame.bind(this.mm));

        // Add these two lines
        this.remotePlayer = remotePlayer;
        this.socket = socket;

        this.setup();
    }

    //sendRemoteMove = function (grid, metadata) {
        //if (!this.remotePlayer) {
          //this.socket.emit('actuate', { grid: grid, metadata: metadata });
        //}
    //}

    setup = function () {
        this.mm.startGame();
    }

    restart = function () {
        this.setup();
    }
}

export default GameManager;