/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

import jsdom from 'jsdom';
import register from 'ignore-styles';

register(['.scss', '.sass', '.css', '.png', '.jpeg']);

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
const win = doc.defaultView;

global.document = doc;
global.window = win;

// set width variable for tests or else App.spec.js will throw an NaN error
global.document.body.clientWidth = 1024;

Object.keys(window).forEach((key) => {
    if (!(key in global)) {
        global[key] = window[key];
    }
});

function mockStorage() {
    const storage = {};
    return {
        setItem(key, value) {
            storage[key] = value || '';
        },
        getItem(key) {
            return storage[key];
        },
        removeItem(key) {
            delete storage[key];
        },
        get length() {
            return Object.keys(storage).length;
        },
        key(i) {
            const keys = Object.keys(storage);
            return keys[i] || null;
        }
    };
}

global.localStorage = mockStorage();
global.sessionStorage = mockStorage();
