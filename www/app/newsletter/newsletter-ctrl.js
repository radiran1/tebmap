(function () {
  'use strict';
  angular.module('tebmap').controller('NewsletterCtrl', ['$cordovaDialogs', '$scope', 'tebmapApi', NewsletterCtrl]);
  function NewsletterCtrl($cordovaDialogs, $scope, tebmapApi) {
    var self = this;
    self.Email = "";
    self.NewsletterIds = [];

    $scope.newsletters = [
      { Id: 1, Image: "../img/newlettericon5.jpg" },
      { Id: 2, Image: "../img/newlettericon2.jpg" },
      { Id: 7, Image: "../img/newlettericon6.jpg" },
      { Id: 3, Image: "../img/newlettericon1.jpg" },
      { Id: 8, Image: "../img/newlettericon3.jpg" },
      { Id: 9, Image: "../img/newlettericon4.jpg" }
    ];

    self.NewsletterRequest = function (newsletter) {
      if (newsletter.length == 0) {
        $cordovaDialogs.alert("حداقل یک خبرنامه باید انتخاب گردد.", "خطا", "بستن");
      } else if (!self.Email.trim()) {
        $cordovaDialogs.alert("ایمیل نباید خالی باشد.", "خطا", "بستن");
      } else if (newsletter.length > 0 && self.Email.trim()) {
        for (var i = 0; i < newsletter.length; i++) {
          self.NewsletterIds.push(newsletter[i].Id);
        }
        tebmapApi.AddorUpdateSubscriber(self).then(function (data) {
          self.StatusCode = data.AppResponse.StatusCode;
          if (self.StatusCode == -1) {
            $cordovaDialogs.alert("درخواست شما نباید خالی باشد", "خطا", "بستن");
          } else if (self.StatusCode == -2) {
            $cordovaDialogs.alert("کلید وارد شده معتبر نمی باشد", "خطا", "بستن ");
          }
          else if (self.StatusCode == -3) {
            $cordovaDialogs.alert("ایمیل نباید خالی باشد.", "خطا", "بستن");
          }
          else if (self.StatusCode == -4) {
            $cordovaDialogs.alert("حداقل یک خبرنامه باید انتخاب گردد.", "خطا", "بستن");
          }
          else if (self.StatusCode == -5) {
            $cordovaDialogs.alert("ایمیل وارد شده معتبر نمی باشد .", "خطا", "بستن");
          }
          else if (self.StatusCode == -6) {
            $cordovaDialogs.alert("لطفا جهت اطمینان از خدمت رسانی سایت الو دکتر از ایمیل های (یاهو) و (جیمیل) و یا (هات میل) استفاده نمایید.با تشکر", "خطا", "بستن");
          }
          else if (self.StatusCode == -7) {
            $cordovaDialogs.alert("کاربر گرامی شما قبلا عضو خبرنامه ما بوده اید .", "خطا", "بستن");
          }
          else if (self.StatusCode == -8) {
            $cordovaDialogs.alert("متاسفانه خطایی در ارسال ایمیل رخ داده است", "خطا", "بستن");
          }
          else if (self.StatusCode == 0 || self.StatusCode == 1) {
            for (var i = 0; i < newsletter.length; i++) {
              newsletter[i].selected = false;
            }
            self.Email = "";
            $cordovaDialogs.alert("عضویت شما با موفقیت انجام شد.با تشکر", "پیام", "بستن");
          }
        });
      }
    };
  }
})();
