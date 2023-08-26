$(function () { 
    StatusDisplay()
    $("#btnAddStatus").click(function () { 
        $("#Status").modal('show');
        //console.log("Test");
    })
    $("#btnCloseModal").click(function () {
        $("#Status").modal('hide');
    })
    $("#btnSaveStatus").click(function () {
        let Status_ID = $("#Status_ID").val();
        let Status_Name = $("#Status_Name").val();
        let Status_Type = $("#Status_Type").val();
        let Created_By = $("#Created_By").val();
        let param = {
            Status_ID: Status_ID,
            Status_Name: Status_Name,
            Status_Type: Status_Type,
            Created_By: Created_By
        };
        let url = "api/TMS/Status";
        $.ajax({
            url:url,
            type: "post",
            data: param,
            success: function (msg) {
                alert("Status sucessfully created");
                window.location.href = 'Status';
            }
        })
    })
    function StatusDisplay()
    { 
        let url1 = "api/TMS/StatusDisplay";
        $.get(url1, function (data) {
            var obj = "";
            $.map(data, function (x) {
                console.log(x);
                obj += '<tr>';
                obj += '<td>' + x.status_Name + '</td>';
                obj += '<td>' + x.status_Type + '</td>';
                obj += '<td>' + x.created_By + '</td>';
                /*obj += '<td>' + x.created_Date + '</td>';*/
                obj += '<td><a id ="btnEditStatus" href="#" class="btn btn-primary btn-sm" Status_ID="' + x.status_ID + '">Edit</a>||';
                obj += '<a id ="btnDelStatus" href="#" class="btn btn-danger btn-sm" Status_ID="'+x.status_ID+'">Delete</a></td>';
                obj += '</tr>';
            })
            $("#tblStatus").append(obj);
        })
    }
    $("#tblStatus").on("click", "#btnEditStatus", function () { 
        let Status_ID = parseInt($(this).attr("Status_ID"));
        $("#Status_ID").val(Status_ID);
        //console.log(Status_ID);
        let param = { 'statusid': Status_ID };
        let url2 = "api/TMS/StatusEdit";
        $.get(url2, param, function (data) {
            //console.log(data);
            $("#Status_Name").val(data[0].status_Name);
            $("#Status_Type").val(data[0].status_Type);
            $("#Created_By").val(data[0].created_By);
        })
        $("#Status").modal('show');
    })
    $("#tblStatus").on("click", "#btnDelStatus", function () {
        let Status_ID = parseInt($(this).attr("Status_ID"));
        $("#Status_ID").val(Status_ID);
        let param = { 'statusid': Status_ID };
        let url3 = "api/TMS/StatusDelete";
        $.ajax({
            url: url3,
            type:"post",
            Data: param,
            success: function (msg) { 
                alert("Status Successfully Deleted");
                window.location.href = 'Status';
            }

        })

    })
})