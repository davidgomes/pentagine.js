module.exports = function (grunt) {
    'use strict';

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.initConfig({
        'concat': {
            dist: {
                src: ['lib/*.js'],
                dest: 'build/pentagine.js'
            }
        },

        'babel': {
            options: {
                sourceMap: false
            },

            dist: {
                files: {
                    'build/pentagine.js': 'build/pentagine.js',
                    'demos/helicopter_game/PlayState_build.js': 'demos/helicopter_game/PlayState.js'
                }
            }
        },

        'browserify': {
            'options': {
                sourceMap: false
            },

            dist: {
                files: {
                    'demos/helicopter_game/PlayState_build.js': 'demos/helicopter_game/PlayState_build.js'
                }
            }
        }
    });

    grunt.registerTask('default', ['concat', 'babel', 'browserify']);
};
