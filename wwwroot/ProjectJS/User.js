$(function () {
    displayuser()
    $("#txtDOB").datepicker();
    /*For Opening Modal*/
    $("#btnAddUser").click(function () {
        $("#UserModal").modal('show')
        $("#ddlrole").empty()
        modal_default()
        
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
                object += '<td><a id="btnEdituser" href="#" class="btn btn-primary btn-sm" data-id="' + x.userId + '">Edit</a> || ';
                object += '<a href="#" class="btn btn-danger btn-sm" data-id="' + x.userId + '" id="btnDelRole" >Delete</a></td>';
                object += '</tr>'
            })
            $('#tbluser').append(object);
        })
    }
    $("#tbluser").on('click', '#btnEdituser', function (data) {
        let userid = parseInt($(this).attr('data-id'));
        //console.log($(this).attr('data-id'));
        $('#hdUserId').val(userid)
        let param = {
            'userid' : userid
        }
        //console.log(param)
        $.get('api/TMS/EditUser', param, function (data) {
            //console.log(data);
            modal_default()
            $('#ddlrole option[value="' + data[0].userRole + '"]').attr('selected', 'selected');
            $("#txtFirstName").val(data[0].firstName)
            $("#txtLastName").val(data[0].lastName)
            $("#txtDOB").val(data[0].birth_Date)
            $("#txtAddress").val(data[0].addresh)
            $("#txtPhoneNumber").val(data[0].email)
            $("#txtEmail").val(data[0].phone_Number)
            $("#ddlrole").val(data[0].role_name)
        })
        $("#UserModal").modal('show')
    })
    function modal_default() {
        $.get('api/TMS/ddlUserRole', function (data) {
            var object = '';
            object += '<option selected>User Role</option>';
            data.map(function (x) {
                object += '<option value=' + x.roleId + '>' + x.roleName + '</option>';
            })
            $("#ddlrole").append(object)
        })
    }

})



