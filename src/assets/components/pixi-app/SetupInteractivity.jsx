export function setupInteractivity(shiprender) {
    shiprender.eventMode = 'dynamic';
    shiprender.buttonMode = true;
    let dragging = false;
    let data;
    let offset = { x: 0, y: 0 };
    shiprender.on('pointerdown', function (event) {
        //console.log('Sprite clicked:', this);
        //selectSprite(this);
        dragging = true;
        data = event.data;
        let position = data.getLocalPosition(this.parent);
        offset.x = this.x - position.x;
        offset.y = this.y - position.y;
    });
    shiprender.on('globalpointermove', function () {
        if (dragging) {
            var newPosition = data.getLocalPosition(this.parent);
            this.x = newPosition.x + offset.x;
            this.y = newPosition.y + offset.y;
        }
    });
    shiprender.on('pointerup', function () {
        dragging = false;
        data = null;
    });
}