
$(function () {

    // 表单验证
    $('.form-horizontal').validate({
        onFocus: function() {
            //$(this).addClass('active');
        return false;
        },
        onBlur: function() {
            var $parent = this.parents('.form-group');
            var _status = parseInt(this.attr('data-status'));
           // $parent.removeClass('active');
            if (!_status) {
                $parent.addClass('has-error');
            }else{
                $parent.removeClass('has-error');
            }
            return false;
        }
    });
    $('.form-horizontal').on('submit', function(event) {
         if(!$(this).validate('submitValidate')){
            var $formGroup = $('.error .required').parents('.form-group');
            $formGroup.addClass('has-error');
            return false;
        }
    });



   var i = -1;
    //添加年份，从1910年开始
    for (i = 1910; i <= new Date().getFullYear(); i++) {
       addOption(FormDate.Year, i, i - 1909);
      //默认选中1988年
      if (i == 1988) {
           FormDate.Year.options[i-1910].selected = true;
        }
   }
    //添加月份
   for (i = 1; i <= 12; i++) {
       addOption(FormDate.Month, i, i);
    }
    //添加天份，先默认31天
    for (i = 1; i <= 31; i++) {
        addOption(FormDate.Day, i, i);
    }
});



 //设置每个月份的天数
function setDays(year, month,day) {
    var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var yea = year.options[year.selectedIndex].text;
    var mon = month.options[month.selectedIndex].text;
    var num = monthDays[mon - 1];
    if (mon == 2 && isLeapYear(yea)) {
        num++;
    }
    for (var i = day.options.length - 1; i >=num; i--) {
        day.remove(i);
    }
    for (var i = 1; i <= num; i++) {
       addOption(FormDate.Day,i,i);
    }
}

//判断是否闰年
function isLeapYear(year){
   return (year % 4 == 0 || (year % 100 == 0 && year % 400 == 0));
}

//向select尾部添加option
function addOption(selectbox, text, value) {
    var option = document.createElement("option");
    option.text = text;
    option.value = text;
    selectbox.options.add(option);
}
