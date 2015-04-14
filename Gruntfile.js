module.exports = function (grunt) {
    'use strict';

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.initConfig({
        'concat': {
            dist1: {
                src: ['lib/*.js'],
                dest: 'build/pentagine.js'
            },

            dist2: {
                src: ['node_modules/underscore/underscore.js', 'demos/sprite_list_example/PlayState_build.js'],
                dest: 'demos/sprite_list_example/PlayState_build.js'
            }
        },

        'babel': {
            options: {
                sourceMap: false
            },

            dist: {
                files: {
                    'build/pentagine.js': 'build/pentagine.js',
                    'demos/sprite_list_example/PlayState_build.js': 'demos/sprite_list_example/PlayState.js',
                    'demos/helicopter_game/PlayState_build.js': 'demos/helicopter_game/PlayState.js'
                }
            }
        },

        'browserify': {
            dist: {
                files: {
                    'demos/sprite_list_example/PlayState_build.js': 'demos/sprite_list_example/PlayState_build.js',
                    'demos/helicopter_game/PlayState_build.js': 'demos/helicopter_game/PlayState_build.js'
                }
            }
        }
    });

    grunt.registerTask('default', ['concat:dist1', 'babel', 'browserify', 'concat:dist2']);
};
