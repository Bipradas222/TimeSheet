$(function () {
    ProjectDisplay()
    $("#Start_Date").datepicker();
    $("#End_Date").datepicker();
    $("#btnAddProject").click(function () {
        $("#Project").modal("show");
        $("#ddlStatus").empty();
        let url4 = "api/TMS/ddlStatus";
        $.get(url4, function (data) {
            var obj = "";
            obj += "<option selected>Select Status</option>";
            $.map(data, function (x) {
                obj += "<option value = "+ x.status_ID+">" +x.status_Name+"</option>";
            })
            $("#ddlStatus").append(obj);
        })
        
    })
    $("#btnCloseModal").click(function () {
        $("#Project").modal("hide");
    })
    $("#btnSaveProject").click(function () {
        let Project_ID = $("#Project_ID").val();
        let Project_Name = $("#Project_Name").val();
        let Owner = $("#Owner").val();
        let Status = $("#Status").val();
        let Start_Date = $("#Start_Date").val();
        let End_Date = $("#End_Date").val();
        let param = {
            Project_ID: Project_ID,
            Project_Name: Project_Name,
            Owner: Owner,
            Status: Status,
            Start_Date: Start_Date,
            End_Date: End_Date,
            Created_By: "banibratag@gmail.com"
            //Modified_By: "banibratag@gmail.com"
            //"sessionUName": username,
            //"raisedBy": $("#lblRaisedBy").text(),
            //"appName": $("#lblApplication").text()
        };
        let url = "api/TMS/Project";
        $.ajax({
            url: url,
            type: "POST",
            data: param,
            success: function (msg) {
                alert("Project Created Successfully");
                window.location.href = 'Project';
            }
        })
    })
    function ProjectDisplay()
    {
        let url1 = "api/TMS/ProjectDisplay";
        $.get(url1, function (data) {
           
            var obj = "";
            $.map(data, function (x) {
                //console.log(x);
                obj += '<tr>'
                //obj += '<td>' + x.project_ID + '</td>';
                obj += '<td>' + x.project_Name + '</td>';
                obj += '<td>' +x.owner + '</td>';
                obj += '<td>' + x.status + '</td>';
                obj += '<td>' +x.start_Date + '</td>';
                obj += '<td>' + x.end_Date + '</td>';
                obj += '<td><a id="btnEditProject" href="#" class="btn btn-primary btn-sm" Project_ID="' + x.project_ID + '">Edit</a> || ';
                obj += '<a id="btnDelProject" href="#" class="btn btn-danger btn-sm" Project_ID="' + x.project_ID + '">Delete</a></td>';
                obj += '</tr>'
            });
            $("#tblProject").append(obj);
        })
    }
    $("#tblProject").on("click", "#btnEditProject", function () { 
        let Project_ID = parseInt($(this).attr("Project_ID"));
        $("#Project_ID").val(Project_ID);
        //console.log(Project_ID);
        let param = {
            "projectid": Project_ID
        };
        let url2 = "api/TMS/ProjectEdit";
        $.get(url2, param, function (data) {
            console.log(data);
            $("#Project_Name").val(data[0].project_Name);
            $("#Owner").val(data[0].owner);
            $("#Status").val(data[0].status);
            $("#Start_Date").val(data[0].start_Date);
            $("#End_Date").val(data[0].end_Date);
        })
        $("#Project").modal("show");
    })
    $("#tblProject").on("click", "#btnDelProject", function () {
        let Project_ID = parseInt($(this).attr("Project_ID"));
        let param = {
            "projectid": Project_ID
        }
        console.log(param);
        let url3 = "api/TMS/ProjectDelete";
        $.ajax({
            url: url3,
            type: "Post",
            data: param,
            success: function (msg) { 
                alert("Project Deleted Successfully");
                window.location.href = 'Project';
            }
        })       
    })
})
