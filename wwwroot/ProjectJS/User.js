$(function () {
    /*For Opening Modal*/
    $("#btnAddUser").click(function () {
        $("#UserModal").modal('show')
        $("#ddlrole").empty()
        $.get('api/TMS/ddlUserRole', function (data) {
            var object = '';
            object += '<option selected>User Role</option>';
            data.map(function (x) {
                object += '<option value=' + x.roleId + '>' + x.roleName +'</option>';
            })
            $("#ddlrole").append(object)
        })
    })
    /*For Closing Modal*/
    $("#btnCloseModal").click(function () {
        $("#UserModal").modal('hide')
    })

    /*For save user*/
    $("#btnSaveUser").click(function () {
        let val = validation()
        if (val == true) {
            let param = {
                FirstName: ("#txtFirstName").val(),
                LastName: ("#txtLastName").val(),
                Birth_Date: ("#txtDOB").val(),
                Addresh: ("#txtAddress").val(),
                Phone_Number: ("#txtPhoneNumber").val(),
                Email: ("#txtEmail").val(),
                createdby: "Bipro",
                UserRole: ("#ddlrole").val(),
                UserId: ("#hdUserId").val()
            };
            let url = "api/TMS/AddUserRole";
            $.ajax({
                url: url,
                type: 'Post',
                data: param,
                success: function (msg) {
                    alert("User saved");
                    window.location.href = 'User'
                }
            })

        }

    })
    function validation() {
        if ($("#txtFirstName").val() == "") {
            alert("Please enter first name")
            return false;
        }
        else if ($("#txtLastName").val() == "") {
            alert("Please give Last Name")
            return false;
        }
        else {
            return true;
        }
    }
/*    date cloumn*/
    $(function () {
        $("#txtDOB").datepicker();
    });
})


