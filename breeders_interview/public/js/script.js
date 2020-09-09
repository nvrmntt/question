$(document).ready(function() {
  $cbx_group = $("input:checkbox[name='option[]']");
  $cbx_group = $("input:checkbox[id^='option-']"); // name is not always helpful ;)

  $cbx_group.prop('required', true);
  if($cbx_group.is(":checked")){
    $cbx_group.prop('required', false);
  }
});


/*
$(':input[type="checkbox"]').on('change', submitDisabled);

function submitDisabled() {
  $cbx_group = $("input:checkbox[name='question-15']");

  $cbx_group.prop('required', true);
  if($cbx_group.is(":checked")){
    $cbx_group.prop('required', false);
  }
}*/
