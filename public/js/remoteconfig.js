var remoteConfig;
var cachedContent = []
var refreshContent = function() {

		// $('#home_title_1').hide();
		// $('#home_message_1').hide();
		// $('#home_link_1').hide();
		// $('#home_title_2').hide();
		// $('#home_message_2').hide();
		// $('#home_link_2').hide();
		// $('#home_title_3').hide();
		// $('#home_message_3').hide();
		// $('#home_link_3').hide();

		remoteConfig.ensureInitialized().then(function(){
      console.log('refreshing');
			var home_title_1 = remoteConfig.getValue('home_title_1')._value
			var home_message_1 = remoteConfig.getValue('home_message_1')._value
			var home_button_text_1 = remoteConfig.getValue('home_button_text_1')._value
			var home_link_1 = remoteConfig.getValue('home_link_1')._value

			var home_title_2 = remoteConfig.getValue('home_title_2')._value
			console.log(home_title_2);
			var home_message_2 = remoteConfig.getValue('home_message_2')._value
			var home_button_text_2 = remoteConfig.getValue('home_button_text_2')._value
			var home_link_2 = remoteConfig.getValue('home_link_2')._value


			var home_title_3 = remoteConfig.getValue('home_title_3')._value
			console.log(home_title_3);
			var home_message_3 = remoteConfig.getValue('home_message_3')._value
			var home_button_text_3 = remoteConfig.getValue('home_button_text_3')._value
			var home_link_3 = remoteConfig.getValue('home_link_3')._value

      cachedContent = {2: {'title' : home_title_1, 'message' : home_message_1,
      'button_text': home_button_text_1, 'link' : home_link_1},
      0 : {'title' : home_title_2, 'message' : home_message_2,
      'button_text': home_button_text_2, 'link' : home_link_2},
      1 : {'title' : home_title_3, 'message' : home_message_3,
      'button_text': home_button_text_3, 'link' : home_link_3},
      };

			$('#home_title_1').text(home_title_1);
			$('#home_message_1').text(home_message_1);
			$('#home_link_1').text(home_button_text_1);
			$('#home_link_1').attr('href', home_link_1);

			$('#home_title_2').text(home_title_2);
			$('#home_message_2').text(home_message_2);
			$('#home_link_2').text(home_button_text_2);
			$('#home_link_2').attr('href', home_link_2);

			$('#home_title_3').text(home_title_3);
			$('#home_message_3').text(home_message_3);
			$('#home_link_3').text(home_button_text_3);
			$('#home_link_3').attr('href', home_link_3);

      var owl = $('.owl-carousel');
      owl.trigger('initialized.owl.carousel');
		});


		// $('#home_title_1').show();
		// $('#home_message_1').show();
		// $('#home_link_1').show();
		// $('#home_title_2').show();
		// $('#home_message_2').show();
		// $('#home_link_2').show();
		// $('#home_title_3').show();
		// $('#home_message_3').show();
		// $('#home_link_3').show();
}
var pullRemoteConfig = function() {
	var firebaseConfig = {
		apiKey: "AIzaSyAX-rT9D3CctHIXKvU2d_inbG4r-XOVcp8",
		authDomain: "uplift-385d4.firebaseapp.com",
		databaseURL: "https://uplift-385d4.firebaseio.com",
		projectId: "uplift-385d4",
		storageBucket: "uplift-385d4.appspot.com",
		messagingSenderId: "77939912494",
		appId: "1:77939912494:web:1e26a3f7e327205da0d4bf"
	};

	// Initialize Firebase
	firebase.initializeApp(firebaseConfig);

	remoteConfig = firebase.remoteConfig();
		remoteConfig.settings = {
			minimumFetchIntervalMillis: 360000,
      fetchTimeoutMillis: 360000
	};
  remoteConfig.fetchAndActivate()
  .then(() => {
    refreshContent();
  })
};

$(document).ready(function(){
  console.log('load');
  pullRemoteConfig();

  var owl = $('.owl-carousel');
  owl.on('initialized.owl.carousel changed.owl.carousel',function(elem){
    var current = elem.item.index;
    console.log(current);
    var pos = elem.relatedTarget.normalize(elem.item.index, true);
    console.log(pos);
    var data = cachedContent[String(pos)];
    console.log(data);
    $(elem.target).find(".fh5co-lead").eq(current).text(data['title']);
    $(elem.target).find(".fh5co-sub-lead").eq(current).text(data['message']);
    $(elem.target).find(".btn").eq(current).text(data['button_text']);
    $(elem.target).find(".btn").eq(current).attr('href', data['link']);
  });
});
