// Self executing async so async/await can be used.
(async () => {
    /* Create a menu item for each installed search engine. 
    The ID and title are both set to the search engine's name.
    */
    const engines = await browser.search.get()
    engines.forEach(engine => {
        browser.menus.create({
            id: engine.name,
            title: engine.name,
            icons: {
                "16": engine.favIconUrl
            },
            contexts: ["selection"]
        });
    });

    // Search using the search engine whose name matches the menu item's ID.
    browser.menus.onClicked.addListener(info => {
        browser.search.search({
            query: info.selectionText,
            engine: info.menuItemId
        });
    });
})()
