/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const { JSDOM } = require('jsdom');
const register = require('ignore-styles').default;

register(['.scss', '.sass', '.css', '.png', '.jpeg']);

// jsdom config from: https://github.com/airbnb/enzyme/blob/master/docs/guides/jsdom.md
const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

function copyProps(src, target) {
    const props = Object.getOwnPropertyNames(src)
        .filter((prop) => {
            return typeof target[prop] === 'undefined';
        })
        .map((prop) => {
            return Object.getOwnPropertyDescriptor(src, prop);
        });
    Object.defineProperties(target, props);
}

global.window = window;
global.document = window.document;
global.navigator = {
    userAgent: 'node.js',
};
copyProps(window, global);

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

// define btoa which is not part of jsdom
// from: https://stackoverflow.com/questions/23097928/node-js-btoa-is-not-defined-error

if (typeof btoa === 'undefined') {
    global.btoa = (str) => {
        return new Buffer(str).toString('base64');
    };
}
