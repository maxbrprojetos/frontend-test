module.exports = function(grunt) {
  "use strict";
  require("load-grunt-tasks")(grunt);

  var appConfig = {

    pkg: grunt.file.readJSON('package.json'),

    connect: {
      dev: {
         options: {
            port: 9001,
            hostname: '127.0.0.1',
            base: 'src',
            livereload: true
         }
      },
      build: {
         options: {
            port: 9002,
            hostname: '127.0.0.1',
            base: 'public',
            keepalive: true
         }
      }
    },

    watch: {
        options:{
          livereload: true
        },
        css: {
            files: ['src/{,*/}*.scss'],
            tasks: ['compass:dev']
        },
        js: {
            files: ['src/{,*/}*.js'],
        },
        html: {
            files: ['src/{,*/}*.html']
        }
    },

    clean:{
       dev:{
            files: [{ dot: true, src: ['src/css/*', '!src/css/.git*']}]
       },
       build:{
            files: [{dot: true, src: ['public/css/*', '!public/css/.git*', 'public/js/*']}]
       } 
    },
    
    compass: {
      dev:{
          options: {
            sassDir: 'src/sass',
            cssDir: 'src/css',
          }
      }
    },

    concat: {
      '.tmp/concat/public/js/vendor.min.js': [
      'src/js/vendor/*.js'
      ],
      '.tmp/concat/public/js/main.min.js': [
      'src/js/main.js'
      ],
      '.tmp/concat/public/css/main.min.css': [
      'src/css/*.css'
      ]
    },

    uglify: {
      'public/js/support.min.js': ['src/js/html5/html5shiv.js'],
      'public/js/vendor.min.js': ['.tmp/concat/public/js/vendor.min.js'],
      'public/js/main.min.js': ['.tmp/concat/public/js/main.min.js']
    },

    cssmin: {
      build: {
        files: {
          'public/css/main.min.css': ['src/css/*.css']
        }
      }
    },

    copy: {
      main: {
        files: [{
          expand: true, 
          dot: true,
          cwd: 'src',
          dest: 'public', 
          src: [
          'index.html',
          'fazenda.json',
          'images/{,*}*',
          'fonts/{,*}*'
          ], 
        }]
      }
    },

    useminPrepare: {
       html: 'src/index.html',
       options: {
        root: 'src',
        dest: 'public'
      }
    },

    usemin: {
      options: {
        assetsDirs: ['public']
      },
      html: ['public/index.html'],
      css: ['public/css/main.min.css']
    },
    
    htmlmin: {                                     
      dist: {                                      
        options: {                                 
          removeComments: true,
          collapseWhitespace: true
        },
        files: {  
          'public/index.html': 'public/index.html',
        }
      }
    }
  }

  // Project configuration.
  grunt.initConfig(appConfig);

  // Default task(s).
  grunt.registerTask('default', ['']);
  
  var tasks = [
    'clean', 
    'compass', 
    'useminPrepare', 
    'concat', 
    'uglify',
    'cssmin',
    'copy',
    'usemin',
    'htmlmin'      
  ];

  grunt.registerTask('build', tasks);
  grunt.registerTask('watchFiles', [ 'connect:dev', 'watch' ]);
  
  grunt.registerTask('b', [ 'build' ]);
  grunt.registerTask('w', [ 'watchFiles' ]);

};