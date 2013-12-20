// Define our player character classes
var Crate = IgeEntity.extend({
	classId: 'Crate',

	init: function () {
		var self = this;
		IgeEntity.prototype.init.call(this);

		// Setup the entity
		self.depth(3);
		// Load the character texture file
		this._crateTexture = new IgeCellSheet('assets/textures/sprites/box1.png', 1, 1);
		this._crateTextureOpen = new IgeCellSheet('assets/textures/sprites/box3.png', 1, 1);

        // Wait for the texture to load
        this._crateTextureOpen.on('loaded', function () {
            self.texture(self._crateTextureOpen)
                .dimensionsFromCell()
                .cell(1);
        }, false, true);
	},


	update: function (ctx) {
		IgeEntity.prototype.update.call(this, ctx);
	},

	destroy: function () {
		// Call the super class
		IgeEntity.prototype.destroy.call(this);
	}
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = Character; }
