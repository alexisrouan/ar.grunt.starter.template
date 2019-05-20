module.exports = function ( grunt ) {
    var jsSrc = [ 'src/js/scripts.js' ];
    var jsDistMin = 'dist/js/scripts.min.js';

    grunt.initConfig( {
        // ┌──────────────────────────────────────────────────────────┐
        // │                                                          │
        // │      SASS                                                │
        // │      https://github.com/gruntjs/grunt-contrib-sass       │
        // │                                                          │
        // └──────────────────────────────────────────────────────────┘
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: [
                    {
                        expand: true,
                        cwd: './src/css/', // Parent folder of original CSS templates
                        src: '*.scss', // Collects all `*.css` files within the parent folder
                        dest: './dist/css', // Stores the collected `*.css` files in your `src/css/` folder
                        ext: '.css'
                    }
                ]
            }
        },

        // ┌──────────────────────────────────────────────────────────┐
        // │                                                          │
        // │      WATCH                                               │
        // │      https://github.com/gruntjs/grunt-contrib-watch      │
        // │                                                          │
        // └──────────────────────────────────────────────────────────┘
        watch: {
            scripts: {
                files: [ 'src/js/jquery.ar.animate-list.js' ],
                tasks: [ 'jshint' ],
                options: {
                    interrupt: true
                }
            },
            styles: {
                files: 'src/css/*.scss',
                tasks: [ 'styles:dist' ]
            },
            front: {
                files: 'src/html/*.html',
                tasks: [ 'front:dist' ]
            }
        },

        // ┌──────────────────────────────────────────────────────────┐
        // │                                                          │
        // │      UGLIFY                                              │
        // │      https://github.com/gruntjs/grunt-contrib-uglify     │
        // │                                                          │
        // └──────────────────────────────────────────────────────────┘
        uglify: {
            options: {
                separator: ';'
            },
            compile: {
                src: jsSrc,
                dest: jsDistMin
            }
        },

        // ┌──────────────────────────────────────────────────────────┐
        // │                                                          │
        // │      JSHINT                                              │
        // │      https://github.com/gruntjs/grunt-contrib-jshint     │
        // │                                                          │
        // └──────────────────────────────────────────────────────────┘
        jshint: {
            all: [ 'Gruntfile.js', 'src/js/*.js' ]
        },


        // ┌──────────────────────────────────────────────────────────┐
        // │                                                          │
        // │      COPY                                                │
        // │      https://github.com/gruntjs/grunt-contrib-copy       │
        // │                                                          │
        // └──────────────────────────────────────────────────────────┘
        copy: {
            main: {
              files: [
                // includes files within path
                {expand: true, src: ['path/*'], dest: 'dest/', filter: 'isFile'},
          
                // includes files within path and its sub-directories
                {expand: true, src: ['path/**'], dest: 'dest/'},
          
                // makes all src relative to cwd
                {expand: true, cwd: 'path/', src: ['**'], dest: 'dest/'},
          
                // flattens results to a single level
                {expand: true, flatten: true, src: ['path/**'], dest: 'dest/', filter: 'isFile'},
              ],
            },
            front: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['src/html/*'],
                    dest: 'dist/',
                    filter: 'isFile'
                }]
            }
          },



    } );

    // ┌──────────────────────────────────────────────────────────┐
    // │                                                          │
    // │      Import des packages                                 │
    // │                                                          │
    // └──────────────────────────────────────────────────────────┘
    grunt.loadNpmTasks( 'grunt-contrib-sass' );
    grunt.loadNpmTasks( 'grunt-contrib-copy' );
    grunt.loadNpmTasks( 'grunt-contrib-watch' );
    grunt.loadNpmTasks( 'grunt-contrib-jshint' );
    grunt.loadNpmTasks( 'grunt-contrib-uglify' );

    // ┌──────────────────────────────────────────────────────────┐
    // │                                                          │
    // │      Définition des taches                               │
    // │                                                          │
    // └──────────────────────────────────────────────────────────┘
    grunt.registerTask( 'default', [
        'sass:dist',
        'jshint',
        'uglify:compile',
        'copy:front',
        'watch'
    ] );
    grunt.registerTask( 'scripts:dist', [ 'jshint', 'uglify' ] );
    grunt.registerTask( 'styles:dist', [ 'sass:dist' ] );
    grunt.registerTask( 'front:dist', [ 'copy:front' ] );
};
