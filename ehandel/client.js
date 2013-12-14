var Client = IgeClass.extend({
	classId: 'Client',
	init: function () {
		ige.showStats(1);
		ige.globalSmoothing(false);

		// Load our textures
		var self = this,
            gameTexture = [],
            map = [];

        //The size of the map
        self.mapSize = 20;

        //Create a default map with all tiles filled
        for(var i=0; i < self.mapSize; i++) {
            map[i] = [];
            for(var j=0; j < self.mapSize; j++) {
                map[i][j] = [0,1];
            }
        }

        this.obj = [];
        gameTexture[0] = new IgeCellSheet('assets/textures/tiles/dirtSheet.png', 4, 1);

		// Create the HTML canvas
		ige.createFrontBuffer(true);

		// Start the engine
		ige.start(function (success) {
			// Check if the engine started successfully
			if (success) {
				// SET THIS TO TRUE TO USE ISOMETRIC OUTPUT
				// OR FALSE TO USE 2D OUTPUT. THIS DEMO WORKS
				// IN BOTH 2D AND ISOMETRIC! GIVE IT A GO!
				self.isoMode = true;

				// Create the scene
				self.mainScene = new IgeScene2d()
					.id('mainScene')
					.drawBounds(false)
					.drawBoundsData(false)

				self.uiScene = new IgeScene2d()
					.id('uiScene')
					.depth(1)
					.drawBounds(false)
					.drawBoundsData(false)
					.ignoreCamera(true) // We don't want the UI scene to be affected by the viewport's camera
					.mount(self.mainScene);

				// Create the main viewport
				self.vp1 = new IgeViewport()
					.addComponent(IgeMousePanComponent)
					.mousePan.limit(new IgeRect(-600, -600, 600, 600))
					.mousePan.enabled(true)
					.id('vp1')
					.autoSize(true)
					.scene(self.mainScene)
					.drawMouse(true)
					.drawBounds(true)
					.drawBoundsData(true)
					.mount(ige);

				// Create some listeners for when the viewport is being panned
				// so that we don't create a new path accidentally after a mouseUp
				// occurs if we were panning
				self.vp1.mousePan.on('panStart', function () {
					// Store the current cursor mode
					ige.client.data('tempCursorMode', ige.client.data('cursorMode'));

					// Switch the cursor mode
					ige.client.data('cursorMode', 'panning');
					ige.input.stopPropagation();
				});

				self.vp1.mousePan.on('panEnd', function () {
					// Switch the cursor mode back
					ige.client.data('cursorMode', ige.client.data('tempCursorMode'));
					ige.input.stopPropagation();
				});

                // Add the texture and store the index ID it was given
                self.floorTextureMap = new IgeTextureMap()
                    .depth(0)
                    .translateTo(0, -450, 0)
                    .tileWidth(40)
                    .tileHeight(40)
                    .drawGrid(self.mapSize)
                    .autoSection(10)
                    //.drawMouse(true)
                    .drawBounds(false)
                    .isometricMounts(true)
                    .mount(self.mainScene);

                // The addTexture method also returns the index of the added
                // texture
                self.floorTextureMap.addTexture(gameTexture[0]);

                // Paint isometric texture map
                self.floorTextureMap.loadMap({
                    data: map
                });

                self.objectScene = new IgeScene2d()
                    .id('objectScene')
                    .depth(1)
                    .drawBounds(false)
                    .drawBoundsData(false)
                    .mount(self.mainScene);

				// Create an isometric tile map
				self.tileMap1 = new IgeTileMap2d()
					.id('tileMap1')
					.isometricMounts(self.isoMode)
					.tileWidth(40)
					.tileHeight(40)
					.drawGrid(self.mapSize)
					.drawMouse(true)
					.drawBounds(false)
					.drawBoundsData(false)
                    .translateTo(0,-450,0)
					.occupyTile(1, 1, 1, 1, 1) // Mark tile as occupied with a value of 1 (x, y, width, height, value)
					.occupyTile(1, 2, 1, 1, 1)
					.occupyTile(1, 3, 1, 1, 1)
					.occupyTile(1, 4, 1, 1, 1)
					.occupyTile(2, 4, 1, 1, 1)
					.occupyTile(4, 4, 1, 1, 1)
					.occupyTile(4, 3, 1, 1, 1)
					.occupyTile(4, 2, 1, 1, 1)
					.occupyTile(3, 2, 1, 1, 1)
					.occupyTile(3, 1, 1, 1, 1)
					.occupyTile(1, 0, 1, 1, 1)
					.occupyTile(1, 2, 1, 1, 1)
					.occupyTile(2, 2, 1, 1, 1)
					.occupyTile(3, 2, 1, 1, 1)
					.occupyTile(4, 2, 1, 1, 1)
					.occupyTile(5, 2, 1, 1, 1)
					.occupyTile(5, 0, 1, 1, 1)
					.occupyTile(6, 1, 1, 1, 1)
					.occupyTile(6, 2, 1, 1, 1)
					.occupyTile(6, 3, 1, 1, 1)
					.highlightOccupied(true) // Draws a red tile wherever a tile is "occupied"
					.mount(self.objectScene);

				// Define a function that will be called when the
				// mouse cursor moves over one of our entities
				overFunc = function () {
					this.highlight(true);
					this.drawBounds(true);
					this.drawBoundsData(true);
				};

				// Define a function that will be called when the
				// mouse cursor moves away from one of our entities
				outFunc = function () {
					this.highlight(false);
					this.drawBounds(false);
					this.drawBoundsData(false);
				};

				// Create the 3d container that the player
				// entity will be mounted to
				self.player = new CharacterContainer()
					.id('player')
					.addComponent(PlayerComponent)
					.addComponent(IgePathComponent)
					.mouseOver(overFunc)
					.mouseOut(outFunc)
					.drawBounds(false)
					.drawBoundsData(false)
					.mount(self.tileMap1);

				// Check if the tileMap1 is is iso mode
				if (self.tileMap1.isometricMounts()) {
					// Set the player to move isometrically
					self.player.isometric(true);
				}

				// Create a UI entity so we can test if clicking the entity will stop
				// event propagation down to moving the player. If it's working correctly
				// the player won't move when the entity is clicked.
				self.topBar1 = new IgeUiEntity()
					.id('topBar1')
					.depth(2)
					.backgroundColor('#474747')
					.top(0)
					.left(0)
					.width('100%')
					.height(30)
					.borderTopColor('#666666')
					.borderTopWidth(1)
					.backgroundPosition(0, 0)
					.mouseDown(function () { ige.input.stopPropagation(); })
					.mouseOver(function () {this.backgroundColor('#49ceff'); ige.input.stopPropagation(); })
					.mouseOut(function () {this.backgroundColor('#474747'); ige.input.stopPropagation(); })
					.mouseMove(function () { ige.input.stopPropagation(); })
					.mouseUp(function () { console.log('Clicked ' + this.id()); ige.input.stopPropagation(); })
					.mount(self.uiScene);

				// Create a path finder and generate a path using
				// the collision map data
				self.pathFinder = new IgePathFinder()
					.neighbourLimit(100);

				// Assign the path to the player
				self.player
					.path.drawPath(true) // Enable debug drawing the paths
					.path.drawPathGlow(true) // Enable path glowing (eye candy)
					.path.drawPathText(true); // Enable path text output


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

			}
		});
	}
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = Client; }
