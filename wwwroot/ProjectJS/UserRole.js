$(function () {
     //test
    DisplayRole()
    /*For Openning Modal*/
    $("#btnAddRole").click(function () {
        $("#Role_Creation").html("Role Creation");
        $("#UserRoleModal").modal('show')
    })
    /*For closing Modal*/
    $("#btnCloseModal").click(function () {
        $("#UserRoleModal").modal('hide')
        $("#txtRoleName").val('')
        $("#txtRoleDescription").val('')
        $("#hdRoleId").val('')
    })
    /*To save user Role*/
    $("#btnSaveRole").click(function () {
        let val = validation()
        if (val == true) {
            let param = {
                RoleId: $("#hdRoleId").val(),
                RoleName: $("#txtRoleName").val(),
                Description: $("#txtRoleDescription").val(),
                createdby: "bipradas.guin@gmail.com"
            };
            let url = "api/TMS/AddUserRole";
            $.ajax({
                url: url,
                type: 'Post',
                data: param,
                success: function (msg) {
                    if (msg == '') {
                        alert("Role saved");
                        window.location.href = 'UserRole'
                    }
                    else {
                        alert(msg)
                    }
                    
                }
            })
        }
    })
    function validation() {
        if ($("#txtRoleName").val() == "") {
            alert("Please enter role name")
            $("#txtRoleName").focus()
            return false;
        }
        else if ($("#txtRoleDescription").val() == "") {
            alert("Please give role description")
            return false;
        }
        else {
            return true;
        }
    }
    function DisplayRole() {
        $('#tbluserRole').empty();
        $('#tbl_role').DataTable().clear().destroy();
        $.get('api/TMS/DisplayUserRole', function (data) {
            console.log(data)
            var object = '';
            //object += '<option selected>User Role</option>';
            //object += '<option value=' + x.roleId + '>' + x.roleName +'</option>';
            $.map(data, function (x) {
                object += '<tr>'
                object += '<td>' + x.roleId + '</td>';
                object += '<td>' + x.roleName + '</td>';
                object += '<td>' + x.description + '</td>';
                object += '<td><a id="btnEditRole" href="#" class="btn btn-primary btn-sm" data-id="' + x.roleId + '">Edit</a> || ';
                object += '<a href="#" class="btn btn-danger btn-sm" data-id="' + x.roleId + '" id="btnDelRole" >Delete</a></td>';
                object += '</tr>'
            });
            $('#tbluserRole').append(object);
            $('#tbl_role').DataTable();
        })
    }
    $("#tbluserRole").on('click', '#btnEditRole', function () {
        let roleid =parseInt($(this).attr('data-id'));
        $("#hdRoleId").val(roleid)
        //$("#Role_Creation").html("");
        $("#Role_Creation").html("Role Alteration");
        let param = {
            'roleid': roleid
        }
        $.get('api/TMS/EditUserRole', param, function (data) {
            $("#txtRoleName").val(data[0].roleName)
            $("#txtRoleDescription").val(data[0].description)
        })
        $("#UserRoleModal").modal('show')
    })
    $("#tbluserRole").on('click', '#btnDelRole', function () {
        if (confirm("Are you sure want to delete role") == true) {
            let roleid = parseInt($(this).attr('data-id'));
            //alert(roleid);
            let url = "api/TMS/DelUserRole";
            let param = {
                'roleid': roleid
            }
            $.ajax({
                url: url,
                type: 'Post',
                data: param,
                success: function (msg) {
                    //console.log(msg)
                    if (msg == '' || msg == null) {
                        alert("Role Deleted");
                        window.location.href = 'UserRole'
                    }
                    else {
                        alert(msg);
                        window.location.href = 'UserRole'
                    }
                }
            })
        }
        
    })
})
