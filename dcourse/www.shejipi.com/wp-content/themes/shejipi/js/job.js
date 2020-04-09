jQuery(function ($) {
	
$(".thumb .lazy").lazyload({
			effect : "fadeIn"
});	
	
function getPara(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}



$('.search-tab a').click(function(){
	
	$('.search_post_type').val($(this).attr('data'));
	$('.search-tab a').removeClass('active');
	$(this).addClass('active');
})

if('company' == getPara('post_type')) 
	$('.search-tab a:last').click();

$('.tabcontent').eq(0).fadeIn(0);
$('.jobtab').find('li').click(function(){
	var index = $(this).index();
	$('.tabcontent').not(':eq(' + index + ')').hide(0);						
	$('.jobtab li').removeClass('on');	
	$(this).addClass('on');
	$('.tabcontent').eq(index).fadeIn(0);
});	

$('.upload_company_logo').on('click', function(e) {
    var button = $(this);

    var custom_uploader = wp.media({
 
        button: {
            text: '选择图片'
        },
        multiple: false  
    })
    .on('select', function() {
       
	    $(button).next().attr('src', '');
	   var attachment = custom_uploader.state().get('selection').first().toJSON();
        
	   $(button).prev().val(attachment.id);
       $(button).next().attr('src', attachment.url);
	   
    })
    .open();
});


function showValues() {
    var params = $( ".filter :input[value!='0']").serialize();
	params = decodeURIComponent(params,true);
 
    //$( "h3" ).text(params);
	 window.location= '?'+params;
  }
  
$( ".filter input" ).on( "click", showValues );

$("#job_expire").datepicker({
        dateFormat : 'yy-mm-dd'
    });
	
	$.datepicker.regional['zh-CN'] = {  
        closeText: '关闭',  
        prevText: '<上月',  
        nextText: '下月>',  
        currentText: '今天',  
        monthNames: ['1月','2月','3月','4月','5月','6月',  
        '7月','8月','9月','10月','11月','12月'],  
        monthNamesShort: ['一','二','三','四','五','六',  
        '七','八','九','十','十一','十二'],  
        dayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],  
        dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六'],  
        dayNamesMin: ['日','一','二','三','四','五','六'],  
        weekHeader: '周',  
        dateFormat: 'yy-mm-dd',  
        firstDay: 1,  
        isRTL: false,  
        showMonthAfterYear: true,  
        yearSuffix: '年'};  
    $.datepicker.setDefaults($.datepicker.regional['zh-CN']); 
	
});

/*function Filter(a,b){
    var $ = function(e){return document.getElementById(e);}
    var ipts = $('filterForm').getElementsByTagName('input'),result=[];
    for(var i=0,l=ipts.length;i<l;i++){
        if(ipts[i].getAttribute('to')=='filter'){
            result.push(ipts[i]);
        }
    }
    if($(a)){
        $(a).value = b;
        for(var j=0,len=result.length;j<len;j++){
            if(result[j].value==''){
                result[j].parentNode.removeChild(result[j]);
            }
        }
        document.forms['filterForm'].submit();
    }
    return false;
}*/