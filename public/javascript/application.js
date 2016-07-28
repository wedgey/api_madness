$(function() {
  function addRow(city) {
    var tr = $('<tr>').attr("data-id", city.l);
    var td = $('<td>');
    return tr.append(td.text(city.name));
  }

  function showDetails(city) {
    $('#weatherDetails .modal-body').empty();
    var weather = $('<img>').attr("src", city.current_observation.icon_url);
    var feelslike = $('<p>').html("Feels like: " + city.current_observation.feelslike_c + "&deg;C" + " (" + city.current_observation.feelslike_f + "&deg;F)");

    $('#weatherDetails .modal-body').append(weather);
  }

  $('form').on('submit', function() {
    event.preventDefault();
    $.ajax({
      url: 'http://autocomplete.wunderground.com/aq',
      data: $(this).serialize(),
      dataType: 'jsonp',
      jsonp: 'cb',
      success: function(data) {
        console.log(data);
        $('table.cities-table tbody').empty();
        data.RESULTS.forEach(function(city) {
          $('table.cities-table tbody').append(addRow(city));
        })
      }
    });
  });

  $('table.cities-table tbody').on('click', 'tr', function() {
    $.ajax({
      url: 'http://api.wunderground.com/api/056622f3af68a07a/conditions' + $(this).attr("data-id") + ".json",
      dataType: 'jsonp',
      success: function(data) {
        console.log(data);
        // var feelslike = $('<p>').html("Feels like: " + data.current_observation.feelslike_c + "&deg;C" + " (" + data.current_observation.feelslike_f + "&deg;F)");
        // var weather = $('<p>').html("Current weather: " + data.current_observation.weather);
        // var uv = $('<p>').html("UV: " + data.current_observation.UV);
        // $('#weatherDetails-label').text(data.current_observation.display_location.full);
        // $('#weatherDetails .modal-body').append(feelslike);
        // $('#weatherDetails .modal-body').append(weather);
        // $('#weatherDetails .modal-body').append(uv);
        showDetails(data);
        $('#weatherDetails').modal('toggle');
      }
    });
  });
});