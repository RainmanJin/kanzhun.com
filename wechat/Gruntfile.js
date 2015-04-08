module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    

    less: {
      build: {
        options: {
          paths: ['src/jpm/css/'],
          yuicompress: true,
          cleancss: true,
          compress: true
        },
        files: [
          {
            expand: true,
            cwd: 'src/jpm/css/',
            src: ['**/**/*.less'],
            dest: 'build/jpm/css/',
            ext: '.css'
          }
        ]
      }
    },


    uglify: {
      my_target: {
        files: [
          {
            expand: true,
            cwd: 'src/jpm/js',
            src: '**/*.js',
            dest: 'build/jpm/js'
          }
        ]
      }
    },

    requirejs: {
      compile: {
        options: {
          appDir: 'src/js/',
          baseUrl: 'site',
          mainConfigFile: 'config.js',
          dir: 'build/js',
          optimize: 'uglify',

          //指定需要合并依赖模块
          modules: [
            //common
            {
              name: 'c/widgets'
            },
            {
              name: 'c/auth_dialog',
              exclude: ['c/widgets']
            },

            //home
            {
              name: 'c/general',
              exclude: ['c/auth_dialog', 'c/widgets', 'u/validator']
            },

            //navigator
            {
              name: 'photo',
              exclude: ['c/general', 'c/auth_dialog', 'c/widgets']
            },

            {
              name: 'search_result',
              exclude: ['c/general', 'c/auth_dialog', 'c/widgets', 'highcharts', 'c/mini_search', 'c/user_response']
            },
            {
              name: 'c/home',
              exclude: ['c/widgets', 'c/auth_dialog']
            },
            {
              name: 'c/company_pk/cmp_pk',
              exclude: ['c/widgets', 'c/auth_dialog']
            }

          ]
        }
      }
    },

    ejs: {
      all: {
        cwd: 'src/v2/ejs/',
        src: ['**/*.ejs'],
        dest: 'src/v2/html/',
        expand: true,
        ext: '.html'
      }
    },

    watch: {
      files: ['**/*'],
      tasks: ['e']
    }


  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-ejs');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('u', ['uglify']);
  grunt.registerTask('r', ['requirejs']);
  grunt.registerTask('css', ['less']);
  grunt.registerTask('e', ['ejs']);
  grunt.registerTask('w', ['watch']);
  grunt.registerTask('all', ['requirejs', 'less']);
};