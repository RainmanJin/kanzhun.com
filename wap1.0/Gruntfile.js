module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    less:{
        build: {
            options: {
                paths: ['src/css/'],
                //yuicompress: true
                cleancss: true
            },
            files: [
                {
                    expand: true,
                    cwd: 'src/css/',
                    src: ['**/*.less'],
                    dest: 'build/css/',
                    ext: '.css'
                }
            ]
        }
    },


    uglify: {
      my_target: {
        files: [{
            expand: true,
            cwd: 'src/js',
            src: '**/*.js',
            dest: 'build/js'
        }]
      }
    },

    requirejs: {
      compile: {
        options:{
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
                name: 'general',
                exclude: ['c/auth_dialog', 'c/widgets']
              },

              //navigator
              {
                name: 'photo',
                exclude: ['general', 'c/auth_dialog', 'c/widgets']
              },

              //ugc
              // {
              //   name: 'ugc/component_ugc'
              // },

              //login & register
              // {
              //   name: 'auth'
              // }
            ]
        }
      }
    }


  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  grunt.registerTask('u', ['uglify']);
  grunt.registerTask('r', ['requirejs']);
  grunt.registerTask('css', ['less']);

};