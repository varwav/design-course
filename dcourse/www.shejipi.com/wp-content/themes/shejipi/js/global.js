jQuery(function ($) {
 
	if ($(window).width() > 700)
		$('.page-template-user #main').removeClass('folder');
	var isTouchDevice = 'ontouchstart' in document.documentElement;
	if (isTouchDevice) {
		$('.mnav').click(function () {
			$("#menu-nav").toggle();
			maincol = $('.page-template-user #main');
			maincol.toggleClass('folder', 1000);
			if (maincol.hasClass('folder'))
				$('.usermain').css('width', 'auto');
			else
				$('.usermain').css('width', $('.usermain').width() + 179);
		});
	}
	
	$("nav").click(function () {
		$(".nav").slideDown(200);
	});
	$("nav i:first").click(function () {
		$(".nav").slideUp(100);
		return false;
	});
	
 

/* 	$('.sort li').hover(function () {
		$(this).find(".periodbox").toggle();
	}); */
	 
	$('.usergv').hover(function () {
		$(".unav").stop(true,true).delay(200).slideDown(200);
	},function(){$(".unav").stop(true,true).slideUp(100); });
	$(window).resize(function () {
		$('.slide').slide({
			effect : 'slide',
			pause : shejipi.slidepause
		});
		$('.itemshow').slide({
			effect : 'slide',
			pause : shejipi.slidepause
		});
		
		$('.jobslide').slide({
			effect : 'slide',
			pause : shejipi.slidepause
		});

		set_right_col();
		set_iframe();
 
		 
	}).trigger('resize');
	
	$('.showmore').click(function () {
		var ul = $(this).parent().find('ul');
		if ($(this).text() == '显示更多') {
			ul.css('height', 'auto');
			$(this).text('收起');
		} else {
			ul.css('height', ul.attr('oheight'));
			$(this).text('显示更多');
		}
	})
	$('.slide img').load(function () {
		set_right_col();
		set_iframe();
	})
	function set_right_col() {
		if ($('.slide').length) {
			if ($('.slide').offset().top == $('.homerec').offset().top) {
				$('.homerec').height($('.slide').height());
				$('.homerec li').animate({
					'height' : ($('.slide').height() - 24) / 3
				}, 300);
			} else {
				$('.homerec, .homerec li').height('auto');
			}
		}
	}
	function set_iframe() {
		var frame_ads = $('.slide iframe');
		frame_ads.parent().css({
			'width' : '100%',
			'height' : ''
		});
		frame_ads.removeAttr('height').removeAttr('height').attr('width', '100%');
		frame_ads.contents().find("img").removeAttr('height').removeAttr('width').css({
			'width' : '100%',
			'height' : "auto",
			'display' : 'block'
		});
		frame_ads.height(frame_ads.contents().find("body").height());
	}
 
	
	$('.slide iframe').contents().find("img").load(function () {
		$('.slide iframe').height($(this).height())
	})
	 
	$('.partner li iframe').css('vertical-align','baseline');
	
	$(window).bind("scroll", function () {
		var top = $(document).scrollTop();
		var wh = $(window).height();
		(top > wh) ? $backEle.not('.app #gotop').fadeIn(500) : $backEle.fadeOut(200);
		(top > wh) ? $('#gohome').not('.app #gohome').fadeIn(500) : $('#gohome').fadeOut(200);
	});
	
	
	$backEle = $('#gotop').click(function () { $("body,html").animate({ scrollTop : -10 }, 200); });
	
	$('.voteduser img:lt(10)').fadeIn(); 
	
	$('.more').click(function () {
		offset = parseInt($(this).attr('offset'));
		len = $('.voteduser img').length;
		$('.voteduser img:lt(' + offset + ')').fadeIn();
		$(this).attr('offset', offset + 10);
		if (offset > len)
			$(this).text('没有了');
	});
	
	$('.myavatar').on('click', function (e) {
		$('body').prepend('<div class="login_overlay"></div>');
		$('.editavatar').css({
			"left" : ($(window).width() - $('.editavatar').width()) / 2
		}).fadeIn();
		e.preventDefault();
	});
	$(document).on('click', '.login_overlay', function () {
		$('.editavatar').fadeOut(100, function () {
			$('.login_overlay').remove();
		});
		return false;
	});
	$(".userside, .usermain").css('min-height', Math.max($(".userside").height(), $(".usermain").height(), $(window).height() - 103));
	$('.tabs').eq(0).fadeIn();
	$('.tab').find('li').click(function () {
		var index = $(this).index();
		$('.tabs').not(':eq(' + index + ')').hide(0);
		$('.tab li').removeClass('on');
		$(this).addClass('on');
		$('.tabs').eq(index).fadeIn(0);
	});


	$(".lazy").lazyload({ effect : "fadeIn" });
 
	$('body').attr('wd', $(window).width());
	$('.jump_submit').click(function () {
		jumpto();
	});
	$('.jump_value').keydown(function () {
		if (event.keyCode == 13) {
			jumpto();
		}
	});
	function jumpto() {
		var jump_num = $('.jump_value').val();
		if (!$.isNumeric(jump_num)) {
			$('.jump_value').select();
			return false;
		}
		jumpto = $('a.page-numbers').last().attr('href').replace(/page\/\d+/g, 'page/' + jump_num);
		window.location = jumpto;
	}
	
	$('.entry-content iframe').not('.full-height').height($('.entry-content iframe').width() / 1.615);

	
	$('.awardsitem li').hover(function () {
		$(this).addClass('show');
	}, function () {
		$(this).removeClass('show');
	})
	$(".vote_submit").click(function () {
		the = $(this);
		pid = the.attr("pid");
		vote = the.parent().find('i');
		the.prop('disabled', true);
		$.ajax({
			type : 'POST',
			url : shejipi.ajaxurl,
			data : {
				'action' : "bb_vote",
				'ajaxnonce' : shejipi.ajaxnonce,
				'pid' : pid,
			},
			success : function (counts) {
				if (counts == 'unlogin') {
					$('#show_login').click();
					$('.status').text('请登录后投票').show();
				} else {
					vote.text(counts);
					the.prop('disabled', false);
				}
			}
		});
		return false;
	})
	if (ajaxpager.startpage < ajaxpager.pausepage) {
		$('.list').infinitescroll({
			loading : {
				finishedMsg : ajaxpager.finishedmessage,
				img : ajaxpager.loadingimage,
				msg : null,
				msgText : '',
			},
			state : {
				currPage : 1
			},
			navSelector : ".pagenav",
			nextSelector : ".pagenav a.next",
			itemSelector : "article",
			dataType : 'html',
			pausepage : ajaxpager.pausepage,
		}, function (newElements, opts) {
		
			$(newElements).find(".lazy").lazyload({
				effect : "fadeIn"
			});
			if (window.history.pushState) {
				if (opts.state.currPage === 2) {
					var curpage = window.location.href.replace(/#\d+/g, '') + '#2';
				} else {
					var curpage = window.location.href.replace(/#\d+/g, '#' + opts.state.currPage);
				}
				window.history.pushState('page', 'title', curpage);
			}
			if (opts.state.currPage == opts.pausepage) {
				$('.list').infinitescroll('unbind');
				
				var page_link = $('.page-numbers').eq(opts.pausepage - 1).attr('href');
				$('.pager').load(page_link + " .pagenav", function (status) {
					if (status == "success") {
						$('.pagenav').fadeIn();
						jumphtml();
					}
				});
			}
		});
	}
	$('.s-ico').click(function () {
		$(this).parent().toggleClass('show-s');
		$(this).parent().find('.s').focus();
	});
 
	
	
	$('.weiboshare').prop('href', 'http://service.weibo.com/share/share.php?url='+ location.href +'&title='+ document.title + '&pic='+ $('.entry-content img:first').prop('src') +'&appkey=');
	if (shejipi.pagetype == 'single'){
		$('.wechatshare').find('.qrcode').qrcode({render: 'image', size: 120, text: location.href});	
	}
	
	$('.wechatshare').hover(function(){ $('.qrcode').toggle()});
	
	$('.copylink').click(function(){ window.prompt("按Ctrl+C或使用鼠标右键复制", location.href);});

 	$('.hao_cat a').on('click', function() {
		var target = this.hash,
		$target = $(target);
		$('html, body').stop().animate({
            'scrollTop': $target.offset().top - 67  }, 300);
		return false;
	});

	$(window).on('scroll', function() {
		$('.hao_section').each(function() {
			if($(window).scrollTop() >= ($(this).offset().top - ($(window).height() / 4))) {
				var id = $(this).index();
				$('.hao_cat a').removeClass('active');
				$('.hao_cat a').eq(id).addClass('active',500);
			}
		});
	});  
	
	$('.exlink').click(function(){
		var current_views = $(this).parent().find('.icon-eye b');
		var pid = $(this).attr('pid');
		current_views.text( parseInt( current_views.text() ) + 1);
		$.ajax({
			type : 'post',
			url : shejipi.ajaxurl,
			data : {
				'action' : 'post_views',
				'ajaxnonce' : shejipi.ajaxnonce,
				'pid' : pid,
			},
			success : function (res) {
				console.log(res);
			}
		});
	});
	
	/* 	if ($('.hao').length) {
		$.ajax({
			type : 'post',
			url : shejipi.ajaxurl,
			data : {
				'action' : 'like_status_views',
				'ajaxnonce' : shejipi.ajaxnonce,
			},
			dataType: 'json',
			success : function (json) {
			$.each(json,function(pid, val){
				$('.pid_' + pid).find('.icon-eye b').text(val.v);
				$('.pid_' + pid).find('a').removeClass('liked').addClass(val.s).find('i').addClass('like_icon');

			//	 $('.pid_' + pid).find('a b').text(val.k);
			});
			}
		});
	} */
	
	  $('.ctrl_d').on('click', function(e) {
			try {
				if(window.netscape) {
				netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
				Components.classes['@mozilla.org/preferences-service;1']
        .getService(Components. interfaces.nsIPrefBranch)
        .setCharPref('browser.startup.homepage',window.location.href);
        alert('设为首页成功');

      }else if(window.external) {
        document.body.style.behavior='url(#default#homepage)';
        document.body.setHomePage(location.href);
      }else {
        throw 'NOT_SUPPORTED';
      }
    }catch(err) {
      alert('您的浏览器不支持自动收藏，请按Ctrl+D');
    }
    e.preventDefault();
  });

	if (shejipi.postid) {
		$.ajax({
			type : 'post',
			url : shejipi.ajaxurl,
			data : {
				'action' : 'post_views',
				'ajaxnonce' : shejipi.ajaxnonce,
				'pid' : shejipi.postid
			},
			success : function (views_html) {
				$('.bottom-meta .date').after('| <span class="views">阅读: ' + views_html + '</span>');
				$('.jobviews').text(views_html);
			}
		});
	}
	$(".feel-post").click(function () {
		the = $(this);
		rate = the.parent().find('.feel-rate');
		cnt = the.parent().find(".feel-count");
		post_id = the.attr("post_id");
		vote = the.attr('vote');
		status = the.attr('status');
		the.attr('status', function (index, attr) {
			return attr == 'voted' ? null : 'voted';
		});
		$(".feel-post").prop('disabled', true);
		fly(the);
		if (status == 'voted') {
			cnt.text(parseInt(cnt.text()) - 1);
			rate.toggleClass('voted').animate({
				'height' : rate.attr('orgheight') + 'px'
			}, 200);
			if (vote == 'like')
				$('.addlike').removeClass('voted').attr('status', '').find('b').text(cnt.text());
		} else {
			cnt.text(parseInt(cnt.text()) + 1);
			var maxcount = 0;
			$('.feel-count').each(function () {
				var eachcount = parseInt($(this).text());
				if (eachcount > maxcount)
					maxcount = eachcount;
			})
			var rates = (parseInt(cnt.text()) / maxcount) * 90;
			rate.toggleClass('voted').animate({
				'height' : rates + 'px'
			}, 200);
			if (vote == 'like')
				$('.addlike').addClass('voted').attr('status', 'voted').find('b').text(cnt.text());
		}
		$.ajax({
			type : 'POST',
			url : shejipi.ajaxurl,
			data : {
				'action' : "get_vote",
				'ajaxnonce' : shejipi.ajaxnonce,
				'pid' : post_id,
				'vote' : vote,
			},
			success : function (res) {
				if (status == 'voted') {}
				else {}

			}
		});
		return false;
	})
	$(".commentvote a").click(function () {
		the = $(this);
		if (the.parent().attr('user') == 'unlogin') {
			$('#show_login').click();
			$('.status').text('请登录后投票').show();
			return false;
		}
		comment_id = the.attr("comment_id");
		vote = the.attr('vote');
		status = the.parent().attr('status');
		if (status == 'voted')
			return false;
		the.parent().attr({
			'status' : 'voted',
			'id' : 'voted'
		});
		the.find('i').addClass('voted');
		var thiscount = parseInt(the.find('b').text());
		if (!thiscount)
			thiscount = 0;
		the.find('b').text(thiscount + 1);
		$.ajax({
			type : 'POST',
			url : shejipi.ajaxurl,
			data : {
				'action' : "get_vote",
				'ajaxnonce' : shejipi.ajaxnonce,
				'cid' : comment_id,
				'vote' : vote,
			},
			success : function (res) {
				if (res == 'unlogin') {
					$('#show_login').click();
					$('.status').text('请登录后投票').show();
				}
			}
		});
		return false;
	})
	$(".hao_like").click(function () {
		the = $(this);
		post_id = the.attr("post_id");
			if (the.attr('disable') == 'true')
			return false;
		the.attr('disable', 'true');
		$.ajax({
			type : 'POST',
			url : shejipi.ajaxurl,
			data : {
				'action' : "like_hao",
				'ajaxnonce' : shejipi.ajaxnonce,
				'pid' : post_id,
			},
			success : function (res) {
					/* console.log( res ); 
					var likenum = the.find('b').text();
					if (res == 'cancel') {
						  the.find('b').text(parseInt(likenum) - 1);
					} else {
						
						if (likenum == '') {
							the.find('b').text('1');
						} else {
							the.find('b').text(parseInt(likenum) + 1);
						}
					} */
					the.attr('disable', 'false');
					the.toggleClass('liked');
			}
		});
		return false;
	})
	$(".addfav, .removefav").click(function () {
		the = $(this);
		post_id = the.attr("post_id");
		if (the.attr('disable') == 'true')
			return false;
		the.attr('disable', 'true');
		status = the.attr('status');
		the.attr('status', function (index, attr) {
			return attr == 'added' ? null : 'added';
		});
		$.ajax({
			type : 'POST',
			url : shejipi.ajaxurl,
			data : {
				'post_vote' : '',
				'action' : "add_fav",
				'ajaxnonce' : shejipi.ajaxnonce,
				'pid' : post_id,
			},
			success : function (res) {
				if (res == 'added') {
					the.find('b').text('已收藏');
				}
				if (res == 'cancel') {
					if (the.hasClass('removefav')) {
						the.parents('tr').remove();
					} else {
						the.find('b').text('收藏');
					}
				}
				if (res == 'unlogin') {
					the.find('b').text('请登录后收藏');
					return false;
				}
				the.toggleClass('added');
				the.attr('disable', 'false');
			}
		});
		return false;
	})
	function fly(from) {
		var objT = from.offset().top - 10;
		var objL = from.offset().left + parseInt(Math.random() * 50);
		var ofly = from.attr('status') == 'voted' ? '+1' : '-1';
		var plus = '<b class="fly" style="top:' + objT + 'px;left:' + objL + 'px;color:#' + Math.floor(Math.random() * 16777215).toString(16) + '"> ' + ofly + '</b>';
		$("body").append(plus);
		$(".fly").animate({
			"top" : objT - 300,
			"opacity" : 0
		}, 1100, function () {
			$(this).remove();
		});
	}
	if ($('.logged-in').length > 0) {
		$.ajax({
			type : 'post',
			url : shejipi.ajaxurl,
			data : {
				'action' : 'unread_message_count',
				'ajaxnonce' : shejipi.ajaxnonce,
			},
			success : function (num) {
				if (num > 0) {
					$('.cnt').text(num).show();
					$('.usergv').append('<span class="msgcnt">' + num + '</span>');
				}
			}
		});
	}
	$('#pmto').keyup(function () {
		name = $('#pmto').val();
		if (!name)
			return false;
		var sug = $('.sug ');
		$.ajax({
			type : 'post',
			url : shejipi.ajaxurl,
			data : {
				'action' : 'search_user',
				'ajaxnonce' : shejipi.ajaxnonce,
				'name' : name
			},
			beforeSend : function () {
				sug.html(' ');
				sug.addClass('waiting');
				sug.css('width', $('#pmto').width()).slideDown(200);
			},
			success : function (data) {
				if (data != 0) {
					sug.removeClass('waiting');
					sug.html(data);
					$('.u').click(function () {
						$('#pmto').val($(this).children('span').text());
						sug.slideUp(200);
					})
				} else {
					sug.slideUp(200);
				}
			}
		});
		return false;
	});
	$("#pmsubmit").click(function () {
		var to = $('#pmto').val();
		var subject = $('#pmsubject').val();
		var content = $('#pmcontent').val();
		var msg = $('.msg');
		if (to.trim() == '') {
			msg.html('请输入收件人昵称');
			$('#pmto').focus();
			return false;
		}
		if (subject.trim() == '') {
			msg.html('请输入标题');
			$('#pmsubject').focus();
			return false;
		}
		if (content.trim() == '') {
			msg.html('请输入内容');
			$('#pmcontent').focus();
			return false;
		}
		$.ajax({
			type : 'POST',
			url : shejipi.ajaxurl,
			data : {
				'action' : "pm_send",
				'ajaxnonce' : shejipi.ajaxnonce,
				'to' : to,
				'subject' : subject,
				'content' : content
			},
			success : function (res) {
				if (res == 'sent') {
					msg.html('短信已经成功发送').delay(3000).fadeIn();
					$('#pmto, #pmsubject, #pmcontent').val('');
				} else {
					msg.html(res);
				}
			}
		});
	})
	$('.tabs .subject').click(function () {
		var li = $(this).parents('li');
		li.children('.content').toggle();
		if (li.hasClass('unread') && li.hasClass('inbox') && !li.hasClass('markunread')) {
			markread(li, '1');
		}
		if (li.hasClass('unread') && li.hasClass('site_notice')) {
			$.ajax({
				type : 'POST',
				url : shejipi.ajaxurl,
				data : {
					'action' : "notice_markread",
					'ajaxnonce' : shejipi.ajaxnonce,
					'id' : li.attr('id'),
				},
				success : function (res) {
					if (res == 'marked') {
						li.removeClass('unread');
					}
				}
			});
		}
	});
	$('.tabs .markpm').click(function () {
		var li = $(this).parents('li');
		markread(li, '0');
	});
	function markread(li, status) {
		$.ajax({
			type : 'POST',
			url : shejipi.ajaxurl,
			data : {
				'action' : "pm_markread",
				'ajaxnonce' : shejipi.ajaxnonce,
				'id' : li.attr('id'),
				'status' : status
			},
			success : function (res) {
				if (res == 'marked') {
					li.toggleClass('unread');
					if (status == '0')
						li.addClass('markunread');
				}
			}
		});
	}
	$('.replypm').click(function () {
		var $form = $('.replyform').clone();
		if (!$(this).hasClass('done')) {
			$(this).addClass('done').html('取消回复');
			$form.attr('id', 'reply');
			$(this).parent().append($form);
			$('#reply .titleto').text('回复:' + $(this).attr('replyname'));
			$('#reply #replyto').val($(this).attr('replylogin'));
			$('#reply #replysubject').val($(this).attr('replysub'));
			$('#reply').fadeIn();
		} else {
			$(this).removeClass('done').html('回复');
			$('#reply').remove();
		}
	});
	$(document).on('click','#reply  #replysubmit', function () {
		var rto = $('#reply #replyto').val();
		var rsubject = $('#reply #replysubject').val();
		var rcontent = $('#reply #replycontent').val();
		var rmsg = $('#reply .replymsg');
		if (rsubject.trim() == '') {
			rmsg.html('请输入标题');
			$('#reply  #replysubject').focus();
			return false;
		}
		if (rcontent.trim() == '') {
			rmsg.html('请输入内容');
			$('#reply #replycontent').focus();
			return false;
		}
		$.ajax({
			type : 'POST',
			url : shejipi.ajaxurl,
			data : {
				'action' : "pm_send",
				'ajaxnonce' : shejipi.ajaxnonce,
				'to' : rto,
				'subject' : rsubject,
				'content' : rcontent
			},
			success : function (rst) {
				if (rst == 'sent') {
					rmsg.html('短信已经成功发送').delay(3000).fadeIn();
					$('#reply #replysubject, #reply  #replycontent').val('');
				}
			}
		});
	})
	$(".delete").click(function () {
		var row = $(this).parents('li');
		$.ajax({
			type : 'POST',
			url : shejipi.ajaxurl,
			data : {
				'action' : "pm_delete",
				'ajaxnonce' : shejipi.ajaxnonce,
				'id' : row.attr('id')
			},
			success : function (re) {
				if (re == 'deleted') {
					row.remove();
				}
			}
		});
	})
	$('#pop_login, #pop_signup').on('click', function (e) {
		formToFadeOut = $('form#register');
		formtoFadeIn = $('form#login');
		if ($(this).attr('id') == 'pop_signup') {
			formToFadeOut = $('form#login');
			formtoFadeIn = $('form#register');
		}
		formToFadeOut.fadeOut(100);
		formtoFadeIn.fadeIn();
		e.preventDefault();
	});
	$('#pop_forgot').click(function (e) {
		formToFadeOut = $('form#login');
		formtoFadeIn = $('form#forgot_password');
		formToFadeOut.fadeOut(100, function () {
			formtoFadeIn.fadeIn();
		})
		e.preventDefault();
	});
	$(document).on('click', '.login_overlay, .close', function (e) {
		$('form#login, form#register, form#forgot_password').fadeOut(100, function () {
			$('.login_overlay').remove();
		});
		e.preventDefault();
	});
	$('#show_login, #show_signup').on('click', function (e) {
		$('body').prepend('<div class="login_overlay"></div>');
		if ($(this).attr('id') == 'show_login')
			$('form#login').fadeIn(300);
		else
			$('form#register').fadeIn(300);
		$('.iform').css({
			"left" : ($(window).width() - $('.iform').width()) / 2
		});
		e.preventDefault();
	});
	$('form#login, form#register').on('submit', function (e) {
		if (!$(this).valid())
			return false;
		$('p.status', this).show().text(ajaxauth.loginmessage);
		action = 'ajaxlogin';
		username = $('form#login #username').val();
		password = $('form#login #password').val();
		email = '';
		security = $('form#login #security').val();
		if ($(this).attr('id') == 'register') {
			if (!$('#check').is(":checked")) {
				$('p.status', this).show().text('请接受《设计癖免责声明》再注册');
				return false;
			}
			action = 'ajaxregister';
			username = $('#signonname').val();
			password = $('#signonpassword').val();
			email = $('#email').val();
			security = $('#signonsecurity').val();
		}
		ctrl = $(this);
		$.ajax({
			type : 'POST',
			
			dataType : 'json',
			url : shejipi.ajaxurl,
			data : {
				'action' : action,
				'username' : username,
				'password' : password,
				'email' : email,
				'security' : security
			},
			success : function (data) {
				$('p.status', ctrl).text(data.message);
				if (data.loggedin == true) {
					document.location.href = ajaxauth.redirecturl;
				}
			}
		});
		e.preventDefault();
	});
	$('form#forgot_password').on('submit', function (e) {
		if (!$(this).valid())
			return false;
		$('p.status', this).show().text(ajaxauth.loginmessage);
		ctrl = $(this);
		$.ajax({
			type : 'POST',
			dataType : 'json',
			url : shejipi.ajaxurl,
			data : {
				'action' : 'ajaxforgotpassword',
				'user_login' : $('#user_login').val(),
				'security' : $('#forgotsecurity').val(),
			},
			success : function (data) {
				$('p.status', ctrl).text(data.message);
			}
		});
		e.preventDefault();
		return false;
	});
	if (jQuery("#register").length)
		jQuery("#register").validate({
			rules : {
				password2 : {
					equalTo : '#signonpassword'
				}
			}
		});
	else if (jQuery("#login").length)
		jQuery("#login").validate();
	if (jQuery('#forgot_password').length)
		jQuery('#forgot_password').validate();
});
function login_button_click(id, link) {
	var back = location.href;
	try {
		if (back.indexOf("wp-login.php") > 0)
			back = document.loginform.redirect_to.value;
	} catch (e) {
		back = "/";
	}
	if (back.indexOf("profile.php") > 0 && back.indexOf("updated") < 0)
		back = back.indexOf("?") > 0 ? (back + "&updated=1") : (back + "?updated=1");
	location.href = (link ? link : "/") + "?connect=" + id + "&action=login&back=" + escape(back);
}
function login_button_unbind_click(id, link) {
	var back = location.href;
	if (back.indexOf("profile.php") > 0 && back.indexOf("updated") < 0)
		back = back.indexOf("?") > 0 ? (back + "&updated=1") : (back + "?updated=1");
	location.href = (link ? link : "/") + "?connect=" + id + "&action=unbind&back=" + escape(back);
}
 
(function ($) {
	$.fn.extend({
		equalHeights : function () {
			var top = 0;
			var classname = ('equalHeights' + Math.random()).replace('.', '');
			$(this).each(function () {
				var thistop = $(this).offset().top;
				if (thistop > top) {
					$('.' + classname).removeClass(classname);
					top = thistop;
				}
				$(this).addClass(classname);
				$(this).height('auto');
				var img = $(this).find('img');
				img.height(img.attr('height') * $(this).width() / img.attr('width'));
				var h = (Math.max.apply(null, $('.' + classname).map(function () {
							return $(this).height();
						}).get()));
				$('.' + classname).height(h);
			}).attr('class', 'done');
		}
	});
	$.fn.slide = function (opt) {
		opt = jQuery.extend({
				pause : 4000,
				effect : 'fadein',
				num : true
			}, opt);
		var f = $(this);
		if (f.length == 0)
			return;
		var width = f.width() + 0.5;
		var ul = f.children('ul');
		var li = ul.find('li');
		var len = li.length;
		var index = 0;
		var pause = opt.pause;
		var speed = opt.speed;
		var timer;
		ul.css('width', width * len);
		li.css('width', width);
		if (opt.num) {
			var num = '<div class="num">';
			for (var i = 0; i < len; i++) {
				num += '<span></span>';
			}
			if ($('.num').length == 0)
				f.append(num);
			$('.num span').mouseover(function () {
				clearInterval(timer);
				var indexnum = $('.num span').index(this);
				play(indexnum);
			}).eq(0).trigger('mouseover');
		}
		f.hover(function () {
			clearInterval(timer);
		}, function () {
			timer = setInterval(function () {
					index++;
					if (index == len)
						index = 0;
					play(index);
				}, pause);
		}).trigger('mouseleave');
		$('.move').bind('click', function () {
			index = $(this).attr('id') == 'toright' ? index + 1 : index - 1;
			if (index == len)
				index = 0;
			if (index < 0)
				index = len - 1;
			play(index);
		});
		function play(index) {
			if (opt.effect == 'slide') {
				ul.stop(true, false).animate({
					'margin-left' : -index * width
				}, 260);
			} else {
				li.not(':eq(' + index + ')').fadeOut(700);
				li.eq(index).fadeIn(600);
			}
			$('.num span').removeClass('on').eq(index).addClass('on');
		}
	}
})(jQuery);
(function ($, window, document, undefined) {
	var $window = $(window);
	$.fn.lazyload = function (options) {
		var elements = this;
		var $container;
		var settings = {
			threshold : 0,
			failure_limit : 0,
			event : "scroll",
			effect : "show",
			container : window,
			data_attribute : "original",
			skip_invisible : true,
			appear : null,
			load : null,
			placeholder : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
		};
		function update() {
			var counter = 0;
			elements.each(function () {
				var $this = $(this);
				if (settings.skip_invisible && !$this.is(":visible")) {
					return;
				}
				if ($.abovethetop(this, settings) || $.leftofbegin(this, settings)) {}
				else if (!$.belowthefold(this, settings) && !$.rightoffold(this, settings)) {
					$this.trigger("appear");
					counter = 0;
				} else {
					if (++counter > settings.failure_limit) {
						return false;
					}
				}
			});
		}
		if (options) {
			if (undefined !== options.failurelimit) {
				options.failure_limit = options.failurelimit;
				delete options.failurelimit;
			}
			if (undefined !== options.effectspeed) {
				options.effect_speed = options.effectspeed;
				delete options.effectspeed;
			}
			$.extend(settings, options);
		}
		$container = (settings.container === undefined || settings.container === window) ? $window : $(settings.container);
		if (0 === settings.event.indexOf("scroll")) {
			$container.bind(settings.event, function () {
				return update();
			});
		}
		this.each(function () {
			var self = this;
			var $self = $(self);
			self.loaded = false;
			if ($self.attr("src") === undefined || $self.attr("src") === false) {
				if ($self.is("img")) {
					$self.attr("src", settings.placeholder);
				}
			}
			$self.one("appear", function () {
				if (!this.loaded) {
					if (settings.appear) {
						var elements_left = elements.length;
						settings.appear.call(self, elements_left, settings);
					}
					$("<img />").bind("load", function () {
						var original = $self.attr("data-" + settings.data_attribute);
						$self.hide();
						if ($self.is("img")) {
							$self.attr("src", original);
						} else {
							$self.css("background-image", "url('" + original + "')");
						}
						$self[settings.effect](settings.effect_speed);
						self.loaded = true;
						var temp = $.grep(elements, function (element) {
								return !element.loaded;
							});
						elements = $(temp);
						if (settings.load) {
							var elements_left = elements.length;
							settings.load.call(self, elements_left, settings);
						}
					}).attr("src", $self.attr("data-" + settings.data_attribute));
				}
			});
			if (0 !== settings.event.indexOf("scroll")) {
				$self.bind(settings.event, function () {
					if (!self.loaded) {
						$self.trigger("appear");
					}
				});
			}
		});
		$window.bind("resize", function () {
			update();
		});
		if ((/(?:iphone|ipod|ipad).*os 5/gi).test(navigator.appVersion)) {
			$window.bind("pageshow", function (event) {
				if (event.originalEvent && event.originalEvent.persisted) {
					elements.each(function () {
						$(this).trigger("appear");
					});
				}
			});
		}
		$(document).ready(function () {
			update();
		});
		return this;
	};
	$.belowthefold = function (element, settings) {
		var fold;
		if (settings.container === undefined || settings.container === window) {
			fold = (window.innerHeight ? window.innerHeight : $window.height()) + $window.scrollTop();
		} else {
			fold = $(settings.container).offset().top + $(settings.container).height();
		}
		return fold <= $(element).offset().top - settings.threshold;
	};
	$.rightoffold = function (element, settings) {
		var fold;
		if (settings.container === undefined || settings.container === window) {
			fold = $window.width() + $window.scrollLeft();
		} else {
			fold = $(settings.container).offset().left + $(settings.container).width();
		}
		return fold <= $(element).offset().left - settings.threshold;
	};
	$.abovethetop = function (element, settings) {
		var fold;
		if (settings.container === undefined || settings.container === window) {
			fold = $window.scrollTop();
		} else {
			fold = $(settings.container).offset().top;
		}
		return fold >= $(element).offset().top + settings.threshold + $(element).height();
	};
	$.leftofbegin = function (element, settings) {
		var fold;
		if (settings.container === undefined || settings.container === window) {
			fold = $window.scrollLeft();
		} else {
			fold = $(settings.container).offset().left;
		}
		return fold >= $(element).offset().left + settings.threshold + $(element).width();
	};
	$.inviewport = function (element, settings) {
		return !$.rightoffold(element, settings) && !$.leftofbegin(element, settings) && !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
	};
	$.extend($.expr[":"], {
		"below-the-fold" : function (a) {
			return $.belowthefold(a, {
				threshold : 0
			});
		},
		"above-the-top" : function (a) {
			return !$.belowthefold(a, {
				threshold : 0
			});
		},
		"right-of-screen" : function (a) {
			return $.rightoffold(a, {
				threshold : 0
			});
		},
		"left-of-screen" : function (a) {
			return !$.rightoffold(a, {
				threshold : 0
			});
		},
		"in-viewport" : function (a) {
			return $.inviewport(a, {
				threshold : 0
			});
		},
		"above-the-fold" : function (a) {
			return !$.belowthefold(a, {
				threshold : 0
			});
		},
		"right-of-fold" : function (a) {
			return $.rightoffold(a, {
				threshold : 0
			});
		},
		"left-of-fold" : function (a) {
			return !$.rightoffold(a, {
				threshold : 0
			});
		}
	});
})(jQuery, window, document);
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	} else {
		factory(jQuery);
	}
}
	(function ($, undefined) {
		'use strict';
		$.infinitescroll = function infscr(options, callback, element) {
			this.element = $(element);
			if (!this._create(options, callback)) {
				this.failed = true;
			}
		};
		$.infinitescroll.defaults = {
			loading : {
				finished : undefined,
				finishedMsg : "<em>Congratulations, you've reached the end of the internet.</em>",
				img : '',
				msg : null,
				msgText : '<em>Loading the next set of posts...</em>',
				selector : null,
				speed : 'fast',
				start : undefined
			},
			state : {
				isDuringAjax : false,
				isInvalidPage : false,
				isDestroyed : false,
				isDone : false,
				isPaused : false,
				isBeyondMaxPage : false,
				currPage : 1
			},
			debug : false,
			behavior : undefined,
			binder : $(window),
			nextSelector : 'div.navigation a:first',
			navSelector : 'div.navigation',
			contentSelector : null,
			extraScrollPx : 150,
			itemSelector : 'div.post',
			animate : false,
			pathParse : undefined,
			dataType : 'html',
			appendCallback : true,
			bufferPx : 40,
			errorCallback : function () {},
			infid : 0,
			pixelsFromNavToBottom : undefined,
			path : undefined,
			prefill : false,
			maxPage : undefined
		};
		$.infinitescroll.prototype = {
			_binding : function infscr_binding(binding) {
				var instance = this,
				opts = instance.options;
				opts.v = '2.0b2.120520';
				if (!!opts.behavior && this['_binding_' + opts.behavior] !== undefined) {
					this['_binding_' + opts.behavior].call(this);
					return;
				}
				if (binding !== 'bind' && binding !== 'unbind') {
					this._debug('Binding value  ' + binding + ' not valid');
					return false;
				}
				if (binding === 'unbind') {
					(this.options.binder).unbind('smartscroll.infscr.' + instance.options.infid);
				} else {
					(this.options.binder)[binding]('smartscroll.infscr.' + instance.options.infid, function () {
						instance.scroll();
					});
				}
				this._debug('Binding', binding);
			},
			_create : function infscr_create(options, callback) {
				var opts = $.extend(true, {}, $.infinitescroll.defaults, options);
				this.options = opts;
				var $window = $(window);
				var instance = this;
				if (!instance._validate(options)) {
					return false;
				}
				var path = $(opts.nextSelector).attr('href');
				if (!path) {
					this._debug('Navigation selector not found');
					return false;
				}
				opts.path = opts.path || this._determinepath(path);
				opts.contentSelector = opts.contentSelector || this.element;
				opts.loading.selector = opts.loading.selector || opts.contentSelector;
				opts.loading.msg = opts.loading.msg || $('<div id="infscr-loading"><img alt="Loading..." src="' + opts.loading.img + '" /><div>' + opts.loading.msgText + '</div></div>');
				(new Image()).src = opts.loading.img;
				if (opts.pixelsFromNavToBottom === undefined) {
					opts.pixelsFromNavToBottom = $(document).height() - $(opts.navSelector).offset().top;
					this._debug('pixelsFromNavToBottom: ' + opts.pixelsFromNavToBottom);
				}
				var self = this;
				opts.loading.start = opts.loading.start || function () {
					$(opts.navSelector).hide();
					opts.loading.msg.appendTo(opts.loading.selector).show(opts.loading.speed, $.proxy(function () {
							this.beginAjax(opts);
						}, self));
				};
				opts.loading.finished = opts.loading.finished || function () {
					if (!opts.state.isBeyondMaxPage)
						opts.loading.msg.fadeOut(opts.loading.speed);
				};
				opts.callback = function (instance, data, url) {
					if (!!opts.behavior && instance['_callback_' + opts.behavior] !== undefined) {
						instance['_callback_' + opts.behavior].call($(opts.contentSelector)[0], data, url);
					}
					if (callback) {
						callback.call($(opts.contentSelector)[0], data, opts, url);
					}
					if (opts.prefill) {
						$window.bind('resize.infinite-scroll', instance._prefill);
					}
				};
				if (options.debug) {
					if (Function.prototype.bind && (typeof console === 'object' || typeof console === 'function') && typeof console.log === 'object') {
						['log', 'info', 'warn', 'error', 'assert', 'dir', 'clear', 'profile', 'profileEnd'].forEach(function (method) {
							console[method] = this.call(console[method], console);
						}, Function.prototype.bind);
					}
				}
				this._setup();
				if (opts.prefill) {
					this._prefill();
				}
				return true;
			},
			_prefill : function infscr_prefill() {
				var instance = this;
				var $window = $(window);
				function needsPrefill() {
					return ($(instance.options.contentSelector).height() <= $window.height());
				}
				this._prefill = function () {
					if (needsPrefill()) {
						instance.scroll();
					}
					$window.bind('resize.infinite-scroll', function () {
						if (needsPrefill()) {
							$window.unbind('resize.infinite-scroll');
							instance.scroll();
						}
					});
				};
				this._prefill();
			},
			_debug : function infscr_debug() {
				if (true !== this.options.debug) {
					return;
				}
				if (typeof console !== 'undefined' && typeof console.log === 'function') {
					if ((Array.prototype.slice.call(arguments)).length === 1 && typeof Array.prototype.slice.call(arguments)[0] === 'string') {
						console.log((Array.prototype.slice.call(arguments)).toString());
					} else {
						console.log(Array.prototype.slice.call(arguments));
					}
				} else if (!Function.prototype.bind && typeof console !== 'undefined' && typeof console.log === 'object') {
					Function.prototype.call.call(console.log, console, Array.prototype.slice.call(arguments));
				}
			},
			_determinepath : function infscr_determinepath(path) {
				var opts = this.options;
				if (!!opts.behavior && this['_determinepath_' + opts.behavior] !== undefined) {
					return this['_determinepath_' + opts.behavior].call(this, path);
				}
				if (!!opts.pathParse) {
					this._debug('pathParse manual');
					return opts.pathParse(path, this.options.state.currPage + 1);
				} else if (path.match(/^(.*?)\b2\b(.*?$)/)) {
					path = path.match(/^(.*?)\b2\b(.*?$)/).slice(1);
				} else if (path.match(/^(.*?)2(.*?$)/)) {
					if (path.match(/^(.*?page=)2(\/.*|$)/)) {
						path = path.match(/^(.*?page=)2(\/.*|$)/).slice(1);
						return path;
					}
					path = path.match(/^(.*?)2(.*?$)/).slice(1);
				} else {
					if (path.match(/^(.*?page=)1(\/.*|$)/)) {
						path = path.match(/^(.*?page=)1(\/.*|$)/).slice(1);
						return path;
					} else {
						this._debug("Sorry, we couldn't parse your Next (Previous Posts) URL. Verify your the css selector points to the correct A tag. If you still get this error: yell, scream, and kindly ask for help at infinite-scroll.com.");
						opts.state.isInvalidPage = true;
					}
				}
				this._debug('determinePath', path);
				return path;
			},
			_error : function infscr_error(xhr) {
				var opts = this.options;
				if (!!opts.behavior && this['_error_' + opts.behavior] !== undefined) {
					this['_error_' + opts.behavior].call(this, xhr);
					return;
				}
				if (xhr !== 'destroy' && xhr !== 'end') {
					xhr = 'unknown';
				}
				this._debug('Error', xhr);
				if (xhr === 'end' || opts.state.isBeyondMaxPage) {
					this._showdonemsg();
				}
				opts.state.isDone = true;
				opts.state.currPage = 1;
				opts.state.isPaused = false;
				opts.state.isBeyondMaxPage = false;
				this._binding('unbind');
			},
			_loadcallback : function infscr_loadcallback(box, data, url) {
				var opts = this.options,
				callback = this.options.callback,
				result = (opts.state.isDone) ? 'done' : (!opts.appendCallback) ? 'no-append' : 'append',
				frag;
				if (!!opts.behavior && this['_loadcallback_' + opts.behavior] !== undefined) {
					this['_loadcallback_' + opts.behavior].call(this, box, data, url);
					return;
				}
				switch (result) {
				case 'done':
					this._showdonemsg();
					return false;
				case 'no-append':
					if (opts.dataType === 'html') {
						data = '<div>' + data + '</div>';
						data = $(data).find(opts.itemSelector);
					}
					if (data.length === 0) {
						return this._error('end');
					}
					break;
				case 'append':
					var children = box.children();
					if (children.length === 0) {
						return this._error('end');
					}
					frag = document.createDocumentFragment();
					while (box[0].firstChild) {
						frag.appendChild(box[0].firstChild);
					}
					this._debug('contentSelector', $(opts.contentSelector)[0]);
					$(opts.contentSelector)[0].appendChild(frag);
					data = children.get();
					break;
				}
				opts.loading.finished.call($(opts.contentSelector)[0], opts);
				if (opts.animate) {
					var scrollTo = $(window).scrollTop() + $(opts.loading.msg).height() + opts.extraScrollPx + 'px';
					$('html,body').animate({
						scrollTop : scrollTo
					}, 800, function () {
						opts.state.isDuringAjax = false;
					});
				}
				if (!opts.animate) {
					opts.state.isDuringAjax = false;
				}
				callback(this, data, url);
				if (opts.prefill) {
					this._prefill();
				}
			},
			_nearbottom : function infscr_nearbottom() {
				var opts = this.options,
				pixelsFromWindowBottomToBottom = 0 + $(document).height() - (opts.binder.scrollTop()) - $(window).height();
				if (!!opts.behavior && this['_nearbottom_' + opts.behavior] !== undefined) {
					return this['_nearbottom_' + opts.behavior].call(this);
				}
				this._debug('math:', pixelsFromWindowBottomToBottom, opts.pixelsFromNavToBottom);
				return (pixelsFromWindowBottomToBottom - opts.bufferPx < opts.pixelsFromNavToBottom);
			},
			_pausing : function infscr_pausing(pause) {
				var opts = this.options;
				if (!!opts.behavior && this['_pausing_' + opts.behavior] !== undefined) {
					this['_pausing_' + opts.behavior].call(this, pause);
					return;
				}
				if (pause !== 'pause' && pause !== 'resume' && pause !== null) {
					this._debug('Invalid argument. Toggling pause value instead');
				}
				pause = (pause && (pause === 'pause' || pause === 'resume')) ? pause : 'toggle';
				switch (pause) {
				case 'pause':
					opts.state.isPaused = true;
					break;
				case 'resume':
					opts.state.isPaused = false;
					break;
				case 'toggle':
					opts.state.isPaused = !opts.state.isPaused;
					break;
				}
				this._debug('Paused', opts.state.isPaused);
				return false;
			},
			_setup : function infscr_setup() {
				var opts = this.options;
				if (!!opts.behavior && this['_setup_' + opts.behavior] !== undefined) {
					this['_setup_' + opts.behavior].call(this);
					return;
				}
				this._binding('bind');
				return false;
			},
			_showdonemsg : function infscr_showdonemsg() {
				var opts = this.options;
				if (!!opts.behavior && this['_showdonemsg_' + opts.behavior] !== undefined) {
					this['_showdonemsg_' + opts.behavior].call(this);
					return;
				}
				opts.loading.msg.find('img').hide().parent().find('div').html(opts.loading.finishedMsg).animate({
					opacity : 1
				}, 2000, function () {});
				opts.errorCallback.call($(opts.contentSelector)[0], 'done');
			},
			_validate : function infscr_validate(opts) {
				for (var key in opts) {
					if (key.indexOf && key.indexOf('Selector') > -1 && $(opts[key]).length === 0) {
						this._debug('Your ' + key + ' found no elements.');
						return false;
					}
				}
				return true;
			},
			bind : function infscr_bind() {
				this._binding('bind');
			},
			destroy : function infscr_destroy() {
				this.options.state.isDestroyed = true;
				this.options.loading.finished();
				return this._error('destroy');
			},
			pause : function infscr_pause() {
				this._pausing('pause');
			},
			resume : function infscr_resume() {
				this._pausing('resume');
			},
			beginAjax : function infscr_ajax(opts) {
				var instance = this,
				path = opts.path,
				box,
				desturl,
				method,
				condition;
				opts.state.currPage++;
				if (opts.maxPage !== undefined && opts.state.currPage > opts.maxPage) {
					opts.state.isBeyondMaxPage = true;
					this.destroy();
					return;
				}
				box = $(opts.contentSelector).is('table, tbody') ? $('<tbody/>') : $('<div/>');
				desturl = (typeof path === 'function') ? path(opts.state.currPage) : path.join(opts.state.currPage);
				instance._debug('heading into ajax', desturl);
				method = (opts.dataType === 'html' || opts.dataType === 'json') ? opts.dataType : 'html+callback';
				if (opts.appendCallback && opts.dataType === 'html') {
					method += '+callback';
				}
				switch (method) {
				case 'html+callback':
					instance._debug('Using HTML via .load() method');
					box.load(desturl + ' ' + opts.itemSelector, undefined, function infscr_ajax_callback(responseText) {
						instance._loadcallback(box, responseText, desturl);
					});
					break;
				case 'html':
					instance._debug('Using ' + (method.toUpperCase()) + ' via $.ajax() method');
					$.ajax({
						url : desturl,
						dataType : opts.dataType,
						complete : function infscr_ajax_callback(jqXHR, textStatus) {
							condition = (typeof(jqXHR.isResolved) !== 'undefined') ? (jqXHR.isResolved()) : (textStatus === 'success' || textStatus === 'notmodified');
							if (condition) {
								instance._loadcallback(box, jqXHR.responseText, desturl);
							} else {
								instance._error('end');
							}
						}
					});
					break;
				case 'json':
					instance._debug('Using ' + (method.toUpperCase()) + ' via $.ajax() method');
					$.ajax({
						dataType : 'json',
						type : 'GET',
						url : desturl,
						success : function (data, textStatus, jqXHR) {
							condition = (typeof(jqXHR.isResolved) !== 'undefined') ? (jqXHR.isResolved()) : (textStatus === 'success' || textStatus === 'notmodified');
							if (opts.appendCallback) {
								if (opts.template !== undefined) {
									var theData = opts.template(data);
									box.append(theData);
									if (condition) {
										instance._loadcallback(box, theData);
									} else {
										instance._error('end');
									}
								} else {
									instance._debug('template must be defined.');
									instance._error('end');
								}
							} else {
								if (condition) {
									instance._loadcallback(box, data, desturl);
								} else {
									instance._error('end');
								}
							}
						},
						error : function () {
							instance._debug('JSON ajax request failed.');
							instance._error('end');
						}
					});
					break;
				}
			},
			retrieve : function infscr_retrieve(pageNum) {
				pageNum = pageNum || null;
				var instance = this,
				opts = instance.options;
				if (!!opts.behavior && this['retrieve_' + opts.behavior] !== undefined) {
					this['retrieve_' + opts.behavior].call(this, pageNum);
					return;
				}
				if (opts.state.isDestroyed) {
					this._debug('Instance is destroyed');
					return false;
				}
				opts.state.isDuringAjax = true;
				opts.loading.start.call($(opts.contentSelector)[0], opts);
			},
			scroll : function infscr_scroll() {
				var opts = this.options,
				state = opts.state;
				if (!!opts.behavior && this['scroll_' + opts.behavior] !== undefined) {
					this['scroll_' + opts.behavior].call(this);
					return;
				}
				if (state.isDuringAjax || state.isInvalidPage || state.isDone || state.isDestroyed || state.isPaused) {
					return;
				}
				if (!this._nearbottom()) {
					return;
				}
				this.retrieve();
			},
			toggle : function infscr_toggle() {
				this._pausing();
			},
			unbind : function infscr_unbind() {
				this._binding('unbind');
			},
			update : function infscr_options(key) {
				if ($.isPlainObject(key)) {
					this.options = $.extend(true, this.options, key);
				}
			}
		};
		$.fn.infinitescroll = function infscr_init(options, callback) {
			var thisCall = typeof options;
			switch (thisCall) {
			case 'string':
				var args = Array.prototype.slice.call(arguments, 1);
				this.each(function () {
					var instance = $.data(this, 'infinitescroll');
					if (!instance) {
						return false;
					}
					if (!$.isFunction(instance[options]) || options.charAt(0) === '_') {
						return false;
					}
					instance[options].apply(instance, args);
				});
				break;
			case 'object':
				this.each(function () {
					var instance = $.data(this, 'infinitescroll');
					if (instance) {
						instance.update(options);
					} else {
						instance = new $.infinitescroll(options, callback, this);
						if (!instance.failed) {
							$.data(this, 'infinitescroll', instance);
						}
					}
				});
				break;
			}
			return this;
		};
		var event = $.event,
		scrollTimeout;
		event.special.smartscroll = {
			setup : function () {
				$(this).bind('scroll', event.special.smartscroll.handler);
			},
			teardown : function () {
				$(this).unbind('scroll', event.special.smartscroll.handler);
			},
			handler : function (event, execAsap) {
				var context = this,
				args = arguments;
				event.type = 'smartscroll';
				if (scrollTimeout) {
					clearTimeout(scrollTimeout);
				}
				scrollTimeout = setTimeout(function () {
						$(context).trigger('smartscroll', args);
					}, execAsap === 'execAsap' ? 0 : 100);
			}
		};
		$.fn.smartscroll = function (fn) {
			return fn ? this.bind('smartscroll', fn) : this.trigger('smartscroll', ['execAsap']);
		};
	}));
	

