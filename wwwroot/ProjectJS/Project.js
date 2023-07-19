$(function () {
    $("#Start_Date").datepicker();
    $("#End_Date").datepicker();
    $("#btnAddProject").click(function () {
        $("#Project").modal('show');
    })
    $("#btnCloseModal").click(function () {
        $("#Project").modal('hide');
        /* $("#txtRoleName").val('');*/
    })
    $("btnSaveProject").click(function () {
        let Project_Name = $("#Project_Name").val();
        let Owner = $("#Owner").val();
        let Status = $("#Status").val();
        let Start_Date = $("#Start_Date").val();
        let End_Date = $("#End_Date").val();
        let url = "api/TMS/Project"
        let param = {
            Project_Name: Project_Name,
            Owner: Owner,
            Status: Status,
            Start_Date: Start_Date,
            End_Date: End_Date
            //"sessionUName": username,
            //"raisedBy": $("#lblRaisedBy").text(),
            //"appName": $("#lblApplication").text()
        };
        $.ajax({
            url: url,
            type: "POST",
            data: param,
            success: function (msg) {
                alert("Project Created Successfully");
            }
        })
    })
})
