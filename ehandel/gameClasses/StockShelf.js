// Define our player character classes
var StockShelf = IgeEntity.extend({
	classId: 'StockShelf',

	init: function () {
		var self = this;
		IgeEntity.prototype.init.call(this);

		// Setup the entity
		self.depth(1)
			.size3d(40, 40, 40);

		// Load the character texture file
		//this._characterTexture = new IgeCellSheet('assets/textures/sprites/womanWalking.png', 9, 8);
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
