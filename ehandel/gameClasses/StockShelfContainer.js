// Define our player character container classes
var StockShelfContainer = IgeEntity.extend({
	classId: 'StockShelfContainer',

	init: function () {
		var self = this,
            numBoxes = 4,
            boxes = [];
		IgeEntity.prototype.init.call(this);

		// Setup the entity 3d bounds
		self.size3d(numBoxes * 40, 40, 40);
        self.occupyTile(1, 1, numBoxes, 1);

		// Create a character entity as a child of this container
        for(var i = 0; i < 1; i++) {
            boxes[i] = new StockShelf()
                .id(this.id() + '_' + i + 'box')
                .drawBounds(true)
                .drawBoundsData(false)
                .originTo(0.5 , 0.6, 0.5)
                .mount(this);
        }
	},

	update: function (ctx) {
		IgeEntity.prototype.update.call(this, ctx);
	}
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = CharacterContainer; }
