//	图片轮播效果
	function BannerRoll(banner,bannerpic,bannerlist,last,next){
//					banner
					var Ban = document.getElementById(banner);
//					banner中的图片
					var Ul1 = document.getElementById(bannerpic);
//					图片有多少张
					var Li1 = Ul1.children;
//					圆点
					var Ul2 = document.getElementById(bannerlist);
//					圆点的个数
					var Li2 = Ul2.children;
//					左括号
					var Last = document.getElementById(last);
//					右括号
					var Next = document.getElementById(next);
					var num = 0;
					var timer1 = null;
					var timer2 = null;
					
					Li2[0].className = 'in';
				
				timer1 = setInterval(Roll,3000);
				
				if(Ul1.length != Ul2.lenght){
					alert('圆点数与图片数不符！')
				}
				
				function Roll(){
						num++;
						if(num > Li1.length-1){
							num = 0;
						}
						Ul1.style.marginLeft = - num*100 + '%';	
						
						
						for(var i=0;i<Li2.length;i++){
							Li2[i].className = '';
						}
						Li2[num].className = 'in';
					}
					
//				当鼠标移至banner处时,清除定时器
				Ban.onmouseover = function(){
					clearInterval(timer1);
				}
//				当鼠标移至banner处时,打开定时器让图片滚动
				Ban.onmouseout = function(){
					timer1 = setInterval(Roll,3000);
				}
				
				for(var i=0;i<Li1.length;i++){
					Li1[i].index = i;
					Li2[i].index = i;
					
//					点击上一张时,计数器num--,当处于第一张时进行判断,跳转到最后一张
					Last.onclick = function(){
						num--;
						if(num < 0){
							num = Li1.length-1;
						}
						for(var i=0;i<Li2.length;i++){
							Li2[i].className = '';
						}
						Li2[num].className = 'in';
						Ul1.style.marginLeft = - num*100 + '%';
						
						
					}
//					点击下一张时,计数器num++,当处于最后一张时进行判断,跳转到第一张					
					Next.onclick = function(){
						
						num++;
						if(num > Li1.length-1){
							num = 0;
						}
						for(var i=0;i<Li2.length;i++){
							Li2[i].className = '';
						}
						Li2[num].className = 'in';
						Ul1.style.marginLeft = - num*100 + '%';	
						
					}
//					小圆点点击事件
					Li2[i].onclick = function(){
						
						for(var i=0;i<Li2.length;i++){
							Li2[i].className = '';
						}
						Li2[this.index].className = 'in';
						num = this.index;
						Ul1.style.marginLeft = - num*100 + '%';	
						
					}
					
				}
}
	
