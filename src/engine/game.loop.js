
function gameLoop(scope) {
    const loop = window;

    loop.main = function mainLoop() {
        // setting to `stopLoop` so animation can be stopped via
        // `window.cancelAnimationFrame( loop.stopLoop )`
        loop.stopLoop = window.requestAnimationFrame(loop.main);

        scope.state = scope.update();
        scope.render();
    };


    loop.main();

    return loop;
}

export { gameLoop }