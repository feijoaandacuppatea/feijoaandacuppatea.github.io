'use strict';
module.exports = function(grunt) {
  // Load all NPM grunt tasks
  //require('matchdep').filterAll('grunt-*').forEach(grunt.loadNpmTasks);



  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'js/*.js',
        '!js/main.js'
      ]
    },
    // taken from https://github.com/nicolashery/nicolashery.com/blob/v1.0.0/Gruntfile.js
    // meta: {
    //   scripts: [
    //     'js/**/*.js'
    //   ],
    //   styles: [
    //     'sass/**/*.scss',
    //     'css/**/*.css'
    //   ]
    // },
    // Combine JS modules using Browserify
    // browserify: {
    //   options: {
    //     // Shim 3rd party libraries not in `node_modules`
    //     shim: {
    //       'jquery': {path: 'bower_components/jquery/jquery.js', exports: 'jQuery'},
    //       'fastclick': {path: 'bower_components/fastclick/lib/fastclick.js', exports: 'jQuery'},
    //       'jquery-jail': {path: 'bower_components/JAIL/src/jail.js', exports: 'jail'}
    //     }
    //   },
    //   debug: {
    //     src: ['app/main.js'],
    //     dest: 'debug/app.js',
    //     options: {
    //       debug: true
    //     }
    //   },
    //   build: {
    //     src: ['app/main.js'],
    //     dest: 'build/app.js'
    //   }
    // },

    // Compile Sass files to CSS
    // compass: {
    //   options: {
    //     require: 'compass-inuit',
    //     sassDir: 'sass'
    //   },
    //   debug: {
    //     options: {
    //       cssDir: 'debug',
    //       // For source maps
    //       debugInfo: true,
    //       outputStyle: 'expanded'
    //     }
    //   },
    //   build: {
    //     options: {
    //       cssDir: 'build'
    //     }
    //   }
    // },

    // // Concatenate files
    // concat: {
    //   debug: {
    //     files: {
    //       'debug/style.css': ['debug/main.css', 'css/pygments.css']
    //     }
    //   },
    //   build: {
    //     files: {
    //       'build/style.css': ['build/main.css', 'css/pygments.css']
    //     }
    //   }
    // },
    //
    // // Minify CSS files
    // cssmin: {
    //   build: {
    //     files: {
    //       'build/style.min.css': ['build/style.css']
    //     }
    //   }
    // },
    // // Minify JS files
    // uglify: {
    //   build: {
    //     files: {
    //       'build/app.min.js': ['build/app.js']
    //     }
    //   }
    // },
    // Watch files for changes
    // watch: {
    //   scripts: {
    //     files: ['<%= meta.scripts %>'],
    //     tasks: ['browserify2:debug']
    //   },
    //   styles: {
    //     files: ['<%= meta.styles %>'],
    //     tasks: ['compass:debug', 'concat:debug']
    //   }
    // },
    // Clean target directories
    // clean: {
    //   debug: ['debug'],
    //   buildTemp: [
    //     'build/main.css',
    //     'build/style.css',
    //     'build/app.js'
    //   ],
    //   all: ['debug', 'build']
    // },

    // Run Jekyll commands
    // jekyll: {
    //   server: {
    //     options: {
    //       serve: true,
    //       // Add the --watch flag, i.e. rebuild on file changes
    //       watch: true
    //     }
    //   },
    //   build: {
    //     options: {
    //       serve: false
    //     }
    //   }
    // },

    // below from MinimalMistake
    watch: {
      js: {
        files: [
          '<%= jshint.all %>'
        ],
        tasks: ['jshint', 'uglify'],
        options: {
          livereload: true
        }
      },
    },
    uglify: {
      dist: {
        options: {
          banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */',
          compress: true,
          beautify: false,
          mangle: false
        },
        files: {
          'js/main.js': [
            'js/plugins/*.js',
            'js/_*.js'
          ]
        }
      }
    },
    imagemin: {
      dist: {
        options: {
          optimizationLevel: 7,
          progressive: true
        },
        files: [{
          expand: true,
          cwd: 'images/',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: 'images/'
        }]
      }
    },
    imgcompress: {
      dist: {
        options: {
          optimizationLevel: 7,
          progressive: true
        },
        files: [{
          expand: true,
          cwd: 'images/',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: 'images/'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'images/',
          src: '{,*/}*.svg',
          dest: 'images/'
        }]
      }
    },
    image_resize: {

      thumbs: {
        options: {
          width: 400,
                  overwrite: true
        },

        files: [{
          expand: true,
          cwd: "images/originals/",
          src: "*.jpg",
          dest: "images/thumbs/",
          ext: ".jpg",
          quality:1
          //extDot: "first"
        }]
      },

      medium: {
        options: {
          width: 800,
                  overwrite: false
        },

        files: [{
          expand: true,
          //cwd: "images/originals/",
          src: "images/originals/*.jpg",
          dest: "images/medium/",
          ext: ".jpg",
          extDot: "first"
        }]
      },

      large: {
        options: {
          width: 1200,
                  overwrite: false
        },

        files: [{
          expand: true,
          cwd: "images/originals/",
          src: "*.jpg",
          dest: "images/large/",
          ext: ".jpg",
          extDot: "first"
        }]
      }
    },
  });

  // Compile JS & CSS, run watch to recompile on change
  // grunt.registerTask('debug', function() {
  //   // Rebuild './debug'
  //   grunt.task.run([
  //     //'clean:debug',
  //     'compass:debug',
  //     'browserify:debug',
  //     'concat:debug'
  //   ]);
  //   // Watch for changes
  //   grunt.task.run('watch');
  // });
  //
  // // Alias to `grunt jekyll:server`
  // grunt.registerTask('server', 'jekyll:server');
  //
  // // Run Jekyll build with environment set to production
  // grunt.registerTask('jekyll-production', function() {
  //   grunt.log.writeln('Setting environment variable JEKYLL_ENV=production');
  //   process.env.JEKYLL_ENV = 'production';
  //   grunt.task.run('jekyll:build');
  // });
  //
  // // Compile and minify JS & CSS, run Jekyll build for production
  // grunt.registerTask('build', [
  //   'clean:all',
  //   'compass:build',
  //   'browserify:build',
  //   'concat:build',
  //   'cssmin',
  //   'uglify',
  //   'clean:buildTemp',
  //   'jekyll-production'
  // ]);
  //
  // grunt.registerTask('default', ['debug']);

  // Register tasks
  grunt.registerTask('scripts', ['watch', 'uglify']);
  grunt.registerTask('images', ['newer:imgcompress', 'newer:svgmin']);

  grunt.registerTask('resize', [
  "image_resize:thumbs",
  //"image_resize:medium",
  "image_resize:large"
  ]);

  // Load tasks
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-imgcompress');
  grunt.loadNpmTasks('grunt-image-resize');
};
