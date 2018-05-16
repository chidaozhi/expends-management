import $ from '../../../imports/main/jquery/1.11.3/jquery-vendor.js'
import bootstrap from '../../../imports/main/bootstrap/3.3.7/bootstrap-vendor.js'
import bootstrapTable from '../../../imports/plugin/bootstrap-table-vendor/1.12.1/bootstrap-table-vendor.js'
import validation from '../../../imports/plugin/jquery-validation/1.17.0/jquery.validate.min.js'
import layer from '../../../imports/plugin/layer/3.1.1/layer-vendor.js'
import select2 from '../../../imports/plugin/select2/4.0.5/select2-vendor.js'
import '../../common/validationSet.js'
import '../../../asset/common/css/reset.css'

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
            title:'消费额',
            align:'center'
        },{
            field:'createTime',
            title:'创建时间',
            align:'center',
            formatter:function (value) {
                return dateInitFormat(value);
            }
        }]
    });
};


// 初始化表格
tableInit();