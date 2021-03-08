// 每次调用$.get(),$.post或者$.ajax()时，都会先调用ajaxPrefilter函数
$.ajaxPrefilter(function(options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url

})