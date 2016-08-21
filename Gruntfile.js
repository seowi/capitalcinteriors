module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),


        connect: {
          all: {
            options:{
              port: 9000,
              hostname: "0.0.0.0",
              // Prevents Grunt to close just after the task (starting the server) completes
              // This will be removed later as `watch` will take care of that
              // keepalive: true
            }
          }
        },
        concat: {   
            dist: {
                src: [
                    'js/*.js', 
                    'js/*/*.js', 
                    '!js/build/*.js', 
                ],
                dest: 'js/build/production.js',
            }
        },
        uglify: {
            build: {
                src: 'js/build/production.js',
                dest: 'js/build/production.min.js'
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'css/admin.css': 'css/admin.scss',
                    'css/production.css': 'css/main.scss'
                }
            } 
        },
        watch: {
            options: {
                livereload: 12345,
            },
            scripts: {
                files: ['js/*.js','js/*/*.js','!js/build/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false,
                }
            },
            css: {
                files: ['css/*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: false,
                }
            }
        }

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    // grunt.registerTask('default', ['concat', 'uglify', 'imagemin']);
    grunt.registerTask('default', ['concat', 'uglify', 'sass', 'watch']);

};