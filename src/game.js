const gameCanvas = document.getElementById('game-layer');
const gameContext = gameCanvas.getContext('2d');

let scale = window.devicePixelRatio;
// scale = 2;
gameCanvas.width = Math.floor(640 * scale);
gameCanvas.height = Math.floor(480 * scale);

gameContext.scale(scale,scale);
gameContext.imageSmoothingEnabled = false;

gameContext.textAlign = 'center';
gameContext.font = '18pt Arial';
gameContext.fillText('Hello World', 640/2, 480/2)