describe('Protractor Demo App', () => {
    it('should have a title', () => {
        browser.get('/1-test-card');

        expect(browser.getTitle()).toEqual('Test Card on Test board | Test Trello');
    });
});
