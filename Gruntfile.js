
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
        },

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
                    cwd: 'app',
                    env: {
                        PORT: process.env.PORT || '3001',
                   //     IP: process.env.IP || 'localhost',
                        env: 'dev'
                    }
                }
            },
            prod: {
                script: 'app.js',
                options: {
                    cwd: 'app',
                   /* env: {
                        PORT: '3001',
                        env: 'prod'
                    }*/
                }
            }
        },

        /* Launch multiple task in parallel*/
        concurrent: {
            dev: {
                tasks: ['nodemon:'+environment, 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            },
            test: {
                tasks: ['nodemon:dev', 'mochaTest'],
                options: {
                    logConcurrentOutput: true
                }
            }

        }
    });

    grunt.registerTask('default', 'concurrent:dev');
    grunt.registerTask('test', 'concurrent:test');

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
};