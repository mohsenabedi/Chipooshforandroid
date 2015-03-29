var app = {

	init: function() {
		console.log('app.init');
		var hash = window.location.hash.replace(/^.*?#/,'');

		if (hash == '') {
			app.getPosts();
		}

		$('.app-menu a').on('click', app.menus);

	},

	getPosts: function() {
		console.log('app.getPosts');
		var rootURL = 'http://chipoosh.com/wp-json';

		$.ajax({
			type: 'GET',
			url: rootURL + '/posts',
			dataType: 'json',
			success: function(data){
				$.each(data, function(index, value) {
					
			      $('ul.topcoat-list').append('<li class="topcoat-list__item">' +
			      	'<h3>'+value.title+'</h3>' +
			      	'<p>'+value.content+'</p></li>');
			    });
			},
			error: function(error){
				console.log(error);
			}

		});

	},

	getSinglePost: function(postID) {
		console.log('getSinglePost');

		var rootURL = 'http://chipoosh.com/wp-json';

		$.ajax({
			type: 'GET',
			url: rootURL + '/posts/' + '?p=2020' ,
			dataType: 'json',
			success: function(data){
				console.log(data);
				$('.single-post .title').append(data.title);
				$('.single-post .content').append(data.content);

			},
			error: function(error){
				console.log(error);
			}

		});

	},

	route: function(event) {
		var homePage =
    		'<div class="home"><ul class="topcoat-list"></ul></div>';

		var singlePost =
		    '<div><article class="single-post">' +
		    '<h2 class="title"></h2>' +
		    '<div class="content"></div>' +
		    '</article></div>';

		var samplePage = 
			'<div><article class="static-page">' +
			'<p>Static Page Content</p>' +
			'</article></div>';

		var page,
        hash = window.location.hash.replace(/^.*?#/,'');
        console.log(hash);

        /* If the hash is sample, show the samplePage. If it's anything else, load the singlePost view, otherwise it's the homePage */

        if (hash == 'sample') {
        	page = samplePage;
        } else if (hash != '') {
        	page = singlePost;
        	app.getSinglePost(hash);
        } else {
        	console.log('home page');
    		page = homePage;
    		app.init();
    	}

    	slider.slidePage($(page));
	},

	menus: function(event) {

		// Close the slide panel if a menu button is clicked
		$('.js-app-container').removeClass('slideIn').addClass('slideOut');

	}

}

var slider = new PageSlider($("#container"));

$(window).on('hashchange', app.route);

app.route();