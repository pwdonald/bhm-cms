module.exports = function(grunt) {
	grunt.initConfig({
		ts: {
			dev: {
				options: {
					module: 'commonjs',
					noImplicitAny: 'true'
				},
				src: ['**/**.ts', '!node_modules/**/*.ts']
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-ts');
	
	grunt.registerTask('default', ['ts:dev']);
};