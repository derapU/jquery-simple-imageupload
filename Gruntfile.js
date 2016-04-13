'use strict';

module.exports = function( grunt ) {

  // Project configuration.
  grunt.initConfig( {
    // Metadata.
    pkg: grunt.file.readJSON( 'simple-imageupload.jquery.json' ),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    clean: {
      files: ['dist']
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        sourceMap: true,
        sourceMapIncludeSources: true,
        sourceMapStyle: 'embed',
        stripBanners: true
      },
      dist: {
        src: ['src/js/jquery.<%= pkg.name %>.js'],
        dest: 'dist/jquery.<%= pkg.name %>.js'
      },
    },
    uglify: {
      options: {
        banner: '<%= banner %>',
        sourceMap: '<%= concat.options.sourceMap %>',
        sourceMapIncludeSources: '<%= concat.options.sourceMapIncludeSources %>',
        sourceMapStyle: '<%= concat.options.sourceMapStyle %>',
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/jquery.<%= pkg.name %>.min.js'
      }
    },
    less: {
      imageupload: {
        options: {
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapUrl: 'jquery.simple-imageupload.css.map',
          sourceMapFilename: 'dist/jquery.simple-imageupload.css.map'
        },
        files: {
          'dist/jquery.simple-imageupload.css': 'src/less/jquery.simple-imageupload.less'
        }
      }
    },
    autoprefixer: {
      options: {
        map: true,
        browsers: ['last 5 versions', 'ie 8', 'ie 9']
      },
      css: {
        src: 'dist/jquery.simple-imageupload.css',
        dest: 'dist/jquery.simple-imageupload.css'
      }
    },
    watch: {
      script: {
        files: 'src/js/**/*.js',
        tasks: ['concat']
      },
      less: {
        files: 'src/less/**/*.less',
        tasks: ['less','autoprefixer']
      }
    },
  } );

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks( 'grunt-autoprefixer' );
  grunt.loadNpmTasks( 'grunt-contrib-clean' );
  grunt.loadNpmTasks( 'grunt-contrib-concat' );
  grunt.loadNpmTasks( 'grunt-contrib-less' );
  grunt.loadNpmTasks( 'grunt-contrib-uglify' );
  grunt.loadNpmTasks( 'grunt-contrib-watch' );

  // Default task.
  grunt.registerTask( 'default', ['clean', 'concat', 'uglify', 'less', 'autoprefixer'] );

};
