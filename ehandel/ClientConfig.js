var igeClientConfig = {
	include: [
		/* Your custom game JS scripts */
		'./gameClasses/Character.js',
		'./gameClasses/CharacterContainer.js',
		'./gameClasses/PlayerComponent.js',
        './gameClasses/GridItem.js',
        './gameClasses/StockShelf.js',
        './gameClasses/StockShelfContainer.js',
        './gameClasses/Crate.js',
        './gameClasses/CrateContainer.js',

        './scenes/SplashScreen.js',
        './scenes/GameScreen.js',
		/* Standard game scripts */
		'./client.js',
		'./index.js'
	]
};

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = igeClientConfig; }
