var Client = IgeClass.extend({
	classId: 'Client',
	init: function () {
		ige.showStats(1);
		ige.globalSmoothing(false);


		var self = this;

        //The size of the map
        this.mapSize = 21;
        this.tileSize = 40;
        this.gameTexture = [];
        this.popularity = 20; //Default to 1/100 That a new order will occur every 20-th of a second

        //The current active orders
        this.orders = [];
        this.obj = [];

        // Load our textures
        self. gameTexture = [];
        self.gameTexture[0] = new IgeCellSheet('assets/textures/tiles/dirtSheet.png', 4, 1);
        self.gameTexture[1] = new IgeTexture('assets/ecommercemanager.jpg');

        // Wait for our textures to load before continuing
        ige.on('texturesLoaded', function () {
            // Create the HTML canvas
            ige.createFrontBuffer(true);

            // Start the engine
            ige.start(function (success) {
                // Check if the engine started successfully
                if (success) {
                    self.setupSplashScreen();

                }
            });
        });
	},
    setupSplashScreen : function () {
        // Load the base scene data
        ige.addGraph('IgeBaseScene');

        // Add all the items in Scene1 to the scenegraph
        // (see gameClasses/Scene1.js :: addGraph() to see
        // the method being called by the engine and how
        // the items are added to the scenegraph)
        ige.addGraph('SplashScreen');
    },
    startGame: function () {
        // Clear existing graph data
        ige.removeGraph('SplashScreen');
        ige.addGraph('GameScreen');
    }
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = Client; }
