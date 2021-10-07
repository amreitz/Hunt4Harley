function gameRender(scope) {
    return function render() {

        if (scope.state.hasOwnProperty('entities')) {
            var entities = scope.state.entities;
            for (var entity in entities) {
                entities[entity].render();
            }
        }
    }
}

export { gameRender }