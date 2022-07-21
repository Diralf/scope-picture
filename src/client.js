"use strict";
window.TrelloPowerUp.initialize({
    'card-buttons': (t, options) => {
        const card = t.card('all');
        console.log('Power-up is working', { t, options, card });
        return [{
                text: 'Hey, test button',
            }];
    },
});
