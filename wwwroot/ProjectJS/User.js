$(function () {
    let tblRow=1
    displayuser()
    $("#txtDOB").datepicker({
        dateFormat: 'dd/mm/yy'
    });
    /*For Opening Modal*/
    $("#btnAddUser").click(function () {
        $("#UserModal").modal('show')
        $('#tbl_usercreation').html("User Creation")
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
            //alert($("#txtPhoneNumber").val().length)
            $.ajax({
                url: url,
                type: 'Post',
                data: param,
                success: function (msg) {
                    if (msg == '') {
                        alert("User saved");
                        window.location.href = 'User'
                    }
                    else {
                        alert(msg);
                    }
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
                alert('Email is not valid')
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
        $('#tbl_usercreate').DataTable().clear().destroy();
        $.get('api/TMS/DisplayUser', function (data) {
            //console.log(data)
            $.map(data, function (x) {
                var object = '';
                //console.log(x);
                //role.push(x.userRole);
                object += '<tr>'
                object += '<td>' + x.userId + '</td>';
                object += '<td>' + x.firstName + ' ' + x.lastName + '</td>';
                object += '<td>' + x.birth_Date + '</td>'
                object += '<td>' + x.addresh + '</td>'
                object += '<td>' + x.email + '</td>'
                object += '<td>' + x.phone_Number + '</td>'
                object += '<td>' + x.userRole + '</td>'
                //object += '<td>' + x.role_name + '</td>'
                //object += '<td><select class="form-select roleID' + x.userRole + '" aria-label="User Role" id="ddltablerole" data-id="' + x.userId + '">'
                //object +='</select></td>'
                object += '<td><a id="btnEdituser" href="#" class="btn btn-primary btn-sm" data-id="' + x.userId + '">Edit</a> || ';
                object += '<a href="#" class="btn btn-danger btn-sm" data-id="' + x.userId + '" id="btnDeluser" >Delete</a></td>';
                object += '</tr>';

                $('#tbluser').append(object);

                
            })
            $('#tbl_usercreate').DataTable({
                "columns": [
                    {"width" : "12%"},
                    {"width" : "13%"},
                    {"width" : "12.5%"},
                    { "width": "12.5%"},
                    { "width": "12.5%" },
                    { "width": "12.5%" },
                    {
                        "width": "12.5%",
                        "render": function (d, t, r) {
                            //console.log(d)
                            //console.log(t)
                            console.log(r)
                            var $select = $("<select></select>", {
                                "id": "ddltablerole",
                                "data-id": r[0],
                                "class": "form-select roleID" + d
                            });
                            $.get('api/TMS/ddlUserRole', function (data) {
                                $("#tbluser .roleID" + d).empty();
                                var txt = '';
                                txt += '<option value=0>User Role</option>';
                                data.map(function (y) {
                                    if (y.roleId == d) {
                                        txt += '<option value=' + y.roleId + ' selected>' + y.roleName + '</option>';
                                    }
                                    else {
                                        txt += '<option value=' + y.roleId + '>' + y.roleName + '</option>';
                                    }
                                })
                                $("#tbluser .roleID" + d).append(txt);
                            })
                            return $select.prop("outerHTML");
                        }
                    },
                    { "width": "12.5%" },
                    //null,
                ],
                //createdRow: function (row, data, dataIndex) {
                //    //console.log(row)
                //    //console.log(data[6])
                //    //console.log(dataIndex)
                //    $.get('api/TMS/ddlUserRole', function (data) {
                //        $("#tbluser .roleID" + data[6]).empty()
                //        /*console.log($("#tbluser .ddlRoles").attr("data-role"))*/
                //        var txt = '';
                //        txt += '<option value=0>User Role</option>';
                //        data.map(function (y) {
                //            //console.log(x.userRole)
                //            if (y.roleId == data[6]) {
                //                txt += '<option value=' + y.roleId + ' selected>' + y.roleName + '</option>';
                //            }
                //            else {
                //                txt += '<option value=' + y.roleId + '>' + y.roleName + '</option>';
                //            }
                //        })
                //        $("#tbluser .roleID" + data[6]).append(txt);
                //    })
                //}
            });
            //console.log(object)
            /*$('#tbluser').append(object);*/
            //console.log(role);
            //table dropdowns
            //$.get('api/TMS/ddlUserRole', function (data) {
            //    $("#tbluser .ddlRoles").empty()
            //    /*console.log($("#tbluser .ddlRoles").attr("data-role"))*/
            //    var object = '';
            //    object += '<option value=0>User Role</option>';
            //    data.map(function (x) {
            //        object += '<option value=' + x.roleId + '>' + x.roleName + '</option>';
            //    })
            //    $("#tbluser .ddlRoles").append(object)
            //})
        })
    }
    $("#tbluser").on('click', '#btnEdituser', function (data) {
        let userid = parseInt($(this).attr('data-id'));
        //console.log($(this).attr('data-id'));
        $('#hdUserId').val(userid)
        $('#tbl_usercreation').html("User alteration");
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
        if (confirm("Are you sure want to delete role") == true) {
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
        }
        
    })
    $("#tbluser").on('change', '#ddltablerole', function (data) {
        let userid = parseInt($(this).attr('data-id'));
        let roleID = parseInt($(this).val());
        //console.log($(this).attr('data-id'));
        //$('#hdUserId').val(userid)
        let param = {
            'userid': userid
        }
        console.log(param);
        let param1 = {}
        //console.log(param)
        $.get('api/TMS/EditUser', param, function (data) {
            //console.log(data);
            param1 = {
                FirstName: data[0].firstName,
                LastName: data[0].lastName,
                Addresh: data[0].addresh,
                Birth_Date: data[0].birth_Date,
                Phone_Number: data[0].phone_Number,
                Email: data[0].email,
                UserId: userid,
                UserRole: roleID
            };
            $.ajax({
                url: "api/TMS/AddUser",
                type: 'Post',
                data: param1,
                success: function (msg) {
                    alert("User role updated");
                    window.location.href = 'User'
                }
            })
            /*modal_default(data[0].userRole)*/
        })
        
        
    })
    $("#txtAddress").focusout(function () {
        let address = $(this).val();
        let param = {
            Phone_Number: '0',
            Email: '0',
            Addresh: address == '' ? '0' : address,
            UserId: $("#hdUserId").val() == '' ? 0 : $("#hdUserId").val()
        }
        //console.log(param);
        $.get("api/TMS/AddUserValidation", param, function (data) {
            if (data != '') {
                //alert(data);
                //$("#txtAddress").focus();
                $("#lblAddressWarning").removeClass("d-none");
                $("#lblAddressWarning").html(data);
                $("#btnSaveUser").attr("disabled", true);
            }
            else {
                $("#btnSaveUser").removeAttr("disabled");
                $("#lblAddressWarning").addClass("d-none");
                $("#lblAddressWarning").html("");
            }
        })

    })
    $("#txtPhoneNumber").focusout(function () {
        let Phone_Number = $(this).val();
        let param = {
            Addresh : '0',
            Email: '0',
            Phone_Number: Phone_Number == '' ? '0' : Phone_Number,
            UserId: $("#hdUserId").val() == '' ? 0 : $("#hdUserId").val()
        }
        $.get("api/TMS/AddUserValidation", param, function (data) {
            if (data != '') {
                //alert(data);
                //$("#txtPhoneNumber").focus();
                $("#lblPhoneWarning").removeClass("d-none");
                $("#lblPhoneWarning").html(data);
                $("#btnSaveUser").attr("disabled", true);
            }
            else {
                $("#btnSaveUser").removeAttr("disabled");
                $("#lblPhoneWarning").addClass("d-none");
                $("#lblPhoneWarning").html("");
            }
        })
    })
    $("#txtEmail").focusout(function () {
        let Email = $(this).val();
        let param = {
            Addresh: '0',
            Email: Email == '' ? '0' : Email,
            Phone_Number: '0',
            UserId: $("#hdUserId").val() == '' ? 0 : $("#hdUserId").val()
        }
        $.get("api/TMS/AddUserValidation", param, function (data) {
            if (data != '') {
                //alert(data);
                //$("#txtEmail").focus();
                $("#lblEmailWarning").removeClass("d-none");
                $("#lblEmailWarning").html(data);
                $("#btnSaveUser").attr("disabled", true);
            }
            else {
                $("#btnSaveUser").removeAttr("disabled");
                $("#lblEmailWarning").addClass("d-none");
                $("#lblEmailWarning").html("");
            }
        })
    })

    

})