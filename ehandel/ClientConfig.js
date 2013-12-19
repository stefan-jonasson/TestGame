var igeClientConfig = {
	include: [
		/* Your custom game JS scripts */
		'./gameClasses/Character.js',
		'./gameClasses/CharacterContainer.js',
		'./gameClasses/PlayerComponent.js',
        './gameClasses/StockShelf.js',
        './gameClasses/StockShelfContainer.js',
		/* Standard game scripts */
		'./client.js',
		'./index.js'
	]
};

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = igeClientConfig; }