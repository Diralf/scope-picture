window.TrelloPowerUp.initialize({
    'card-buttons': (t, options) => {
        const getset = {
            card: t.card('all'),
            board: t.board('all'),
        };
        console.log('Power-up is working', {t, options, ...getset});
        return [{
            text: 'Hey, test button',
        }];
    },
});
