
module.exports = function (grunt) {
    var environment = grunt.option('env') || 'dev';

    // Project configuration.
    grunt.initConfig({
        /* Watch source code */
        watch: {
            server: {
                files: 'app/*.js'
            },
            test: {
                files: ['app/*.js', 'tests/*.js'],
                tasks: "mochaTest"
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
                    cwd: 'app'
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
            }
        }
    });

    grunt.registerTask('default', 'concurrent:dev');
    grunt.registerTask('test', ['mochaTest', 'watch:test']);

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
};