//  登录操作
function User(){
//	num倒计时
	var num = 3;
//  创建密码
	var PW = 0;
	var count = 0;
//	黑背景跟登录界面block
	$('#entry').click(function(){
		$('#dark_bg').css('display','block');
		$('#user_entry').css('display','block');
	})
	
//	返回按钮
	$('.close').click(function(){
		$('#dark_bg').css('display','none');
		$('#user_entry').css('display','none');
		$('#user_register').css('display','none');
		$('#forget_password_page').css('display','none');
	})
	
//	登录判断
	$('#user_entry_btn').click(function(){
		
		if($('#user_entry_text').val() == '123456' && $('#user_entry_password').val() == '123456'){
			$('#user_entry_in').css('display','block')
			$('#user_entry').css('display','none');
		}else{
			$('#sign_in_tips').html('账号或密码错误！请重新输入');
		}
		
		if($('#user_entry_in').css('display') == 'block'){
			var countdown = null
			CountDown(num,1);
			
			setCookie('username',$('#user_entry_text').val(),'5');
			
		}
		
	})
	
//	退出
		$('#leave').click(function(){
			removeCookie('username');
			$(location).attr('href','index.html');
		})
	
//	快速注册
	$('#register, #fast_registration').click(function(){
			$('#dark_bg').css('display','block');
			$('#user_entry').css('display','none');
			$('#user_register').css('display','block');
	})
	
//	账号判断
	$('#user_register_text').blur(function(){
			var str = $('#user_register_text').val();
			var re = /^1[3|4|5|8][0-9]\d{8}$/;
			if(!re.test(str)){
				$('#user_register_tips1').html('输入内容不符合要求！');
			}else{
				$('#user_register_tips1').html('');
				count++;
			}
		})
	
//	密码判断
	$('#user_register_password1').blur(function(){
			var str = $('#user_register_password1').val();
			var re = /^[a-z0-9A-Z]{6,13}$/;
			var re1 = /\d+/g;
			if(!re.test(str)){
				$('#user_register_tips2').html('输入内容不符合要求！');
			}else{
				$('#user_register_tips2').html('');
				PW = str;
				if(re1.test(str) && str.length < 8){
					$('#register_password_level').html('弱');
					$('#register_password_level').css('color','#0ba80e');
				}
				
				if(str.length >= 8 && str.length < 11){
					$('#register_password_level').html('中');
					$('#register_password_level').css('color','#f49a0d');
				}
				
				if(str.length >= 11){
					$('#register_password_level').html('强');
					$('#register_password_level').css('color','#f40d0d');
				}
				count++;
			}
		})
	
//	再次输入密码
	$('#user_register_password2').mouseleave(function(){
		var str = $('#user_register_password2').val();
		if(str !=PW){
			$('#user_register_tips3').html('两次密码不一致，请重新输入！');
		}else{
			$('#user_register_tips3').html('');
			count++;
			if(count > 3){
				$('#user_register_btn').css('background','#0072ff');
				$('#user_register_btn').css('cursor','pointer');
			}
		}
	})
	$('#user_register_btn').mouseover(function(){
		if($('#user_register_btn').css('cursor') == 'pointer'){
			$('#user_register_btn').click(function(){
				$('#user_register').css('display','none');
				$('#user_register_in').css('display','block');
				CountDown(num,2);
			})
		}
	})
	
//	忘记密码
	$('#forget_password').click(function(){
		var PW = 0;
		var count = 0;
		$('#dark_bg').css('display','block');
		$('#user_entry').css('display','none');
		$('#forget_password_page').css('display','block');
		
		$('#forget_password_page_text').mouseleave(function(){
			if($(this).val() != ''){
				count++;
			}
		})
		
		$('#Verification_Code_text').mouseout(function(){
			var str = $('#Verification_Code_text').val();
			if(str == ''){
				$('#forget_password_page_tip2').html('验证码不能为空！');
			}else{
				if(str != 1234){
					$('#forget_password_page_tip').html('验证码错误！');
				}else{
					$('#forget_password_page_tip').html('');
					count++;
			}
			}
			
		})
		
//		新密码
		$('#forget_password_page_password1').mouseout(function(){
			var str = $('#forget_password_page_password1').val();
			var re = /^[a-z0-9A-Z]{6,13}$/;
			var re1 = /\d+/g;
			if(!re.test(str)){
				$('#forget_password_page_tip3').html('输入内容不符合要求！');
			}else{
				$('#forget_password_page_tip3').html('');
				PW = str;
				if(re1.test(str) && str.length < 8){
					$('#forget_password_level').html('弱');
					$('#forget_password_level').css('color','#0ba80e');
				}
				
				if(str.length >= 8 && str.length < 11){
					$('#forget_password_level').html('中');
					$('#forget_password_level').css('color','#f49a0d');
				}
				
				if(str.length >= 11){
					$('#forget_password_level').html('强');
					$('#forget_password_level').css('color','#f40d0d');
				}
				count++;
			}
		})
		
//	再次输入密码
		$('#forget_password_page_password2').mouseleave(function(){
			var str = $('#forget_password_page_password2').val();
			if(str !=PW){
				$('#forget_password_page_tip4').html('两次密码不一致，请重新输入！');
			}else{
				$('#forget_password_page_tip4').html('');
				count++;
				if(count > 4){
					$('#forget_password_page_btn').css('background','#0072ff');
					$('#forget_password_page_btn').css('cursor','pointer');
				}
			}
		})
		
//		确认修改
		$('#forget_password_page_btn').mouseover(function(){
		if($('#forget_password_page_btn').css('cursor') == 'pointer'){
			$('#forget_password_page_btn').click(function(){
				$('#forget_password_page').css('display','none');
				$('#change_password').css('display','block');
				CountDown(num,4);
			})
		}
	})
		
	})
	

}

//购买
function Buy(){
	var num = 3;
	$('#Buy_button, #ShoppingCar_button').click(function(){
		$('#dark_bg').css('display','block');
		$('#Buy_success').css('display','block');
		
		if($('#Buy_success').css('display') == 'block'){
			var countdown = null
			CountDown(num,3);
			
		}
	})
}

