module.exports = function (grunt) {
    var matches = grunt.file.expand('js/app/**/main.js');
    var requirejsTasks = {};
    if (matches.length > 0) {
        for (var i = 0; i < matches.length; i++) {
            var path = matches[i].replace(/\/main\.js/, '');
            var name = path.substr(path.lastIndexOf('/') + 1);
            requirejsTasks['task-' + name] = {
                options: {
                    baseUrl: "js/",                     //js根目录
                    name: 'app/' + name + '/main',                           //执行的第一个requirejs包
                    optimize: 'uglify2',
                    mainConfigFile: 'js/app/' + name + '/main.js',                 //requirejs的配置文件
                    out: 'js/' + name + '.min.js',                 //输出的压缩文件
                    findNestedDependencies: true,                               //必须指定让requirejs能找到嵌套的文件
                    include: ['lib/require.js']                          //指定requirejs所在的位置。
                }
            };
        }
    }

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),      //指定包的信息
        processhtml: {
            dist: {
                files: {
                    'index.html': ['index.html'],
                    'option.html': ['option.html'],
                    'selection.html': ['selection.html'],
                    'type.html': ['type.html'],
                    'questionaire.html': ['questionaire.html'],
                    'recommendation.html': ['recommendation.html']
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'index.html': 'index.html',
                    'option.html': 'option.html',
                    'selection.html': ['selection.html'],
                    'type.html': ['type.html'],
                    'questionaire.html': 'questionaire.html',
                    'partial/questionaire-stirred-detail.html': 'partial/questionaire-stirred-detail.html',
                    'partial/questionaire-set-detail.html': 'partial/questionaire-set-detail.html',
                    'partial/questionaire-high-protein-detail.html': 'partial/questionaire-high-protein-detail.html',
                    'partial/questionaire-drinking-detail.html': 'partial/questionaire-drinking-detail.html',
                    'recommendation.html': 'recommendation.html'
                }
            }
        },
        cssmin: {
            styles: {
                src: ['css/main.css'],
                dest: 'css/style.min.css'
            }
        },
        requirejs: requirejsTasks
    });

    //加载所需要的库
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-processhtml');

    //注册相应的类库
    grunt.registerTask('build', ['requirejs', 'cssmin', 'processhtml', 'htmlmin']);
};
