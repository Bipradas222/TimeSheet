$(function () {
    $("#btnChangePass").click(function () {
        $("#UserChangePass").modal('show')
    })
    $("#btnCloseModal1").click(function () {
        $("#UserChangePass").modal('hide')
    })
    $("#btnSavePass").click(function () {
        let val = validation()
        if (val == true) {
            let param = {
                Email: $("#txtChangeEmail").val(),
                Password: $("#txtPassword").val(),
            }
            let url = "api/TMS/UserPwChange";
            $.ajax({
                url: url,
                type: 'Post',
                data: param,
                success: function (msg) {
                    alert("User saved");
                    window.location.href = 'Login';
                }
            });
        }
    })
    function validation() {
        if ($("#txtPassword").val() == "" || $("#txtconfirmPassword").val() == "") {
            alert("Please enter Password")
            return false;
        }
        else {
            if ($("#txtPassword").val() != $("#txtconfirmPassword").val()) {
                alert("Password not matched")
                return false;
            }
            else {
                return true;
            }
        }
    }
    $("#btnsignout").click(function () {
        $.get("api/TMS/logout", function (data) {
            window.location.href = 'Login'
        })
    })
})