// 倒计时
function CountDown(num,status){
	
	if(status == 1){
		countdown = setInterval(function(){
			num--;
			$('#user_entry_in_time').html(num);
			if(num == 0){
				num = 3;
				clearInterval(countdown);
				$(location).attr('href','index.html');
				$('#user_name').css('display','block');
				$('#user_center').css('display','block');
				$('#car').css('display','block');
				$('#entry').css('display','none');
				$('#register').css('display','none');
			}
			
		},1000)
	}
	
	if(status == 2){
		countdown = setInterval(function(){
			num--;
			$('#user_register_in_time').html(num);
			if(num == 0){
				num = 3;
				clearInterval(countdown);
				$(location).attr('href','index.html');
			}
			
		},1000)
	}
	
	if(status == 3){
		countdown = setInterval(function(){
			num--;
			$('#Buy_success_time').html(num);
			if(num == 0){
				num = 3;
				clearInterval(countdown);
				$(location).attr('href','index.html');
			}
			
		},1000)
	}
	
	if(status == 4){
		countdown = setInterval(function(){
			num--;
			$('#change_password_time').html(num);
			if(num == 0){
				num = 3;
				clearInterval(countdown);
				$(location).attr('href','index.html');
			}
			
		},1000)
	}
	
			
}


//封装一个 设置Cookie的函数：
function setCookie(key, value, t) {
	var oDate = new Date();
	oDate.setDate( oDate.getDate() + t );
	document.cookie = key + '=' + value + ';expires=' + oDate.toGMTString();
}

//封装一个 读取Cookie方法的函数：
function getCookie(key) {
	var arr1 = document.cookie.split('; ');
	for (var i=0; i<arr1.length; i++) {
		var arr2 = arr1[i].split('=');
		if ( arr2[0] == key ) {
			return decodeURI(arr2[1]);
		}
	}
}

//移除cookie
function removeCookie (key) {
setCookie(key, ' ', -1);
};

//二级导航
function sec_nav(){
	$('.sec_nav').find('li').click(function(){
			$(this).siblings('li').removeClass('sec_nav_in');
			$(this).addClass('sec_nav_in');
			
			var str = $('.sec_nav_in').html();
			
			switch (str){
				case '沙发': Sofa();
					break;
				case '电视柜': TV_cabinet();
					break;
				case '鞋柜': Shoescase();
					break;
				case '衣柜': Wardrobe();
					break;
				case '茶几/边桌': Table();
					break;
				case '单/双人床': Bed();
					break;
				case '餐桌': Board();
					break;
			}
	})
	
	
	
}

//选项卡
function Tab(){
	$('#Shopping_Mall_main_table').find('td:first').find('li').click(function(){
		$(this).siblings('li').removeClass('pointer');
		$(this).addClass('pointer');
		
		var str = $('.pointer').html();
		switch (str){
			case '全部': Sofa();
				break;
			case '凯撒豪庭': Sofa_name1();
				break;
			case '蓝骑家居': Sofa_name2();
				break;
			case '良品LIFE': Sofa_name3();
				break;
			default:
				break;
		}
	})
	
}

function Tab2(){
	$('#Shopping_Mall_main_ul2').find('li').click(function(){
		$(this).siblings('li').removeClass('pointer1');
		$(this).addClass('pointer1');
		
		var sd = $('.pointer1').html();
		switch (sd){
			case '全部': Sofa();
				break;
			case '1000以下': Money1();
				break;
			case '1001-2000': Money2();
				break;
			default:
				break;
		}
	})
	
}


//商城页码切换
function Page(){
	$('#goods_page2, #goods_page3, #goods_page4').click(function(){
		$(this).parent().find('input').removeClass();
		$(this).addClass('goods_page_bg');
	})
	
	$('#goods_page2').click(function(){
		Sofa();
	})
	
	$('#goods_page3').click(function(){
		Page2();
	})
}

//function ScreenScroll(){
//	$(document).scroll(function(ev){
//		var top = $(this).scrollTop();
//		if(top < 500){
//			$('#shoppingCar').css('display','none');
//			$('#returnTop').css('display','none');
//		}else{
//			$('#shoppingCar').css('display','block');
//			$('#returnTop').css('display','block');
//		}
//	})
//}

