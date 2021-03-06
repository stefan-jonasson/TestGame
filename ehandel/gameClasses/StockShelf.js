// Define our player character classes
var StockShelf = IgeEntity.extend({
	classId: 'StockShelf',

	init: function () {
		var self = this;
		IgeEntity.prototype.init.call(this);

        self.depth(1);

		// Setup the entity
		// Load the character texture file
		this._shelfTexture = new IgeCellSheet('assets/textures/sprites/shelf_box.png', 1, 1);
        // Wait for the texture to load
        this._shelfTexture.on('loaded', function () {
            self.texture(self._shelfTexture)
                .dimensionsFromCell()
                .translateTo(-37,-56, 0)
                .cell(1);
        }, false, true);
	},
	destroy: function () {
		// Call the super class
		IgeEntity.prototype.destroy.call(this);
	}
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = Character; }
