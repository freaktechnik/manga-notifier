function saveOptions(e) {
  e.preventDefault();
  browser.storage.local.set({
    data: {
      frequency: $("#interval").children(":selected").attr("value"),
      mangaTags: $('#chips').material_chip('data')
    }
  });
  document.getElementById('frequencynot').innerText = "Current Frequency for checking: " + $("#interval").children(":selected").attr("value") + " hour(s)";
  Materialize.toast('Changes saved successfully!', 4000)
}

function restoreOptions() {

  function setCurrentChoice(result) {
    console.log(result.data.frequency);
    document.getElementById('interval').value = result.data.frequency || 1;
    $("#interval").val(result.data.frequency || 1).trigger('change');
    document.getElementById('frequencynot').innerText = "Current Frequency for checking: " + (result.data.frequency || 1) + " hour(s)";
    $('#chips').material_chip({
      placeholder: 'Enter a tag',
      limit: Infinity,
      minLength: 1,
      data: result.data.mangaTags
    });
    console.log(result.data.mangaTags);
  }

  function onError(error) {
    console.log(`Error: ${error}`);
    Materialize.toast(`Error: ${error}`, 4000)
  }

  var getting = browser.storage.local.get("data");
  getting.then(setCurrentChoice, onError);
}

function formatState(state) {
  if (!state.id) {
    return state.text;
  }
  var $state = $(
    '<span>' + state.text + '</span>'
  );
  console.log(state.text);
  return $state;
};
$('.js-example-basic-single').select2({
  templateSelection: formatState
});
$('.chips').material_chip({
  placeholder: 'Enter a tag',
  limit: Infinity,
  minLength: 1
});
document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
(function ($) {
  $(function () {

    $('.button-collapse').sideNav();

  }); // end of document ready
})(jQuery);
