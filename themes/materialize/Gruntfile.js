const loadGruntTasks = require('load-grunt-tasks');

module.exports = (grunt) => {
  grunt.initConfig({
    copy: {
      fontawesome: {
        expand: true,
        cwd: 'node_modules/font-awesome/fonts/',
        src: ['**'],
        dest: 'source/fonts/'
      },
      materialize: {
        expand: true,
        cwd: 'node_modules/materialize-css/dist/',
        src: [
          'font/**'
        ],
        dest: 'source/'
      },
      lightbox: {
        expand: true,
        cwd: 'node_modules/lightbox2/dist/',
        src: ['images/**'],
        dest: 'source/'
      }
    },

    clean: {
      fontawesome: ['source/css/fonts'],
      materialize: ['source/font']
    },

    uglify: {
      options: {
        mangle: false
      },
      vendors: {
        files: {
          '.tmp/vendors.min.js': [
            'node_modules/jquery-circle-progress/dist/circle-progress.js',
            'node_modules/requirejs/require.js'
          ]
        }
      }
    },

    concat: {
      scripts: {
        dest: 'source/js/vendors.js',
        src: [
          'node_modules/jquery/dist/jquery.min.js',
          'node_modules/materialize-css/dist/js/materialize.min.js',
          '.tmp/vendors.min.js'
        ]
      }
    },

    cssmin: {
      options: {
      },
      target: {
        files: {
          'source/css/vendors.css': [
            'node_modules/font-awesome/css/font-awesome.css',
            'node_modules/materialize-css/dist/css/materialize.css',
            'node_modules/lightbox2/dist/css/lightbox.css'
          ]
        }
      }
    },

    requirejs: {
      all: {
        options: {
          waitSeconds: 0,
          appDir: 'source/_js-source',
          mainConfigFile: 'source/_js-source/app.js',
          baseUrl: '.',
          optimize: 'uglify2',
          uglify2: {
            mangle: false
          },
          dir: 'source/js',
          generateSourceMaps: false,
          preserveLicenseComments: false,
          inlineText: true,
          findNestedDependencies: true,
          paths: {
            jquery: 'empty:',
            // lightbox need to be here, because it cant find images if placed on head
            lightbox: '../../node_modules/lightbox2/dist/js/lightbox'
          },
          modules: [
            {
              name: 'app'
            }
          ],
          shim: {
          },
          noBuildTxt: true
        }
      }
    }
  });

  loadGruntTasks(grunt);


  grunt.registerTask('default', []);
  grunt.registerTask('build', ['clean', 'copy', 'cssmin', 'requirejs', 'uglify', 'concat']);
};
