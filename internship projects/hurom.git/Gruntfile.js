module.exports = function (grunt) {
    /**
     * 所有'js/{package}/main.js'文件都将被压缩成对应的{package}.min.js文件.
     */
    var matches = grunt.file.expand('js/**/main.js');
    var requirejsTasks = {};
    if (matches.length > 0) {
        for (var i = 0; i < matches.length; i++) {
            var path = matches[i].replace(/\/main\.js/, '');
            var name = path.substr(path.lastIndexOf('/') + 1);
            requirejsTasks['task-' + name] = {
                options: {
                    baseUrl: "js/",                     //js根目录
                    name: name + '/main',                           //执行的第一个requirejs包
                    optimize: 'uglify2',
                    //optimize: 'none',
                    mainConfigFile: 'js/' + name + '/main.js',                 //requirejs的配置文件
                    out: 'js/' + name + '.min.js',                 //输出的压缩文件
                    findNestedDependencies: true,                               //必须指定让requirejs能找到嵌套的文件
                    include: ['require-2.1.17.js']                          //指定requirejs所在的位置。
                }
            };
        }
    }

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),      //指定包的信息
        processhtml: {
            dist: {
                files: {
                    'index.html': ['index.html']
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
                    'action.html': 'action.html',
                    'choose.html': 'choose.html',
                    'finish.html': 'finish.html',
                    'index.html': 'index.html',
                    'share.html': 'share.html',
                    'start.html': 'start.html'
                }
            }
        },
        cssmin: {
            options: {
                advanced: false,
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            styles: {
                src: ['css/index.tidy.css'],
                dest: 'css/index.min.css'
            }
        },
        uncss: {
            'dist-index': {
                options: {
                    ignore: []
                },
                files: {
                    'css/index.tidy.css': ['index.html', 'action.html', 'choose.html', 'finish.html', 'share.html', 'start.html']
                }
            }
        },
        requirejs: requirejsTasks
    });

    //加载所需要的库
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-uncss');

    //注册相应的类库
    grunt.registerTask('build', ['requirejs', 'uncss', 'cssmin', 'processhtml', 'htmlmin']);
};