//添加到购物车效果
function Shopping_Car_In(){
	var count = 0;
	$('.shopping_car_in').click(function(){
		count++;
		$('#shoppingCar').find('span').css('display','block').html(count);
	})
}

//个人信息编辑
function Edit(){
	var onOff = true;
	$('#edit').click(function(){
//		alert($('.person_center_main_information').size())
		if(onOff==true){
				$(this).text('保存');
				
				
				for(var i=1;i<=$('.person_center_main_information').size();i++){
					
					$("#person_center_main_message_txt"+i).val($('.person_center_main_message'+i).find('span').text());
					$("#person_center_main_message_txt"+i).css('display','block');
				}
				onOff = false;
			}else{
				$(this).text('编辑');
				
				
				for(var i=1;i<=$('.person_center_main_information').size();i++){
					$(".person_center_main_message"+i).find('span').text($('#person_center_main_message_txt'+i).val());
					$("#person_center_main_message_txt"+i).css('display','none');
					
				}
				onOff = true;
			}
		
	})
}

//最新推荐图片切换
function Choose(){
		$('.NewsRecommend_goods_message').find('img').each(function(index,elem){
			$(this).click(function(){
				$(this).siblings('img').css('border','none');
			    $(this).css('border','1px solid #f42e2e');
//			    查找到当前操作图片的爷爷类(父类的父类),然后让爷爷类中的子类img地更换成点击触发图片按钮的地址
			    $(this).parent().parent().children('img').attr('src',$(this)[0].src);
			})
			
		})
		
		$('.NewsRecommend_goods_pic').each(function(index,elem){
			$(this).click(function(){
				$(location).attr('href','GoodsDetails.html');
			})
		})
		
		$('#more').click(function(){
			$('.NewsRecommend_goods_border4, .NewsRecommend_goods_border5, .NewsRecommend_goods_border6').css('display','block');
			$('#more').text('已经到底啦').css('cursor','default');
			
		})
	
}

//商品详情页效果
function Details(){
//	点击图片
	$('.shopping_information_min').find('li').each(function(index,elem){
		$(this).click(function(){
			$(this).siblings('li').removeClass();
			$(this).addClass('shopping_information_min_border');
			$('.shopping_information_max').find('img').attr('src',$(this).find('img')[0].src);
		})
	})
//	下一张
	$('#GD_next').click(function(){
//		用class判断当前图片位置
		var $next = $('.shopping_information_min_border').next('li');
		if($next.html() == undefined){
//			当图片移动到最后一张时,将class名字赋予第一个Li
			$('.shopping_information_min').find('li').eq(0).addClass('shopping_information_min_border').siblings('li').removeClass();
			$('.shopping_information_max').find('img').attr('src',$('.shopping_information_min').find('li').eq(0).find('img')[0].src);
		}else{
			$next.addClass('shopping_information_min_border');
			$('.shopping_information_max').find('img').attr('src',$next.find('img')[0].src);
			$next.siblings('li').removeClass();
		}
		
	})
//	上一张
	$('#GD_last').click(function(){
		var $last = $('.shopping_information_min_border').prev('li');
		var num = $('.shopping_information_min').find('li').size();
		if($last.html() == undefined){
//			当图片移动到第一张时,将class名字赋予最后一个Li，用num判断一共有几个Li
			$('.shopping_information_min').find('li').eq(num-1).addClass('shopping_information_min_border').siblings('li').removeClass();
			$('.shopping_information_max').find('img').attr('src',$('.shopping_information_min').find('li').eq(num-1).find('img')[0].src);
		}else{
			$last.addClass('shopping_information_min_border');
			$('.shopping_information_max').find('img').attr('src',$last.find('img')[0].src);
			$last.siblings('li').removeClass();
		}
		
	})
	
//	选择商品
	$('.goods_chooes').find('span').each(function(index,elem){
		$(this).click(function(){
			$(this).css('border','1px solid #dc5b5b').siblings('span').css('border','1px solid #ccc');
//			改变按钮颜色并添加一个点击事件
			$('#shopping_information_right_btn2').css({
				'background':'#e63232',
				'color':'#fff',
				'cursor':'pointer'
			}).click(function(){
				$(location).attr('href','Buy.html');
			})
		})
		
	})
	
	
//	商品数量
	$('#goods_add').click(function(){
		var num = parseInt($('#goods_num').val());
		if(num < 0 || typeof(num)!="number"){
			$('#goods_num').val(1);
		}else{
			num++;
			$('#goods_num').val(num);
		}
		
	})
	
	$('#goods_reduce').click(function(){
		var num = parseInt($('#goods_num').val());
		if(num == 1 || typeof(num)!="number"){
			$('#goods_num').val(1);
		}else{
			num--;
			$('#goods_num').val(num);
		}
		
	})
	
	$('#GD_main_list').find('li').each(function(index,elem){
		$(this).click(function(){
			$(this).addClass('GD_main_list_status').siblings('li').removeClass();
			
			switch (index){
				case 0: $('.goods_message1').css('display','block');
						$('.goods_message2, .goods_message3, .goods_message4, .goods_message5').css('display','none');
					break;
				case 1: $('.goods_message2').css('display','block');
						$('.goods_message1, .goods_message3, .goods_message4, .goods_message5').css('display','none');
					break;
				case 2: $('.goods_message3').css('display','block');
						$('.goods_message1, .goods_message2, .goods_message4, .goods_message5').css('display','none');
					break;
				case 3: $('.goods_message4').css('display','block');
						$('.goods_message1, .goods_message2, .goods_message3, .goods_message5').css('display','none');
					break;
				case 4: $('.goods_message5').css('display','block');
						$('.goods_message1, .goods_message2, .goods_message3, .goods_message4').css('display','none');
					break;
				default:
					break;
			}
		})
	})
	
	$('.shopping_information_right_btn1').click(function(){
		$('#add_success').css('display','block');
		var timer = null;
//		clearTimeout(timer);
		timer = setTimeout(function(){
			$('#add_success').css('display','none');
		},500)
	})
//	收货地址
	$('#address').click(function(){
		if($('.address_box').css('display') == "none"){
			$('.address_box').css('display','block');
		}else{
			$('.address_box').css('display','none');
		}
		
	})
	
}

