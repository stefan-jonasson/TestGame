// Define our player character classes
var Character = IgeEntity.extend({
	classId: 'Character',

	init: function () {
		var self = this;
		IgeEntity.prototype.init.call(this);

		// Setup the entity
		self.addComponent(IgeAnimationComponent)
			.addComponent(IgeVelocityComponent)
			.depth(1)
			.size3d(40, 40, 40);

		// Load the character texture file
		this._characterTexture = new IgeCellSheet('assets/textures/sprites/womanWalking.png', 9, 8);

		// Wait for the texture to load
		this._characterTexture.on('loaded', function () {
			self.texture(self._characterTexture)
				.dimensionsFromCell();
            self.animation.define('S', [1, 2, 3, 4, 5, 6, 7, 8, 9], 8, -1)
                .animation.define('W', [19, 20, 21, 22, 23, 24, 25, 26, 27], 8, -1)
                .animation.define('E', [63, 64, 65, 66, 67, 68, 69, 70, 71], 8, -1)
                .animation.define('N', [37, 38, 39, 40, 41, 42, 43, 44, 45], 8, -1)
                .cell(1);

            this._restCell = 1;
		}, false, true);
	},

	/**
	 * Tweens the character to the specified world co-ordinates.
	 * @param x
	 * @param y
	 * @return {*}
	 */
	walkTo: function (x, y) {
		var self = this,
			distX = x - this.translate().x(),
			distY = y - this.translate().y(),
			distance = Math.distance(
				this.translate().x(),
				this.translate().y(),
				x,
				y
			),
			speed = 0.1,
			time = (distance / speed);

		// Set the animation based on direction
		if (Math.abs(distX) > Math.abs(distY)) {
			// Moving horizontal
			if (distX < 0) {
				// Moving left
				this.animation.select('W');
			} else {
				// Moving right
				this.animation.select('E');
			}
		} else {
			// Moving vertical
			if (distY < 0) {
				// Moving up
				this.animation.select('N');
			} else {
				// Moving down
				this.animation.select('S');
			}
		}

		// Start tweening the little person to their destination
		this._translate.tween()
			.stopAll()
			.properties({x: x, y: y})
			.duration(time)
			.afterTween(function () {
				self.animation.stop();
				// And you could make him reset back
				// to his original animation frame with:
				self.cell(self._restCell);
			})
			.start();

		return this;
	},

	update: function (ctx) {
		// Set the depth to the y co-ordinate which basically
		// makes the entity appear further in the foreground
		// the closer they become to the bottom of the screen
		this.depth(this._translate.y);

		IgeEntity.prototype.update.call(this, ctx);
	},

	destroy: function () {
		// Destroy the texture object
		if (this._characterTexture) {
			this._characterTexture.destroy();
		}

		// Call the super class
		IgeEntity.prototype.destroy.call(this);
	}
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = Character; }
