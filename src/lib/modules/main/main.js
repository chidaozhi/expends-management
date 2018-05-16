import $ from '../../../imports/main/jquery/1.11.3/jquery-vendor.js'
import '../../../asset/modules/main/css/main.css'

$('#left-hide').click(function () {
   $('.left').hide();
   $('.right').css({
       'margin-left':0,
       width:"100%"
   });
});