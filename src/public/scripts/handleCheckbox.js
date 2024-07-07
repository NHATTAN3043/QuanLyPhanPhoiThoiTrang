function handleCheckbox(options){
    var checkboxAll = $(options.checkboxAll)
    var checkboxItem = $(options.checkboxItem)
    var btnSubmitAction = $(options.btnSubmitAction)

     // handle when checkboxAll change
     checkboxAll.change(function() {
        var isCheckedAll = $(this).prop('checked')
        checkboxItem.prop('checked', isCheckedAll)
        validateCheckboxToSubmit()
      })
      // handle when checkboxItem change
      checkboxItem.change(function() {
        var isCheckedAll = checkboxItem.length === $('input[name="maphieunhaps[]"]:checked').length
        checkboxAll.prop('checked', isCheckedAll)
        validateCheckboxToSubmit()
      })
      // handle disable btn submit 
      function validateCheckboxToSubmit() {
        var countChecked = $('input[name="maphieunhaps[]"]:checked').length
        if (countChecked > 0) {
          btnSubmitAction.attr('disabled', false)
        }else{
          btnSubmitAction.attr('disabled', true)
        }
      }
}