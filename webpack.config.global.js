const path = require('path');
module.exports = {
    mode:'production',
    entry: [
        './assets/Scripts/global.js',
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'global.js',
    },
};