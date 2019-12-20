browserify code:

browserify -t [ babelify --presets [ react ] ] ./modules/*.js -o bundle.js