//购物车,历史记录,评论操作
function ShoppingCar(){
	var onOff = true;
	$('.otherpage').find('li').each(function(index,elem){
		$(this).click(function(){
			$(this).addClass('otherpage_bg');
			$(this).siblings('li').removeClass();
			
			switch (index){
				case 0: 
				$('.ShoppingCar_main').css('display','block');
				$('.logistics_main').css('display','none');
				$('.Evaluate_main').css('display','none');
					break;
				case 1: 
				$('.ShoppingCar_main').css('display','none');
				$('.logistics_main').css('display','block');
				$('.Evaluate_main').css('display','none');
					break;
				case 2: 
				$('.ShoppingCar_main').css('display','none');
				$('.logistics_main').css('display','none');
				$('.Evaluate_main').css('display','block');
					break;
			}
		})
	})
	
	$('.goods_name, #goods_pic').click(function(){
		$(location).attr('href','GoodsDetails.html');
	})
	
//全选操作，.change，第一个checkbox属性发生改变时，其他checkbox也发生改变
$("table :checkbox:first").change(function(){
	var num = 0;
	var count = 0;
    $(this).closest("table")
           .find(":checkbox:not(:first)")
           .prop("checked", this.checked);
           
    $('#ShoppingCar_table').find(":checkbox:not(:first)").each(function(index,elem){
    	if($(this).is(':checked') == true){
    		num = parseInt($(this).parent().parent().find('span').eq(2).text())*parseInt($(this).parent().parent().find('input[type=text]').val());
			count+=num;
    	}else{
    		num=0;
    	}
           	
    })
    $('#count_money').text(count);
//         alert($('.ShoppingCar_table_check').size())
//         alert($(this).is(':checked'))
});

//非第一个checkbox点击操作
for(var i=0;i<$('.ShoppingCar_table_check').size();i++){
//	num用于计算商品价格跟个数的值
	var num = 0;
//	count用于累加num产生的值
	var count = 0;
//	allCheck用于记录当前有几个checkbox被选中
	var allCheck = 0;
	$('.ShoppingCar_table_check').eq(i).click(function(){
//		全选之后,点击非第一个checkbox,改变第一个checkbox的状态,即非全选状态
		if($('#all_check').is(':checked') == true){
			$('#all_check').prop("checked", this.checked);
		}
//		如果除第一个checkbox以外所有的checkbox都被选中的话,改变第一个checkbox状态,即全选状态
				if($(this).is(':checked') == true){
					allCheck++;
				}else{
					allCheck--;
				}
			
		if(allCheck == $('.ShoppingCar_table_check').size() && $('#all_check').is(':checked') == false){
			$('#all_check').prop("checked", this.checked);
		}
		
//		如果选中的商品数量大于1,则更换按钮颜色
			if(allCheck >= 1){
				$('#ShoppingCar_button').css({
					'background':'#ed1f1f',
					'cursor':'pointer'
					});
			}else{
				$('#ShoppingCar_button').css({
					'background':'#cbc8c6',
					'cursor':'default'
					});
			}
		
		if($(this).is(':checked') == true){
			num = parseInt($(this).parent().parent().find('span').eq(2).text())*parseInt($(this).parent().parent().find('input[type=text]').val());
			count+=num;
		}else{
			num = parseInt($(this).parent().parent().find('span').eq(2).text())*parseInt($(this).parent().parent().find('input[type=text]').val());
			count-=num;
		}
			$('#count_money').text(count);
		
		
			
			if($(this).css('cursor') == 'pointer'){
					Buy();
			}	
	})
	
}

//查看订单
$('.Evaluate_main_box_p3, .check_order').click(function(){
	$(location).attr('href','Order_message.html');
})

//删除订单
$('.delete_order').click(function(){
	$(this).parent().parent().remove();
})

}

