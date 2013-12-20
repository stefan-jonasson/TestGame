var GameScreen = IgeSceneGraph.extend({
	classId: 'GameScreen',

	/**
	 * Called when loading the graph data via ige.addGraph().
	 * @param options
	 */
	addGraph: function (options) {
		var self = ige.client,
			baseScene = ige.$('baseScene');

		// Clear existing graph data
		if (ige.$('GameScreen')) {
			this.removeGraph();
		}

        // SET THIS TO TRUE TO USE ISOMETRIC OUTPUT
        // OR FALSE TO USE 2D OUTPUT. THIS DEMO WORKS
        // IN BOTH 2D AND ISOMETRIC! GIVE IT A GO!
        self.isoMode = true;

        // Create the scene
        self.mainScene = new IgeScene2d()
            .id('GameScreen')
            .drawBounds(true)
            .drawBoundsData(false)
            .mount(baseScene);

        this.setupRoom(ige.client);
        this.setupInventory(ige.client);
        this.setupPlayer(ige.client);
        this.addOrder(ige.client);
        var game = this;
        //Start the new order event loop
        setInterval(function() {game.checkPossibleOrder(self) }, 500);

	},
    addOrder: function(self) {
        // Create the 3d container that the crate entity will be mounted to
        var order =  new CrateContainer()
            .mount(self.tileMap1)
            .translateToTile(18,1);
        self.orders.push(order);
        var stop = self.mapSize - (self.orders.length) - 3;
        order._translate.tween()
            .stepBy({
                y: stop * self.tileSize
            })
            .duration(1000 * stop)
            .start();

    },
    checkPossibleOrder: function (self) {
        if (self.orders.length < 17) {
            var num = Math.ceil( Math.random() * self.popularity );
            if (num == 1) {
                this.addOrder(self);
            } else {
                console.log('no order at this time: ' + num + ' at popularity' + self.popularity);
            }
        }
    },
    setupInventory: function (self) {
        self.shelf =  [];
        self.shelf[0] = new StockShelfContainer(self.tileMap1, 2, 2).place();
        self.shelf[1] = new StockShelfContainer(self.tileMap1, 3, 2).place();
        self.shelf[2] = new StockShelfContainer(self.tileMap1, 4, 2).place();
        self.shelf[3] = new StockShelfContainer(self.tileMap1, 5, 2).place();

        self.shelf[5] = new StockShelfContainer(self.tileMap1, 2, 5).place();
        self.shelf[6] = new StockShelfContainer(self.tileMap1, 3, 5).place();
        self.shelf[7] = new StockShelfContainer(self.tileMap1, 4, 5).place();
        self.shelf[8] = new StockShelfContainer(self.tileMap1, 5, 5).place();

        self.shelf[9] = new StockShelfContainer(self.tileMap1, 2, 8).place();
        self.shelf[10] = new StockShelfContainer(self.tileMap1, 3, 8).place();
        self.shelf[11] = new StockShelfContainer(self.tileMap1, 4, 8).place();
        self.shelf[12] = new StockShelfContainer(self.tileMap1, 5, 8).place();
    },
    setupPlayer: function (self) {
        // Create the 3d container that the player
        // entity will be mounted to
        self.player = new CharacterContainer()
            .id('player')
            .addComponent(PlayerComponent)
            .addComponent(IgePathComponent)
            .drawBounds(true)
            .drawBoundsData(false)
            .mount(self.tileMap1)
            .translateToTile(10,10);

        // Create a path finder and generate a path using
        // the collision map data
        self.pathFinder = new IgePathFinder()
            .neighbourLimit(100);

        // Assign the path to the player
        self.player
            .path.drawPath(true) // Enable debug drawing the paths
            .path.drawPathGlow(true) // Enable path glowing (eye candy)
            .path.drawPathText(false); // Enable path text output


        // Register some event listeners for the path
        self.player.path.on('started', function () { console.log('Pathing started...'); });
        self.player.path.on('stopped', function () { console.log('Pathing stopped.'); });
        self.player.path.on('cleared', function () { console.log('Path data cleared.'); });
        self.player.path.on('pointComplete', function () { console.log('Path point reached...'); });
        self.player.path.on('pathComplete', function () { console.log('Path completed...'); });
        self.player.path.on('traversalComplete', function () { this._entity.character.animation.stop(); console.log('Traversal of all paths completed.'); });

        // Some error events from the path finder
        self.pathFinder.on('noPathFound', function () { console.log('Could not find a path to the destination!'); });
        self.pathFinder.on('exceededLimit', function () { console.log('Path finder exceeded allowed limit of nodes!'); });
        self.pathFinder.on('pathFound', function () { console.log('Path to destination calculated...'); });

    },
    setupRoom: function(self) {
        var map = [];
        //Create a default map with all tiles filled
        for(var i=1; i < self.mapSize-1; i++) {
            map[i] = [];
            for(var j=1; j < self.mapSize-1; j++) {
                //Change border colors
                if (i == 1 || j == 1 || i + 2 == self.mapSize || j + 2 == self.mapSize) {
                    map[i][j] = [0,2];
                } else if (j == 18) {
                    map[i][j] = [0,3];
                } else {
                    map[i][j] = [0,1];
                }
            }
        }
        // Add the texture and store the index ID it was given
        self.floorTextureMap = new IgeTextureMap()
            .depth(0)
            .translateTo(0, -410, 0)
            .tileWidth(40)
            .tileHeight(40)
            .drawGrid(false)
            .autoSection(10)
            .drawBounds(true)
            .isometricMounts(self.isoMode)
            .mount(self.mainScene);

        // The addTexture method also returns the index of the added
        // texture
        self.floorTextureMap.addTexture(self.gameTexture[0]);

        // Paint isometric texture map
        self.floorTextureMap.loadMap({
            data: map
        });
        self.objectScene = new IgeScene2d()
            .id('objectScene')
            .depth(1)
            .drawBounds(true)
            .drawBoundsData(false)
            .mount(self.mainScene);

        // Create an isometric tile map
        self.tileMap1 = new IgeTileMap2d()
            .id('tileMap1')
            .isometricMounts(self.isoMode)
            .tileWidth(40)
            .tileHeight(40)
            //.drawGrid(self.mapSize)
            .drawMouse(true)
            .drawBounds(true)
            .drawBoundsData(false)
            .translateTo(0,-410,0)
            .occupyTile(0, 0, 21, 1, 1) // Mark tile as occupied with a value of 1 (x, y, width, height, value)
            .occupyTile(0, 20, 21, 1, 1)
            .occupyTile(0, 0, 1, 20, 1)
            .occupyTile(20, 0, 1, 20, 1)
            .occupyTile(18, 1, 1, 18, 1)
            .highlightOccupied(false) // Draws a red tile wherever a tile is "occupied"
            .mount(self.objectScene);
    },

	/**
	 * The method called when the graph items are to be removed from the
	 * active graph.
	 */
	removeGraph: function () {
		// Since all our objects in addGraph() were mounted to the
		// 'scene1' entity, destroying it will remove everything we
		// added to it.
		ige.$('GameScreen').destroy();
	}
});
