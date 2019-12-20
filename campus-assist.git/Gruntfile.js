module.exports = function (grunt) {
    /**
     * 所有'js/app/{package}/main.js'文件都将被压缩成对应的{package}.min.js文件.
     */
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
                    //optimize: 'none',
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
                    'score.html': ['score.html'],
                    'timetable.html': ['timetable.html'],
                    'studyroom.html': ['studyroom.html']
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
                    'score.html': 'score.html',
                    'timetable.html': 'timetable.html',
                    'studyroom.html': 'studyroom.html'
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
                src: ['css/score.tidy.css'],
                dest: 'css/score.min.css'
            },
            styles2: {
                src: ['css/timetable.tidy.css'],
                dest: 'css/timetable.min.css'
            },
            styles3: {
                src: ['css/studyroom.tidy.css'],
                dest: 'css/studyroom.min.css'
            }
        },
        uncss: {
            'dist-score': {
                options: {
                    ignore: [// needed for Bootstrap's transitions
                        '.bs.carousel',
                        '.slid.bs.carousel',
                        '.slide.bs.carousel',
                        '.fade',
                        '.fade.in',
                        '.collapse',
                        '.collapse.in',
                        '.collapsing',
                        '.alert-danger',
                        '.logged-in .navbar-default',
                        '.carousel-inner > .next',
                        '.carousel-inner > .prev',
                        '.carousel-inner > .next',
                        '.carousel-inner > .prev',
                        '.carousel-inner > .next.left',
                        '.carousel-inner > .prev.right',
                        '.carousel-inner > .active.left',
                        '.carousel-inner > .active.right',
                        '.modal.in .modal-dialog'
                    ]
                },
                files: {
                    'css/score.tidy.css': ['score.html']
                }
            },
            'dist-timetable': {
                options: {
                    ignore: [// needed for Bootstrap's transitions
                        '.bs.carousel',
                        '.slid.bs.carousel',
                        '.slide.bs.carousel',
                        '.fade',
                        '.fade.in',
                        '.collapse',
                        '.collapse.in',
                        '.collapsing',
                        '.alert-danger',
                        '.logged-in .navbar-default',
                        '.carousel-inner > .next',
                        '.carousel-inner > .prev',
                        '.carousel-inner > .next',
                        '.carousel-inner > .prev',
                        '.carousel-inner > .next.left',
                        '.carousel-inner > .prev.right',
                        '.carousel-inner > .active.left',
                        '.carousel-inner > .active.right',
                        '.modal.in .modal-dialog',
                        'table',
                        'caption'
                    ]
                },
                files: {
                    'css/timetable.tidy.css': ['timetable.html']
                }
            },
            'dist-studyroom': {
                options: {
                    ignore: [// needed for Bootstrap's transitions
                        '.bs.carousel',
                        '.slid.bs.carousel',
                        '.slide.bs.carousel',
                        '.fade',
                        '.fade.in',
                        '.collapse',
                        '.collapse.in',
                        '.collapsing',
                        '.alert-danger',
                        '.logged-in .navbar-default',
                        '.carousel-inner > .next',
                        '.carousel-inner > .prev',
                        '.carousel-inner > .next',
                        '.carousel-inner > .prev',
                        '.carousel-inner > .next.left',
                        '.carousel-inner > .prev.right',
                        '.carousel-inner > .active.left',
                        '.carousel-inner > .active.right',
                        '.modal.in .modal-dialog',
                        'table',
                        'caption'
                    ]
                },
                files: {
                    'css/studyroom.tidy.css': ['studyroom.html']
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
