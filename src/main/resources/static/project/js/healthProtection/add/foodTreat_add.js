(function () {
    require(['jquery','objectUtil','ajaxUtil','alertUtil','stringUtil','fileUtil','uploadImg'],
        function (jquery,objectUtil,ajaxUtil,alertUtil,stringUtil,fileUtil,uploadImg) {
            const editor = objectUtil.wangEditorUtil();
            // uploadImg.init();
            var pathUrl = "/healthProtection/foodTreat";

            var opreateUrl = "/healthProtection/hotspot";

            var type = isUpdate() ? "put" : "post" ;

            uploadImg.init();

            $("#cancel").unbind().on('click',function () {
                orange.redirect(pathUrl);
            });

            $("#btn_save").unbind().on('click',function () {
                var hotspotEntity;
                var operateMessage;
                if(!isUpdate()){
                    operateMessage = "新增药膳食疗成功";
                    hotspotEntity = {
                        itemcode: stringUtil.getUUID(),
                        hotspotTitle : $("#hotspotTitle").val(),
                        hotspotSource : $("#hotspotSource").val(),
                        hotspotAuthor : $("#hotspotAuthor").val(),
                        hotspotContent : editor.txt.html(),
                        dataStatus : "0" ,
                        dataType : "2",
                        userCode : ""
                    };
                }else{
                    var needData = JSON.parse(localStorage.getItem("rowData"));
                    hotspotEntity = {
                        itemid: needData.itemid,
                        itemcode: needData.itemcode,
                        hotspotTitle : $("#hotspotTitle").val(),
                        hotspotSource : $("#hotspotSource").val(),
                        hotspotAuthor : $("#hotspotAuthor").val(),
                        hotspotContent : editor.txt.html(),
                    }
                    operateMessage = "更新药膳食疗成功";
                }

                fileUtil.handleFile(isUpdate(), hotspotEntity.itemcode, uploadImg.getFiles()[0]);

                ajaxUtil.myAjax(null,opreateUrl,hotspotEntity,function (data) {
                    if(ajaxUtil.success(data)){
                        if(data.code == ajaxUtil.successCode) {
                            alertUtil.info(operateMessage);
                            orange.redirect(pathUrl);
                        }else{
                            alertUtil.error(data.msg);
                        }
                    }else {
                        alertUtil.alert(data.msg);
                    }
                },false,true,type);

            });

            $("#btn_insert").unbind().on('click',function () {
                var hotspotEntity;
                var operateMessage;
                if(!isUpdate()){
                    operateMessage = "新增药膳食疗成功";
                    hotspotEntity = {
                        itemcode: stringUtil.getUUID(),
                        hotspotTitle : $("#hotspotTitle").val(),
                        hotspotSource : $("#hotspotSource").val(),
                        hotspotAuthor : $("#hotspotAuthor").val(),
                        hotspotContent : editor.txt.html(),
                        dataStatus : "1" ,
                        dataType : "2",
                        userCode : ""
                    };
                }else{
                    var needData = JSON.parse(localStorage.getItem("rowData"));
                    hotspotEntity = {
                        itemid: needData.itemid,
                        itemcode: needData.itemcode,
                        hotspotTitle : $("#hotspotTitle").val(),
                        hotspotSource : $("#hotspotSource").val(),
                        hotspotAuthor : $("#hotspotAuthor").val(),
                        hotspotContent : editor.txt.html(),
                    }
                    operateMessage = "更新药膳食疗成功";
                }

                fileUtil.handleFile(isUpdate(), hotspotEntity.itemcode, uploadImg.getFiles()[0]);

                ajaxUtil.myAjax(null,opreateUrl,hotspotEntity,function (data) {
                    if(ajaxUtil.success(data)){
                        if(data.code == ajaxUtil.successCode) {
                            alertUtil.info(operateMessage);
                            orange.redirect(pathUrl);
                        }else{
                            alertUtil.error(data.msg);
                        }
                    }else {
                        alertUtil.alert(data.msg);
                    }
                },false,true,type);

            });

            (function init() {
                if (isUpdate()){
                    var tempdata = JSON.parse(localStorage.getItem("rowData"));
                    $("#hotspotTitle").val(tempdata.hotspotTitle);
                    $("#hotspotSource").val(tempdata.hotspotSource);
                    $("#hotspotAuthor").val(tempdata.hotspotAuthor);
                    editor.txt.html(tempdata.hotspotContent);
                    var img = tempdata.filePath;
                    uploadImg.setImgSrc(img);
                }
            }());


            function isUpdate() {
                return (localStorage.getItem("rowData") != null || localStorage.getItem("rowData") != undefined)
            }
        })
})();