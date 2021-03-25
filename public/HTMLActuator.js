class HTMLActuator {
    constructor(remotePlayer) {
        this.remotePlayer = remotePlayer;
        if (remotePlayer) {
            console.log('actuator constructed for remote');
        } else {
            console.log('actuator constructed for local');
        }
    }

    actuate = function (data) {
    }
}

export default HTMLActuator;