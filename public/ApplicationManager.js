import MasterMind from "./MasterMind.js";
import GameManager from "./GameManager.js";
import InputManager from "./InputManager.js";

// Wait till the browser is ready to render the game (avoids glitches)
window.requestAnimationFrame(function () {

    const socket = io.connect(window.location.origin);

    const canvas = document.querySelector("canvas");
    const attempts = 8;
    const slots = 4;
    const colors = ["blue","red","green","yellow","pink","white"];

    const mm = new MasterMind(canvas,attempts,slots,colors);

    new GameManager(mm, socket, InputManager);
    // remoteGame = new GameManager(socket, true, mm, InputManager, HTMLActuator);
    // localGame = new GameManager(socket, false, mm, InputManager, HTMLActuator);
});