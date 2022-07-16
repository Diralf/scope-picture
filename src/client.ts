window.TrelloPowerUp.initialize({
    'card-buttons': (t, options) => {
        console.log('Power-up is working', {t, options});
        return [{
            text: 'Hey, test button',
        }];
    },
});
