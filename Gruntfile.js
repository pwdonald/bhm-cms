module.exports = function(grunt) {
	grunt.initConfig({
		ts: {
			dev: {
				options: {
					module: 'commonjs',
					noImplicitAny: 'true',
					fast: 'never'
				},
				src: ['**/**.ts', '!node_modules/**/*.ts']
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-ts');
	
	grunt.registerTask('default', ['ts:dev']);
};