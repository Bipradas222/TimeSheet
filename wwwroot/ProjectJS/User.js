$(function () {
    displayuser()
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
                FirstName: $("#txtFirstName").val(),
                LastName: $("#txtLastName").val(),
                Birth_Date: $("#txtDOB").val(),
                Addresh: $("#txtAddress").val(),
                Phone_Number: $("#txtPhoneNumber").val(),
                Email: $("#txtEmail").val(),
                createdby: "Bipro",
                UserRole: $("#ddlrole").val(),
                UserId: $("#hdUserId").val()
            };
            let url = "api/TMS/AddUser";
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
    function displayuser() {
        $("#tbluser").empty();
        $.get('api/TMS/DisplayUser', function (data) {
            console.log(data)
            var object = '';
            $.map(data, function (x) {
                object += '<tr>'
                object += '<td>' + x.userId + '</td>';
                object += '<td>' + x.firstName + ' ' + x.lastName + '</td>';
                object += '<td>' + x.birth_Date + '</td>'
                object += '<td>' + x.addresh + '</td>'
                object += '<td>' + x.email + '</td>'
                object += '<td>' + x.phone_Number + '</td>'
                object += '<td>' + x.role_name + '</td>'
                object += '<td><a id="btnEditRole" href="#" class="btn btn-primary btn-sm" data-id="' + x.roleId + '">Edit</a> || ';
                object += '<a href="#" class="btn btn-danger btn-sm" data-id="' + x.roleId + '" id="btnDelRole" >Delete</a></td>';
                object += '</tr>'
            })
            $('#tbluser').append(object);
        })
    }

})



