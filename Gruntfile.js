module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    copy: {
      prod: {
        files: [
          { expand: true, cwd: 'assets/', src: ['**'], dest: 'public/'} // includes files in path and its subdirs
        ]
      }
    },

    less: {
      devo: {
        files: {
          'public/stylesheets/style.css': 'styles/style.less'
        }
      },
      prod: {
        options: {
          compress: true
        },
        files: {
          'public/stylesheets/style.css': 'styles/style.less'
        }
      }
    },

    jade: {
      no_runtime: {
        files: {
          'public/': ['views/*.jade']
        },
        options: {
          runtime: false,
          client: false
        }
      }
    },
    
    watch: {
      assets: {
        files: ['assets/**/*'],
        tasks: ['default']
      },
      styles: {
        files: ['styles/*.less'],
        tasks: ['default']
      },
      views: {
        files: ['views/*.jade', 'layouts/*.jade'],
        tasks: ['default']
      }
    },
    
    clean: ['public'],

    connect: {
      server: {
        options: {
          port: 8080,
          base: './public',
          keepalive: true
        }
      }
    }
    
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-jade');

  grunt.registerTask('prod', ['clean', 'copy', 'less:prod', 'jade']);
  grunt.registerTask('default', ['clean', 'copy', 'less:devo', 'jade']);
};

   