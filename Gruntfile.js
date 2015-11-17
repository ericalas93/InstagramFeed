module.exports = function(grunt) {

  grunt.initConfig({
	  
	sass: {
		dist: {
			files: {
				'styles/css/style.css' : 'styles/scss/style.scss'
			}
		}
	},
		
		
	browserSync: {
        dev: {
            //files to watch
            bsFiles: {
                src : [
                    'styles/css/*.css',
                    '*.html', 
                    'src/js/bundle.js'
                ]
            },
            options: {
                watchTask: true,
				//top right shows injection notification, annoying so turn it off
                notify: false, 
                //setting a proxy is when using with a set server. Typically I use MAMP to set a server
                //proxy: "localhost:80",
                //Working with only local files, so we will use BrowserSync's mini server
                server: {
		            baseDir: "./"
		        }
            }
        }
    },
		
	browserify: {
	  dist: {
	    options: {
	      transform: [["babelify", { "stage": 0 }]]
	    },
	    files: {
	      "src/js/bundle.js": "src/build/app.js"
	    }
	  }
	},
	
	
	watch: {
		//This watches for changes in es6, jsx, or js files before transpiling them
	  scripts: {
	    files: "src/build/*.js",
	    tasks: ["browserify"]
	  }, 
	  css: {
	      files: "styles/scss/*.scss",
	      task: ['sass']
	  }
	}
	});
	
	grunt.loadNpmTasks("grunt-browserify");
	grunt.loadNpmTasks("grunt-contrib-sass");
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks("grunt-contrib-watch");
	
	
	grunt.registerTask("default", ["browserify","browserSync", "watch"]);
};