$(function(){

  function buildHTML(message){
      var addImage = '';
    if (message.image.url) {
      addImage = `<img src="${message.image.url}" class="lower-message__image">`;
    }
    var html = `<div class = "message" data-id=${message.id}>
                  <div class = "upper-message">
                    <div class = "upper-message__user-name">
                      ${message.user_name}
                    </div>
                    <div class = "upper-message__date">
                      ${message.date}
                    </div>
                  </div>
                  <div class = "lower-message">
                    <div class = "lower-message__content">
                      ${message.content}
                    </div>
                    ${addImage}
                  </div>
                </div>`
    return html;
  }
  //非同期通信
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    e.stopPropagation();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat__messages').append(html);
      $('.form__message').val('');
    })
    .fail(function(){
      alert('投稿できませんでした');
    });
    return false
  });
  // 自動更新
  $(function() {
    $(function() {
      if (location.pathname.match(/\/groups\/\d+\/messages/)){
        setInterval(update, 5000);
      }
    });
    function update(){
      if($('.message')[0]){
        var message_id = $('.message:last').data('id');
      }
       else {
        clearInterval();
      }
console.log(message_id)
      $.ajax({
        url: location.href,
        type: 'GET',
        data: { id: message_id },
        dataType: 'json'
      })

      .done(function(data){
        console.log(data)
        if (data.length){
        $.each(data, function(i, data){
          var html = buildHTML(data);
          $('.chat__messages').append(html)
          console.log(html)
        })
      }
      })
      .fail(function(){
        alert('自動更新に失敗しました')
      })
    }
  });

  // var interval = setInterval(function() {
  //     if (location.href.match(/\/groups\/\d+\/messages/)){
  //       var message_id = $('.chat__message').last().data('id');
  //       $.ajax({
  //         url: location.href,
  //         type: "GET",
  //         data: {id: message_id},
  //         dataType: "json"
  //       })
  //       .done(function(data) {
  //         data.forEach(function(message) {
  //           var html = buildHTML(message);
  //           $('.chat__messages').append(html);
  //           $(".chat").animate({scrollTop:$('.chat__messages')[0].scrollHeight});
  //           $('.new_message .message').val('');
  //         })
  //       })
  //       .fail(function() {
  //         alert('自動更新に失敗しました');
  //       });
  //     } else {
  //         clearInterval(interval);
  //       }
  //   } , 5000 );

  // if (window.location.href.match(/\/groups\/\d+\/messages/)){
  //      setInterval(autoUpdate,5000)
  // };
  //
  // function autoUpdate() {
  //   var href = window.location.href;
  //   var message_id = $('.chat__messages').last().data('id');
  //   // var lastId = $('.message').last().attr('data-messageid');
  //
  //   $.ajax({
  //     url: href,
  //     data: {id: message_id},
  //     dataType:'json',
  //     type:'GET',
  //   })
  //
  //   .done(function(data) {
  //      data.messages.forEach(function(message){
  //        if (message.id > message_id){
  //          var html = addNewMessagesHTML(message);
  //          $('.chat__messages').append(html);
  //          $('.chat').animate({scrollTop: $('.chat__messages')[0].scrollHeight}, 'fast');
  //        };
  //      });
  //   })
  //   .fail(function(){
  //     alert('メッセージの取得に失敗しました');
  //   });
  // };

});
