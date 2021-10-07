function addMouseEvent(target, src, name) {
    target.clickX = null;
    target.clickY = null;
    target.events = target.events || {};

    const xScale = src.width / target.width;
    const yScale = src.height / target.height;

    target.events[name] = src.addEventListener('click', function (e) {
        target.clickX = Math.round(e.offsetX);
        target.clickY = Math.round(e.offsetY);
    })
}

function removeMouseEvent(target, src, name) {
    src.removeEventListener('click', target.events[name])
}

function addTouchEvent(target, src, name) {
    target.clickX = null;
    target.clickY = null;
    target.events = target.events || {};

    const xScale = src.width / target.width;
    const yScale = src.height / target.height;

    target.events[name] = src.addEventListener('touchstart', function (e) {
        target.clickX = Math.round(e.offsetX);
        target.clickY = Math.round(e.offsetY);
    }, { passive: true })
}

function removeTouchEvent(target, src, name) {
    src.removeEventListener('touchstart', target.events[name]);
}

export { addMouseEvent, removeMouseEvent, addTouchEvent, removeTouchEvent };