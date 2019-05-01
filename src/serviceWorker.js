const moment = require('moment');

let registration = false;
let notificationsOk = false;

const sendNotification = () => {
    if (!registration || !notificationsOk) return;

    registration.showNotification('Vibration Sample', {
        body: 'Buzz! Buzz!',
        icon: '../images/touch/chrome-touch-icon-192x192.png',
        vibrate: [200, 100, 200, 100, 200, 100, 200],
        tag: 'vibration-sample'
    });
};

const runFastCode = () => {
    navigator.serviceWorker.ready.then(reg => {
        console.log('Service worker is running!');
        registration = reg;

        Notification.requestPermission(function(result) {
            if (result === 'granted') {
                notificationsOk = true;
            }
        });

        let notifyAfterHours = JSON.parse(window.localStorage.getItem('notifyTime'));
        let notifyTime = moment(notifyAfterHours);

        let interval = setInterval(() => {
            console.log(`User will be notified at ${notifyTime.toString()}`);

            if (moment().isSameOrAfter(notifyTime)) {
                sendNotification();
                clearInterval(interval);
            }
        }, 60 * 100);
    });
};

export function register(config) {
    if (process.env.REACT_APP_NODE_ENV === 'production' && 'serviceWorker' in navigator) {
        // The URL constructor is available in all browsers that support SW.
        const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
        if (publicUrl.origin !== window.location.origin) {
            // Our service worker won't work if PUBLIC_URL is on a different origin
            // from what our page is served on. This might happen if a CDN is used to
            // serve assets; see https://github.com/facebook/create-react-app/issues/2374
            return;
        }

        window.addEventListener('load', () => {
            const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

            registerValidSW(swUrl, config);
        });
    }
}

function registerValidSW(swUrl, config) {
    navigator.serviceWorker
        .register(swUrl)
        .then(registration => {
            runFastCode();
        })
        .catch(error => {
            console.error('Error during service worker registration:', error);
        });
}

export function unregister() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(registration => {
            registration.unregister();
        });
    }
}
