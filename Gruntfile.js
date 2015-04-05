module.exports = function (grunt) {
    "use strict";

    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.initConfig({
        "babel": {
            options: {
                sourceMap: false
            },

            dist: {
                files: {
                    "build/pentagine.js": "lib/pentagine.js",
                    "demos/helicopter_game/PlayState_build.js": "demos/helicopter_game/PlayState.js"
                }
            }
        },

        "browserify": {
            "options": {
                sourceMap: false
            },

            dist: {
                files: {
                    "demos/helicopter_game/PlayState_build.js": "demos/helicopter_game/PlayState_build.js"
                }
            }
        }
    });

    grunt.registerTask("default", ["babel", "browserify"]);
};
