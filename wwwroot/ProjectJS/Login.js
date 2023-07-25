$(function () {
    $("#btnLogin").click(function () {
        let param = {
            'Email': $("#txtEmail").val(),
            'Password': $("#txtPassword").val()
        }
        let url = "api/TMS/login";
        $.get(url, param, function (data) {
            if (data.includes("Invaild Credential") == true) {
                alert(data)
                location.href = "Login"
            }
            else {
                location.href = "Dashboard"
            }
        })
    })
})