//立即评价
function Evaluate(){
		$('#Evaluate_main_box_message').click(function(){
			$(location).attr('href','GoodsDetails.html');
		})
//		点击需要打分的li,它本身及之前的兄弟节点都替换背景图片.在替换之前,先对所有li进行初始化
		$('.Evaluate_main_star').find('li').each(function(index,elem){
			$(this).click(function(){
				$(this).parent().find('li').css('background-image','url(images/star_border.png)');
				$(this).css('background-image','url(images/yellow_star.png)');
				$(this).prevAll('li').css('background-image','url(images/yellow_star.png)');
//				评分,打字,评星级,只要有一样就会改变按钮的样式
				$('#Evaluate_btn').css({
					'background':'#ed1f1f',
					'cursor':'pointer'
				});
			})
		})
		
		$('.Evaluate_main_box_p2').find('input[type=radio]').click(function(){
			$('#Evaluate_btn').css({
					'background':'#ed1f1f',
					'cursor':'pointer'
				});
		})
		
		$('.Evaluate_main_box_p2').find('textarea').mouseleave(function(){
			if($(this).val() != ''){
				$('#Evaluate_btn').css({
					'background':'#ed1f1f',
					'cursor':'pointer'
				});
			}
		})
	
	
}

function Sofa(){
	$.ajax({
			type:"get",  //请求方式为get，也可以是设置为post
							
			url:"goods.json",//所要获取的json文件相对地址，注意不要写错了，我这里放在同一个目录下的
							
			async:true,　//是否为异步请求，ture为异步请求，false为同步请求
							
			dataType: "json",
			//当请求之后调用。传入返回后的数据，以及包含成功代码的字符串			
			success : function(data){
				//alert(data[0].goods_brand)
				for(var i=1;i<=$('#goods').find('li').length;i++){
					
					$('.goods_brand'+i).html(data.Sofa[i-1].goods_brand);
					
//					创建一个string对象用于存放从json文件中获取的goods_information,判断其长度是否大于规定值,如果大于则进行裁切,并在末尾加上省略号.
					var str = new String();
					
					if(data.Sofa[i-1].goods_information.length > 30){
						str = data.Sofa[i-1].goods_information.substr(0,30) + '......';
					}else{
						str = data.Sofa[i-1].goods_information;
					}
					
					$('.goods_information'+i).html(str);
					
					$('.goods_pic'+i).css('background-image',data.Sofa[i-1].goods_pic);
					}
				}
							
		})
}

function TV_cabinet(){
	$.ajax({
			type:"get",  //请求方式为get，也可以是设置为post
							
			url:"goods.json",//所要获取的json文件相对地址，注意不要写错了，我这里放在同一个目录下的
							
			async:true,　//是否为异步请求，ture为异步请求，false为同步请求
							
			dataType: "json",
			//当请求之后调用。传入返回后的数据，以及包含成功代码的字符串			
			success : function(data){
				//alert(data[0].goods_brand)
				for(var i=1;i<=$('#goods').find('li').length;i++){
					$('.goods_brand'+i).html(data.TV_cabinet[i-1].goods_brand);
					$('.goods_name'+i).html(data.TV_cabinet[i-1].goods_name);
					$('.goods_pic'+i).css('background-image',data.TV_cabinet[i-1].goods_pic);
					}
				}
							
		})
}

