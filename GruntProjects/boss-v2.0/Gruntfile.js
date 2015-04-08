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
//            baseUrl: '',
            mainConfigFile: 'config.js',
            dir: 'build/js',
            optimize: 'uglify',

            //指定需要合并依赖模块
            modules: [
//              {
//                name: 'photo',
//                exclude: ['general', 'c/auth_dialog', 'c/widgets']
//              }
              {
                name: 's/ugc/widgets'
              }
            ]
        }
      }
    }


  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  grunt.registerTask('u', ['uglify']);     //压缩js
  grunt.registerTask('r', ['requirejs']);  //合并并压缩requirejs模块
  grunt.registerTask('css', ['less']);     //编译并压缩less

};