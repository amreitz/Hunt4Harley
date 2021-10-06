/** Game Loop Module
 * This module contains the game loop, which handles
 * updating the game state and re-rendering the canvas
 * (using the updated state) at the configured FPS.
 */
function gameLoop(scope) {
    const loop = window;
    // console.log("Looping mechanism successfully called")
    // Main game rendering loop
    loop.main = function mainLoop(tframe) {
        // Request a new Animation Frame
        // setting to `stopLoop` so animation can be stopped via
        // `window.cancelAnimationFrame( loop.stopLoop )`
        loop.stopLoop = window.requestAnimationFrame(loop.main);
        // setTimeout(() => loop.main = undefined, 10000);

        // Update the game state
        scope.state = scope.update();
        // Render the next frame
        scope.render();
    };

    // Start off main loop
    loop.main();

    return loop;
}

export { gameLoop }