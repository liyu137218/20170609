

var nvtabs=function(tab,con){
    tab.click(function(){
        var indx=tab.index(this);
        tab.removeClass('on');
        $(this).addClass('on');
        con.hide();
        con.eq(indx).show();
    })
};

$(function(){
	$('.js-adress').click(function(){
		$('.d-wrapTc-div,.layer').css('display','block');
		$('.d-wrapTc-div').css('animation','mymovef 1s 1 alternate forwards')
	});
	$('.tc-btn-tj').click(function(){
		$('.d-wrapTc-div,.layer').css('display','none');
	})
})