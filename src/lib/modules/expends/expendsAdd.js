import $ from '../../../imports/main/jquery/1.11.3/jquery-vendor.js'
import bootstrap from '../../../imports/main/bootstrap/3.3.7/bootstrap-vendor.js'
import validation from '../../../imports/plugin/jquery-validation/1.17.0/jquery.validate.min.js'
import layer from '../../../imports/plugin/layer/3.1.1/layer-vendor.js'
import select2 from '../../../imports/plugin/select2/4.0.5/select2-vendor.js'
import '../../common/validationSet.js'
import '../../../asset/common/css/reset.css'
import '../../../asset/modules/expends/less/expendsAdd.css'


$('.expends-type-name').select2({
    width: '65%',
    height:'34px',
    placeholder: "开销类型",
    allowClear: true
});

$('#table-add-form').validate({
    rules: {
        expendsName: {
            required: true,
            maxlength: 16
        },
        expendsTypeName: {
            required: true
        },
        expendsUserName: {
            required: true,
            maxlength: 16
        },
        expendsTotal: {
            required: true,
            number: true,
            min: 0
        },
        'expendsDescription': {
            textArea: true
        }
    }
});


 /*
    按钮操作
  */
$('#addSubmit').click(function () {
    layer.alert('确认添加？',{
        closeBtn: 1    // 是否显示关闭按钮
        , anim: 1 //动画类型`
        , btn: ['确认', '返回'] //按钮
        , icon: 3    // icon
        ,yes:function (index) {
            let addSuccess = $('#table-add-form').valid();
            if(addSuccess === true){
                let addParams = {
                    expendsName:$('#expends-name').val(),
                    expendsTypeName:$('#expends-type-name').val(),
                    expendsUserName:$('#expends-user-name').val(),
                    expendsDescription:$('#expends-description').val(),
                    expendsTotal:$('#expends-total').val()
                };
                let jsonAddParams = JSON.stringify(addParams);
                $.ajax({
                    url:"/mg-web/emExpends/log/add",
                    type: 'post',
                    // useDefaultXhrHeader:false,
                    data: jsonAddParams,
                    contentType: "application/json",  //缺失会出现URL编码，无法转成json对象
                    success: function () {
                        layer.msg("添加成功", {icon: 1});
                        parent.$('#table').bootstrapTable('refreshOptions',{pageNumber:1,pageSize:10});
                        return true;
                    },
                    error: function (req) {
                        layer.msg('添加失败', {icon: 0});
                        return true;
                    }
                });
            }else {
                layer.msg('添加失败！请检验添加项！', {icon: 0});
                return false;
            }
        }
        , btn2: function (index) {
            layer.close();
        }
    });
});
$('#cancelAdd').click(function () {
    let index = parent.layer.getFrameIndex(window.name);
    parent.layer.close(index);
});


