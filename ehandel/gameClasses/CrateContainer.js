// Define our player character container classes
var CrateContainer = IgeEntity.extend({
	classId: 'CrateContainer',

	init: function () {
		var self = this;
		IgeEntity.prototype.init.call(this);

		// Setup the entity 3d bounds
		this.size3d(30, 30, 30);
        this.isometric(true);

		// Create a character entity as a child of this container
		this.crate = new Crate()
			.id(this.id() + '_crate')
			.drawBounds(false)
			.drawBoundsData(false)
			.originTo(0.5, 0.4, 0)
			.mount(this);
	},

	update: function (ctx) {
		// Set the depth to the y co-ordinate which basically
		// makes the entity appear further in the foreground
		// the closer they become to the bottom of the screen
		this.depth(this._translate.y);
        console.log(this._translate.y);
		IgeEntity.prototype.update.call(this, ctx);
	}
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = CharacterContainer; }
