function buildCanvas(id, canvasID) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.id = canvasID

    const container = document.getElementById(id)
    const [width, height] = getContainerDimensions(container);

    const scale = window.devicePixelRatio;


    canvas.width = Math.floor(width*scale);
    canvas.height = Math.floor(height*scale);

    canvas.style.width = width*scale;
    canvas.style.height = height*scale;

    context.scale(scale, scale);
    context.imageSmoothingEnabled = false;

    container.appendChild(canvas);

    return {
        canvas: canvas,
        context: context,
        width: width,
        height: height,
        scale: scale,
    }
}

function getContainerDimensions(container) {
    const {width, height} = container.getBoundingClientRect();
    const padding = parseFloat(getComputedStyle(container).padding);
    return [Math.floor(width-padding*2), Math.floor(height-padding*2)];
}

export {buildCanvas}