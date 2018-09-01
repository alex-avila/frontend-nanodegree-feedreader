/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/* We're placing all of the tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    describe('RSS Feeds', () => {
        /* This tests to make sure that the allFeeds
         * variable has been defined and that it is not
         * empty.
         */
        it('are defined', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test to see that each feed entry in allFeeds
         * has a URL defined and that the URL is not empty.
         */
         it('all have a URL', () => {
            allFeeds.forEach(feed => {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
         });


        /* Test to see that each feed entry in allFeeds
         * has a name defined and that the URL is not empty.
         */
         it('all have a name', () => {
            allFeeds.forEach(feed => {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
         });
    });


    describe('The menu', () => {
        /* Test to ensure that the menu element is
         * hidden by default.
         */
        it('is hidden by default', () => {
            expect([...document.body.classList].includes('menu-hidden')).toBe(true);
        });
    
        /* Test to ensure that the menu changes
         * visibility when the menu icon is clicked.
         */
        it('changes visibility when the menu icon is clicked', () => {
            menuIcon = document.querySelector('.menu-icon-link');
            menuIcon.click();
            expect(document.body.classList[0]).toBeUndefined();
            menuIcon.click();
            expect(document.body.classList[0]).toBe('menu-hidden');
        });
    });


    describe('Initial Entries', () => {
        /* Test to ensure that when the loadFeed function
         * is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        beforeEach(done => loadFeed(0, done));

        it('are present in .feed container when loadFeed is called', () => {
            expect(document.querySelector('.feed .entry')).not.toBeNull();
        });
    });

    describe('New Feed Selection', () => {
        /* Test to ensure that when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        const feed = document.querySelector('.feed');
        let initialHTML;
        beforeEach(done => {
            loadFeed(0, () => {
                initialHTML = feed.innerHTML;
                loadFeed(2, done);
            });
        });

        it('changes feed content when loadFeed is called', () => {
            const newHTML = feed.innerHTML;
            expect(newHTML).not.toBe(initialHTML);
        });
    });
}());
