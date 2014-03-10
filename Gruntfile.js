
module.exports = function (grunt) {
    var environment = grunt.option('env') || 'dev';

    // Project configuration.
    grunt.initConfig({

        /* Watch source code */
        watch: {
            server: {
                files: 'app/*.js',
                tasks: ['mochaTest:srv']
            }
// ,
//            browserify: {
//                files: 'assets/js/**/*.js',
//                tasks: ['browserify2']
//            },
//            uglify: {
//                files: 'public/js/main.js',
//                tasks: ['uglify:' + environment]
//            }
        },

        /* Client JS compilation */
//        browserify2: {
//            compile: {
//                entry: './assets/js/main.js',
//                compile: './public/js/main.js'
//            }
//        },

        /* Minify JS code for production */
//        uglify: {
//            prod: {
//                files: {
//                    'public/js/main.min.js': 'public/js/main.js'
//                }
//            },
//            dev: {
//            }
//        },


        /* Backend unit test*/
        mochaTest: {
            srv: {
                options: {
                    reporter: 'dot'
                },
                src: ['tests/*.js']
            }
        },


        /* Launch node application */
        nodemon: {
            dev: {
                script: 'app.js',
                options: {
//                    file: 'app/app.js',
                    cwd: 'app',
                    env: {
                        PORT: '3001',
                        env: 'dev'
                    }
                }
            },
            prod: {
                script: 'app.js',
                options: {
                   // file: 'app/app.js',
                    cwd: 'app',
                    env: {
                        PORT: '3001',
                        env: 'prod'
                    }
                }
            }
        },

        /* Launch multiple task in parallel*/
        concurrent: {
            tasks: ['nodemon:'+environment, 'watch'],
            options: {
                logConcurrentOutput: true
            }
        }
    });

    grunt.registerTask('default', 'concurrent');
//    grunt.loadTasks('config');

    grunt.loadNpmTasks('grunt-contrib-watch');
//    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
//    grunt.loadNpmTasks('grunt-browserify2');
};