function Shoescase(){
	$.ajax({
			type:"get",  //请求方式为get，也可以是设置为post
							
			url:"goods.json",//所要获取的json文件相对地址，注意不要写错了，我这里放在同一个目录下的
							
			async:true,　//是否为异步请求，ture为异步请求，false为同步请求
							
			dataType: "json",
			//当请求之后调用。传入返回后的数据，以及包含成功代码的字符串			
			success : function(data){
				//alert(data[0].goods_brand)
				for(var i=1;i<=$('#goods').find('li').length;i++){
					$('.goods_brand'+i).html(data.Shoescase[i-1].goods_brand);
					$('.goods_name'+i).html(data.Shoescase[i-1].goods_name);
					$('.goods_pic'+i).css('background-image',data.Shoescase[i-1].goods_pic);
					}
				}
							
		})
}

function Wardrobe(){
	$.ajax({
			type:"get",  //请求方式为get，也可以是设置为post
							
			url:"goods.json",//所要获取的json文件相对地址，注意不要写错了，我这里放在同一个目录下的
							
			async:true,　//是否为异步请求，ture为异步请求，false为同步请求
							
			dataType: "json",
			//当请求之后调用。传入返回后的数据，以及包含成功代码的字符串			
			success : function(data){
				//alert(data[0].goods_brand)
				for(var i=1;i<=$('#goods').find('li').length;i++){
					$('.goods_brand'+i).html(data.Wardrobe[i-1].goods_brand);
					$('.goods_pic'+i).css('background-image',data.Wardrobe[i-1].goods_pic);
					}
				}
							
		})
}

function Table(){
	$.ajax({
			type:"get",  //请求方式为get，也可以是设置为post
							
			url:"goods.json",//所要获取的json文件相对地址，注意不要写错了，我这里放在同一个目录下的
							
			async:true,　//是否为异步请求，ture为异步请求，false为同步请求
							
			dataType: "json",
			//当请求之后调用。传入返回后的数据，以及包含成功代码的字符串			
			success : function(data){
				//alert(data[0].goods_brand)
				for(var i=1;i<=$('#goods').find('li').length;i++){
					$('.goods_brand'+i).html(data.Table[i-1].goods_brand);
					$('.goods_pic'+i).css('background-image',data.Table[i-1].goods_pic);
					}
				}
							
		})
}

function Bed(){
	$.ajax({
			type:"get",  //请求方式为get，也可以是设置为post
							
			url:"goods.json",//所要获取的json文件相对地址，注意不要写错了，我这里放在同一个目录下的
							
			async:true,　//是否为异步请求，ture为异步请求，false为同步请求
							
			dataType: "json",
			//当请求之后调用。传入返回后的数据，以及包含成功代码的字符串			
			success : function(data){
				//alert(data[0].goods_brand)
				for(var i=1;i<=$('#goods').find('li').length;i++){
					$('.goods_brand'+i).html(data.Bed[i-1].goods_brand);
					$('.goods_pic'+i).css('background-image',data.Bed[i-1].goods_pic);
					}
				}
							
		})
}

function Board(){
	$.ajax({
			type:"get",  //请求方式为get，也可以是设置为post
							
			url:"goods.json",//所要获取的json文件相对地址，注意不要写错了，我这里放在同一个目录下的
							
			async:true,　//是否为异步请求，ture为异步请求，false为同步请求
							
			dataType: "json",
			//当请求之后调用。传入返回后的数据，以及包含成功代码的字符串			
			success : function(data){
				//alert(data[0].goods_brand)
				for(var i=1;i<=$('#goods').find('li').length;i++){
					$('.goods_brand'+i).html(data.Board[i-1].goods_brand);
					$('.goods_pic'+i).css('background-image',data.Board[i-1].goods_pic);
					}
				}
							
		})
}

