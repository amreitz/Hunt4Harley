function linkProperty({ obj, name, target }) {
    return Object.defineProperty(obj, name, {
        get: function () {
            return target;
        },
        set: function (val) {
            target = val;
        },
        configurable: true,
        enumerable: true,
    });
}

export { linkProperty }