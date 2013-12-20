// Define our player character container classes
var StockShelfContainer = GridItem.extend({
	classId: 'StockShelfContainer',

	init: function (parent, tileX, tileY) {
		var self = this,
            boxes = [];

        GridItem.prototype.init.call(this, tileX, tileY, 1, 1);

        // Setup the 3d bounds container (this)
        this.isometric(true)
            .mount(parent)
            .size3d(parent._tileWidth, parent._tileHeight, 75)
            .translateToTile(tileX, tileY, 0)
            .drawBounds(true)
            .drawBoundsData(false);

        this.shelf =  new StockShelf()
            .id(this.id() + '_box')
            .drawBounds(true)
            .drawBoundsData(false)
            .originTo(0, 0, 0)
            .mount(this)
            .occupyTile(tileX, tileY, 1, 1);

	},
    translateToTile: function (tileX, tileY) {
        return GridItem.prototype.translateToTile.call(this, (tileX) , (tileY) , 0);
    }
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = CharacterContainer; }
