TrelloPowerUp.initialize({
    'card-buttons': (t, options) => {
        console.log('Power-up is working', {t, options});
        console.log(Object.keys(t).sort().map((key) => `    ${key}: any;`).join('\n'));
        return [{
            text: 'Hey, test button',
        }];
    },
});
