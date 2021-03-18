// Wait till the browser is ready to render the game (avoids glitches)
import MasterMind from "./MasterMind.js";
import GameManager from "./GameManager.js";
import InputManager from "./InputManager.js";

window.requestAnimationFrame(function () {

    const canvas = document.querySelector("canvas");
    const attempts = 8;
    const slots = 4;
    const colors = ["blue","red","green","yellow","pink","white"];

    const mm = new MasterMind(canvas,attempts,slots,colors);

    var socket = io.connect(window.location.origin);
    new GameManager(socket, false, mm, InputManager);
});