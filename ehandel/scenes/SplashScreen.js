var SplashScreen = IgeSceneGraph.extend({
	classId: 'SplashScreen',

	/**
	 * Called when loading the graph data via ige.addGraph().
	 * @param options
	 */
	addGraph: function (options) {
		var self = ige.client,
			baseScene = ige.$('baseScene');

		// Clear existing graph data
		if (ige.$('SplashScreen')) {
			this.removeGraph();
		}

        var self = this;
        this.splashScene = new IgeScene2d()
            .id('splashScene')
            .mount(baseScene);

        this.splash = new IgeEntity()
            .depth(2)
            .texture( ige.client.gameTexture[1])
            .dimensionsFromTexture()
            .mouseUp(function () {
                ige.client.startGame();
                ige.input.stopPropagation(); })
            .mount(this.splashScene);

	},

	/**
	 * The method called when the graph items are to be removed from the
	 * active graph.
	 */
	removeGraph: function () {
		// Since all our objects in addGraph() were mounted to the
		// 'scene1' entity, destroying it will remove everything we
		// added to it.
		ige.$('splashScene').destroy();
	}
});
