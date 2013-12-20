// Define our player character container classes
var CharacterContainer = IgeEntity.extend({
	classId: 'CharacterContainer',

	init: function () {
		var self = this;
		IgeEntity.prototype.init.call(this);

		// Setup the entity 3d bounds
		self.size3d(40, 40, 60);
        self.isometric(true);

		// Create a character entity as a child of this container
		self.character = new Character()
			.id(this.id() + '_character')
			.drawBounds(true)
			.drawBoundsData(false)
			//.originTo(0.5, 0.6, 0.5)
			.mount(this);
	},

	update: function (ctx) {
		// Make sure the character is animating in the correct
		// direction
		var dir = this.path.currentDirection();

		if (dir && (dir !== this._currentDir || !this.character.animation.playing())) {
			this._currentDir = dir;
			this.character.animation.start(dir);
		}

		IgeEntity.prototype.update.call(this, ctx);
	}
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = CharacterContainer; }
