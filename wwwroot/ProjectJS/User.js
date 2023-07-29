$(function () {
    let tblRow=1
    displayuser()
    $("#txtDOB").datepicker({
        dateFormat: 'dd/mm/yy'
    });
    /*For Opening Modal*/
    $("#btnAddUser").click(function () {
        $("#UserModal").modal('show')
        $("#ddlrole").empty()
        modal_default(0)
        
    })
    /*For Closing Modal*/
    $("#btnCloseModal").click(function () {
        $("#UserModal").modal('hide')
        $("#txtFirstName").val('')
        $("#txtLastName").val('')
        $("#txtDOB").val('')
        $("#txtAddress").val('')
        $("#txtPhoneNumber").val('')
        $("#txtEmail").val('')
        $("#hdUserId").val('')
    })

    /*For save user*/
    $("#btnSaveUser").click(function () {
        let val = validation()
        //alert(val)
        if (val == true) {
            let param = {
                FirstName: $("#txtFirstName").val(),
                LastName: $("#txtLastName").val(),
                Birth_Date: $("#txtDOB").val(),
                Addresh: $("#txtAddress").val(),
                Phone_Number: $("#txtPhoneNumber").val(),
                Email: $("#txtEmail").val(),
                createdby: $("#hduserEmail").val(),//"Bipro",
                UserRole: $("#ddlrole").val(),
                UserId: $("#hdUserId").val()
            };
            console.log(param)
            let url = "api/TMS/AddUser";
            alert($("#txtPhoneNumber").val().length)
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
        const txtPhoneNumber = document.getElementById('txtPhoneNumber').value;
        const phonenumber = /^\d{10}$/;
        const txtemail = document.getElementById('txtEmail').value;
        const Email = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/
        var today = new Date();
        var past = $("#txtDOB").val();
        var arr = past.split("/");
        var age = today.getFullYear() - parseInt(arr[2]);
        var CurrentMonth = today.getMonth();
        var month = parseInt(arr[1]);
        if (CurrentMonth < month || (CurrentMonth === month && today.getDate() < parseInt(arr[0]))) {
            age--;
        }


        var validation = false;
        //alert(today.getDate());
        //alert(age);
        if ($("#txtFirstName").val() == "") {
            alert("Please enter first name")
            validation = false;
        }
        else if ($("#txtLastName").val() == "") {
            alert("Please give Last Name")
            validation = false;
        }
        else if ($("#txtDOB").val() == "") {
            alert("Please give Date of birth")
            validation = false;
        }
        else if ($("#txtAddress").val() == "") {
            alert("Please give Address")
            validation = false;
        }
        else if ($("#txtPhoneNumber").val() == "") {
            alert("Please give Phone number")
            validation = false;
        }
        
        else if ($("#txtEmail").val() == "") {
            alert("Please give Email")
            validation = false;
        }
        else if ($("#ddlrole").val() == "0") {
            alert("Insert Role")
            validation = false;
        }
        else {
            if ($("#txtEmail").val().indexOf("@") == -1 || $("#txtEmail").val().indexOf(".") == -1) {
                //console.log(str2 + " found"); 
                alert('Email is not valid')
                validation = false;
            }
            else if (Email.test(txtemail) == false) {
                alert('Email is not valid1')
                validation = false
            }
            else if (phonenumber.test(txtPhoneNumber) == false) {
                alert('Invalid Phone Number')
                validation = false;
            }
            else if ($("#txtFirstName").val().includes(" ")) {
                alert("Space Not Allowed")
                $("#txtFirstName").focus()
                validation = false;
            }
            else if (age <= 18) {
                alert('Age is lower than 18')
                validation = false
            }
            else {
                //alert('Invalid Phone Number')
                validation = true;
            }
            //validation= true;
            //if (($("#txtPhoneNumber").val().length()) == 10) {
            //    alert($("#txtPhoneNumber").val().length())
            //    validation = true;
            //}
            //else {
            //    alert('Please give valid Phone Number')
            //    validation = false;
            //}
            //return true;
        }
        return validation;
    }
    
    function displayuser() {
        let role = [];
        $("#tbluser").empty();
        $.get('api/TMS/DisplayUser', function (data) {
            //console.log(data)
            var object = '';
            $.map(data, function (x) {
                //console.log(x);
                //role.push(x.userRole);
                object += '<tr>'
                object += '<td>' + x.userId + '</td>';
                object += '<td>' + x.firstName + ' ' + x.lastName + '</td>';
                object += '<td>' + x.birth_Date + '</td>'
                object += '<td>' + x.addresh + '</td>'
                object += '<td>' + x.email + '</td>'
                object += '<td>' + x.phone_Number + '</td>'
                //object += '<td>' + x.role_name + '</td>'
                object += '<td><select class="form-select ddlRoles roleID' + x.userRole +'" aria-label="User Role" id="ddltablerole">'
                object +='</select></td>'
                object += '<td><a id="btnEdituser" href="#" class="btn btn-primary btn-sm" data-id="' + x.userId + '">Edit</a> || ';
                object += '<a href="#" class="btn btn-danger btn-sm" data-id="' + x.userId + '" id="btnDeluser" >Delete</a></td>';
                object += '</tr>'
            })
            //console.log(object)
            $('#tbluser').append(object);
            //console.log(role);
            //table dropdowns
            $.get('api/TMS/ddlUserRole', function (data) {
                $("#tbluser .ddlRoles").empty()
                /*console.log($("#tbluser .ddlRoles").attr("data-role"))*/
                var object = '';
                object += '<option value=0>User Role</option>';
                data.map(function (x) {
                    object += '<option value=' + x.roleId + '>' + x.roleName + '</option>';
                })
                $("#tbluser .ddlRoles").append(object)
            })
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
            console.log(data);
            modal_default(data[0].userRole)
            $('#ddlrole option[value="' + data[0].userRole + '"]').prop('selected', true);
            $("#txtFirstName").val(data[0].firstName)
            $("#txtLastName").val(data[0].lastName)
            $("#txtDOB").val(data[0].birth_Date)
            $("#txtAddress").val(data[0].addresh)
            $("#txtPhoneNumber").val(data[0].phone_Number)
            $("#txtEmail").val(data[0].email)
            $("#ddlrole").val(data[0].role_name)
        })
        $("#UserModal").modal('show')
    })
    function modal_default(id) {
        $("#ddlrole").empty()

        
        $.get('api/TMS/ddlUserRole', function (data) {
            var object = '';
            object += '<option value=0>User Role</option>';
            data.map(function (x) {
                if (id == 0) {
                    object += '<option value=' + x.roleId + '>' + x.roleName + '</option>';
                }
                else {
                    if (x.roleId == id) {
                        object += '<option value=' + x.roleId + ' selected>' + x.roleName + '</option>';
                    }
                    else {
                        object += '<option value=' + x.roleId + '>' + x.roleName + '</option>';
                    }
                }
            })
            $("#ddlrole").append(object)
        })
    }
    $("#tbluser").on('click', '#btnDeluser', function () {
        let userid = parseInt($(this).attr('data-id'));
        //alert(userid);
        let url = "api/TMS/DelUser";
        let param = {
            'UserId': userid
        }
        $.ajax({
            url: url,
            type: 'Post',
            data: param,
            success: function (msg) {
                alert("User delete");
                window.location.href = 'User'
            }
        })
    })

    

})



