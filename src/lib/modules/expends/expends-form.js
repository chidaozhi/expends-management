import $ from "../../../imports/main/jquery/1.11.3/jquery-vendor.js"
import laydate from '../../../imports/plugin/layDate/5.0.9/laydate/laydate-vendor.js'
import icheck from '../../../imports/plugin/icheck/1.0.2/js/icheck-vendor.js'
import layer from '../../../imports/plugin/layer/3.1.1/layer-vendor.js'
import select2 from '../../../imports/plugin/select2/4.0.5/select2-vendor.js'
import '../../../asset/modules/expends/less/expend-form.css'

// $('.expends-box input[type="checkbox"]').iCheck({
//     checkboxClass: 'icheckbox_minimal-blue',
//     radioClass: 'iradio_minimal-blue',
//     increaseArea: '20%'
// });
$('.expends-type-name').select2({
    width: '65%',
    height:'34px',
    placeholder: "开销类型",
    allowClear: true
});
// let startDate = laydate.render({
//     elem: '#expends-start-time',
//     type: 'datetime'
// });
// let endDate = laydate.render({
//     elem: '#expends-end-time',
//     type: 'datetime'
// });
$('#expend-reset').click(function () {
    $('#expends-name').val('');
    $('.list input[type=checkbox]:checked').val('');
    $('#expends-user-name').val(null).trigger('change');
    $('#expends-start-time').val('');
});

// export default submitFormJson