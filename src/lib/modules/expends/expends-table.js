import $ from '../../../imports/main/jquery/1.11.3/jquery-vendor.js'
import layer from '../../../imports/plugin/layer/3.1.1/layer-vendor.js'
import bootstrap from '../../../imports/main/bootstrap/3.3.7/bootstrap-vendor.js'
import bootstrapTable from '../../../imports/plugin/bootstrap-table-vendor/1.12.1/bootstrap-table-vendor.js'

// 初始化时间格式
let dateInitFormat = function (val) {
    let dateVal = val + "";
    if (val !== null) {
        let date = new Date(parseInt(dateVal.replace("/Date(", "").replace(")/", ""), 10));
        let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        let currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();

        let hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        let minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        let seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

        return date.getFullYear() + "-" + month + "-" + currentDate + " " + hours + ":" + minutes + ":" + seconds;
    }
};


let tableInit = function (params) {
    $('#table').bootstrapTable({
        url:"/mg-web/emExpends/log/list",
        queryParamsType:"limit",
        queryParams:function(params){
            let paramsObject = {
                limit: params.limit,
                offset: params.offset,
                expendsName:$('#expends-name').val(),
                expendsTypeName:$('.expends-type-name').val(),
                expendsUserName:$('#expends-user-name').val()
                // createTime:startTime
            };
            return paramsObject;
        },
        method:"post",
        pagination:true,
        striped:true,
        toolbar:".btns",
        showRefresh:true,
        showColumns:true,
        showToggle:true,
        clickToSelect: true,//是否启用点击选中行
        sidePagination:"server",
        onClickCell:function (field, value, row, $element) {
            if(field === "operate"){
                layer.open({
                    type: 2,//iframe层
                    title: '明细',
                    maxmin: true,
                    shadeClose: true,
                    shade: 0.3,
                    area: ['100%', '100%'],
                    content: '../expends/expendsDetails.html',//iframe的url
                    success:function (layero, index) {
                        let detailExpendsName = row.expendsName;
                        let detailExpendsTypeName = row.expendsTypeName;
                        let detailExpendsUserName = row.expendsUserName;
                        let detailExpendsTotal = row.expendsTotal;
                        let detailExpendsDescription = row.expendsDescription;

                        let iframeWin = window[layero.find('iframe')[0]['name']];
                        iframeWin.$('#expends-name').val(detailExpendsName);
                        iframeWin.$('#expends-type-name').val(detailExpendsTypeName);
                        iframeWin.$('#expends-user-name').val(detailExpendsUserName);
                        iframeWin.$('#expends-total').val(detailExpendsTotal);
                        iframeWin.$('#expends-description').val(detailExpendsDescription);
                    }
                });
                return row;
            }else {
                return false;
            }

        },
        columns:[{
            field:'Number',
            title:'序号',
            align:'center',
            width:'15px',
            formatter:function (value, row, index) {
                let pageSize = $('#table').bootstrapTable('getOptions').pageSize;//通过表的#id 可以得到每页多少条
                let pageNumber = $('#table').bootstrapTable('getOptions').pageNumber;//通过表的#id 可以得到当前第几页
                return pageSize * (pageNumber - 1) + index + 1;//返回每条的序号： 每页条数 * （当前页 - 1 ）+ 序号
            }
        },{
            checkbox:true,
            align:'center'
        },{
            field:'expendsName',
            title:'消费项',
            align:'center'
        },{
            field:'expendsTypeName',
            title:'消费类型',
            align:'center'
        },{
            field:'expendsUserName',
            title:'消费人',
            align:'center'
        },{
            field:'expendsTotal',
            title:'消费总额',
            align:'center'
        },{
            field:'createTime',
            title:'创建时间',
            align:'center',
            formatter:function (value) {
                return dateInitFormat(value);
            }
        },{
            field:'operate',
            title:'操作',
            align:'center',
            width:'20px',
            formatter:function (value, row, index) {
                // console.log(row.id);
                // console.log(index);
                // let details = '<a id=detail' + row.id + ' href="#">明细</a>';
                let details = '<a id="detail" href="javascript:void(0)">明细</a>';

                return details;
            }
        }]
    });
};

let btnInit = function () {
    $('#expend-query').click(function () {
        // startTime = new Date($('#expends-start-time').val()).getTime();
        $('#table').bootstrapTable('refreshOptions',{pageNumber:1,pageSize:10});
        // $('#table').bootstrapTable('refresh',params);
    });
    $('#expend-reset').click(function () {
        $('#table').bootstrapTable('refreshOptions',{pageNumber:1,pageSize:10});
    });

    $('#expend-add').click(function () {
        layer.open({
            type: 2,//iframe层
            title: '添加',
            maxmin: true,
            shadeClose: true,
            shade: 0.3,
            area: ['30%', '70%'],
            content: './expendsAdd.html' //iframe的url
        });
    });
    $('#expend-modify').click(function () {
        let selections = $('#table').bootstrapTable('getSelections');
        if(selections.length === 1){
            layer.open({
                type: 2,//iframe层
                title: '修改',
                maxmin: true,
                shadeClose: true,
                shade: 0.3,
                area: ['30%', '70%'],
                content: './expendsUpdate.html' //iframe的url
            });
            return selections;
        }else {
            layer.msg('请选择一条数据进行修改',{icon: 0})
        }

    });
    $('#expend-delete').click(function () {
        let selections = $('#table').bootstrapTable('getSelections');
        if (selections.length === 0){
            layer.msg('请选择一条数据进行修改',{icon: 0});
        }else{
            layer.alert('确认删除？',{
                closeBtn: 1    // 是否显示关闭按钮
                , anim: 1 //动画类型`
                , btn: ['确认', '返回'] //按钮
                , icon: 3    // icon
                ,yes:function (index) {
                    let ids = [];
                    for(let i=0; i<selections.length; i++){
                        ids.push(selections[i].id);
                    }
                    let deleteParams = {
                        "ids":ids
                    };
                    let jsonDeleteParams = JSON.stringify(deleteParams);
                    console.log(jsonDeleteParams);
                    $.ajax({
                        url:"/mg-web/emExpends/log/batchDelete",
                        type: 'post',
                        // useDefaultXhrHeader:false,
                        data: jsonDeleteParams,
                        contentType: "application/json",  //缺失会出现URL编码，无法转成json对象
                        success: function () {
                            layer.msg("删除成功", {icon: 1});
                            $('#table').bootstrapTable('refreshOptions',{pageNumber:1,pageSize:10});
                            return true;
                        },
                        error: function (req) {
                            layer.msg('删除失败', {icon: 0});
                            return true;
                        }
                    });
                }
                , btn2: function (index) {
                    layer.close();
                }
            });
        }

    });
};

// 初始化表格&按钮操作
tableInit();
btnInit();


