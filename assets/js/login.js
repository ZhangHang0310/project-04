$(function() {
    // 登录页面
    // 点击去注册
    $('.goReg').on('click', function() {
            $('.login').hide();
            $('.reg').show();
        })
        // 点击去登录
    $('.goLogin').on('click', function() {
        $('.reg').hide();
        $('.login').show();
    })

    var form = layui.form

    // 自定义校验规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value) {
            if (value !== $('.form_Reg [name="pwd"]').val()) {
                return '两次密码不一致'
            }
        }

    })

    // 调用接口，发起注册用户请求
    // 在form表单中，提交按钮要用submit事件
    $('.form_Reg').on('submit', function(e) {
        e.preventDefault();
        var data = {
            username: $('.form_Reg [name="username"]').val(),
            password: $('.form_Reg [name="pwd"]').val()
        };
        $.ajax({
            type: "POST",
            url: "/api/reguser",
            data: data,
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message);
                }
                layui.layer.msg('注册成功');
                $('.form_Reg')[0].reset();
                $('.goLogin').click();

            }
        });

    })

    // 调用接口，发起登录的请求
    $('.form_login').on('submit', function(e) {
        e.preventDefault();
        var data = {
            username: $('.form_login [name="username"]').val(),
            password: $('.form_login [name="pwd"]').val()
        };
        $.ajax({
            type: "POST",
            url: "/api/login",
            data: data,
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message);
                }
                layui.layer.msg('登录成功');
                $('.form_login')[0].reset();
                // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token', res.token)
                location.href = '../../index.html'

            }
        });

    })






})