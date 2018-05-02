$(function(){
	$('.class-zj').on('click',function(){
		var oI=$(this).find('i').attr("class");
		tgbox($(this),oI);
	});
	$('.class-zjx').on('click',function(){
		var oI=$(this).find('i').attr("class");
		tgbox($(this),oI);
	});
	var tgbox=function(obj,oi){
			if(oi=="i-bjt"){
				obj.next().css('display','block');
				obj.find('i').removeClass().addClass('i-tjt');
				flag=false;
			}
			else{
				obj.next().css('display','none');
				obj.find('i').removeClass().addClass('i-bjt');
				flag=true;
			}
	}
	$('.js-qd').on('click',function(){
		$('.wxtsbox').css('display','block');
		$('.layer2').animate({"right":0},0);
	});
	$('.wxts-close').on('click',function(){
		$('.wxtsbox').css('display','none');
		$('.layer2').animate({"right":-10000},0);
	});
	$('.topbtn').on('click',function(){
		$('.navbox').animate({"right":0},500);
		$('.layer').animate({"right":0},500);
	});
	$('.exitBox').on('click',function(){
		$('.navbox').animate({"right":-800},500);
		$('.layer').animate({"right":-10000},500);
	});
//
//	$('.i-jtb').on('click',function(){
//			var con=$(this).parent().parent();
//			showhid($(this),'i-jtb-on',con);
//	});
//	$('.i-tb').on('click',function(){
//		var con=$(this).parents('.yhqtopbox');
//		showhid($(this),'i-tb-on',con);
//	});
//	var showhid=function(obj,itemclass,con){
//			if(obj.hasClass(itemclass)){
//				con.next().slideUp();
//				obj.removeClass(itemclass)
//			}
//			else{
//				con.next().slideDown();
//				obj.addClass(itemclass)
//			}	
//	};

	$('.jsyhq1').on('click',function(){
		var box=$('#jswrap1');
		showBox(box);

	})
	$('.jsyhq2').on('click',function(){
		var box=$('#jswrap2');
		showBox(box);

	})
	$('.jsyhq3').on('click',function(){
		var box=$('#jswrap3');
		showBox(box);

	})
	$('.jsyhq4').on('click',function(){
		var box=$('#jswrap4');
		showBox(box);

	})

	$('.y-w-close').on('click',function(){
			closeBox($(this))
		
	})
	var showBox=function(box){
		var txt='<div class="layer3"></div>';
		$('body').append(txt);
		box.slideDown();
	}
	var closeBox=function(obj){
		var box=obj.parents('.yhq-wrap');
		if($('.layer3')){
			var lay=$('.layer3');
			box.slideUp();
			lay.remove();
		}
		
	}
	$('.jsldiv').on('click',function(){
		$('.stc').show().delay(3000).hide(300);
		$(this).parents('.yhqtcbox').find('.i-ylq').removeClass('hide');
		
	})
	
	
})