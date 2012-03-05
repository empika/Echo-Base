$(document).ready(function() {
  var defaults = {
    api_key: '',
    api_host: 'developer.echonest.com',
    api_path: '/api/',
    api_version: 'v4'
  };
  
  
  
  // song search
  $("form.form-inline.search button").click(function(){
    // Get some search results
    // First build our URL
    // http://developer.echonest.com/api/v4/song/search?api_key=%7B%7Bkey%7D%7D&name=radiohead
    // https://developer.echonest.com/api/4/song/search?api_key=OQDJ2RGKE4AHS3RZI&combined=D+Train+Keep+giving+me+love
    var opts = $.extend(true, defaults, config);
    var url = 'http://' + opts.api_host + opts.api_path + opts.api_version + '/song/search';
    var artist = $("form.form-inline.search input#artist").attr('value');
    var title = $("form.form-inline.search input#title").attr('value');
    var send_data = {
      api_key: opts.api_key,
      artist: artist,
      title: title,
      results: 100
    };
    $.getJSON(url, send_data, function(data) {
      template_html = _.template($('#results-table').html(), {
        query: artist + " - " + title,
        songs: data.response.songs
      });
      $('#results div').html(template_html);
      attach_td_a_events();
    });
    
    return false;
  });
  
  var attach_td_a_events = function(){
    // song info
    $('tr a').click(function(){
      var opts = $.extend(true, defaults, config);
      var url = 'http://' + opts.api_host + opts.api_path + opts.api_version + '/song/profile';
      var query = $("form.form-inline.search input").attr('value');
      var send_data = {
        api_key: opts.api_key,
        id: $(this).data('id'),
        bucket: 'audio_summary'
      };
      $.getJSON(url, send_data, function(data) {
        template_html = _.template($('#song-profile-table').html(), {
          song: data.response.songs[0]
        });
        $('#results div').html(template_html);
      });
      return false;
    });
  }
});