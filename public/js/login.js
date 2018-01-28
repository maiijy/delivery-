function check_null(point) {
    $(point).parent().parent().find("span").hide();
    if ($(point).val() == "") {
        $(point).parent().parent().prepend("<span class='errorInput' style='color: red;'>&nbsp;&nbsp;*不能为空</span>");
        $(point).focus();
        return false;
    }else{
        return true;
    }
}
function check_password(point) {
    $(point).parent().parent().find("span").hide();
    let pwd = $(point).val();
    if (pwd.indexOf(" ") >= 0)
    // alert("输入有空格！");
        $(point).parent().parent().append("<span class='errorInput' style='color: red;'>&nbsp;&nbsp;*Password cannot be the input Spaces！</span>");
    // window.U.prompt("modal-mention","错误提示","密码不能输入空格！");
    if ($(point).val() == "") {
        $(point).parent().parent().append("<span class='errorInput' style='color: red;'>&nbsp;&nbsp;*Password cannot be empty！</span>");
        $(point).focus();
        return false;
    }
    if (pwd.length < 6) {
        $(point).parent().parent().append("<span class='errorInput' style='color: red;'>&nbsp;&nbsp;*The password may not be less than 6 digits！</span>");
        $(point).focus();
        return false;
    }
    return true;
}
function loginIn(){
    //注册时检测用户名和密码
    let name = false;
    let pwd = false;
    name = check_null($('input[name="username"]'));
    let x,y;
    x = check_null($('input[name="password"]'));
    y = check_password($('input[name="password"]'));
    if(x == true && y == true){
        pwd = true;
    }
    else {
        pwd = false;
    }
   /* $('input[name="username"]').change(function () {
        name = check.check_null(this);
        // checkForms(this);
    });
    $('input[name="password"]').change(function () {
        let x,y;
        x = check.check_null(this);
        y = check.check_password(this);
        if(x == true && y == true){
            pwd = true;
        }else {
            pwd = false;
        }
    });*/
    debugger;
    let data = JSON.stringify({
        'username': $('input[name="username"]').val(),
        'pwd': $('input[name="password"]').val()
    });
    if(name == true && pwd == true){
        window.U.ajax('/login',data,'POST',function (obj) {
            console.log(obj);
            if(obj.result == 0){
                debugger;
                if(obj.indentity == 1){
                    localStorage.setItem("uname",obj.username);
                    window.location='../views/express.html';

                }else if(obj.indentity == 0){
                    localStorage.setItem("uname",obj.username);
                    window.location='../views/shoujian.html';

                }
            }else{
                alert(obj);
            }
        });
    }else{
        alert("检查用户名和密码是否为空");
    }
}