function Sofa_name1(){
	$.ajax({
			type:"get",  //请求方式为get，也可以是设置为post
							
			url:"goods.json",//所要获取的json文件相对地址，注意不要写错了，我这里放在同一个目录下的
							
			async:true,　//是否为异步请求，ture为异步请求，false为同步请求
							
			dataType: "json",
			//当请求之后调用。传入返回后的数据，以及包含成功代码的字符串			
			success : function(data){
				//alert(data[0].goods_brand)
				for(var i=1;i<=$('#goods').find('li').length;i++){
					$('.goods_brand'+i).html(data.Sofa_name1[i-1].goods_brand);
					$('.goods_pic'+i).css('background-image',data.Sofa_name1[i-1].goods_pic);
					}
				}
							
		})
}

function Sofa_name2(){
	$.ajax({
			type:"get",  //请求方式为get，也可以是设置为post
							
			url:"goods.json",//所要获取的json文件相对地址，注意不要写错了，我这里放在同一个目录下的
							
			async:true,　//是否为异步请求，ture为异步请求，false为同步请求
							
			dataType: "json",
			//当请求之后调用。传入返回后的数据，以及包含成功代码的字符串			
			success : function(data){
				//alert(data[0].goods_brand)
				for(var i=1;i<=$('#goods').find('li').length;i++){
					$('.goods_brand'+i).html(data.Sofa_name2[i-1].goods_brand);
					$('.goods_pic'+i).css('background-image',data.Sofa_name2[i-1].goods_pic);
					}
				}
							
		})
}

function Sofa_name3(){
	$.ajax({
			type:"get",  //请求方式为get，也可以是设置为post
							
			url:"goods.json",//所要获取的json文件相对地址，注意不要写错了，我这里放在同一个目录下的
							
			async:true,　//是否为异步请求，ture为异步请求，false为同步请求
							
			dataType: "json",
			//当请求之后调用。传入返回后的数据，以及包含成功代码的字符串			
			success : function(data){
				//alert(data[0].goods_brand)
				for(var i=1;i<=$('#goods').find('li').length;i++){
					$('.goods_brand'+i).html(data.Sofa_name3[i-1].goods_brand);
					$('.goods_pic'+i).css('background-image',data.Sofa_name3[i-1].goods_pic);
					}
				}
							
		})
}

function Page2(){
	$.ajax({
			type:"get",  //请求方式为get，也可以是设置为post
							
			url:"goods.json",//所要获取的json文件相对地址，注意不要写错了，我这里放在同一个目录下的
							
			async:true,　//是否为异步请求，ture为异步请求，false为同步请求
							
			dataType: "json",
			//当请求之后调用。传入返回后的数据，以及包含成功代码的字符串			
			success : function(data){
				//alert(data[0].goods_brand)
				for(var i=1;i<=$('#goods').find('li').length;i++){
					$('.goods_brand'+i).html(data.Page2[i-1].goods_brand);
					$('.goods_pic'+i).css('background-image',data.Page2[i-1].goods_pic);
					}
				}
							
		})
}

function Money1(){
	$.ajax({
			type:"get",  //请求方式为get，也可以是设置为post
							
			url:"goods.json",//所要获取的json文件相对地址，注意不要写错了，我这里放在同一个目录下的
							
			async:true,　//是否为异步请求，ture为异步请求，false为同步请求
							
			dataType: "json",
			//当请求之后调用。传入返回后的数据，以及包含成功代码的字符串			
			success : function(data){
				//alert(data[0].goods_brand)
				for(var i=1;i<=$('#goods').find('li').length;i++){
					$('.goods_brand'+i).html(data.Money1[i-1].goods_brand);
					$('.goods_pic'+i).css('background-image',data.Money1[i-1].goods_pic);
					$('.goods_money'+i).text(data.Money1[i-1].goods_money)
					}
				}
							
		})
}

function Money2(){
	$.ajax({
			type:"get",  //请求方式为get，也可以是设置为post
							
			url:"goods.json",//所要获取的json文件相对地址，注意不要写错了，我这里放在同一个目录下的
							
			async:true,　//是否为异步请求，ture为异步请求，false为同步请求
							
			dataType: "json",
			//当请求之后调用。传入返回后的数据，以及包含成功代码的字符串			
			success : function(data){
				//alert(data[0].goods_brand)
				for(var i=1;i<=$('#goods').find('li').length;i++){
					$('.goods_brand'+i).html(data.Money2[i-1].goods_brand);
					$('.goods_pic'+i).css('background-image',data.Money2[i-1].goods_pic);
					$('.goods_money'+i).text(data.Money2[i-1].goods_money)
					}
				}
							
		})
}