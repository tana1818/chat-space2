$(function(){

  function buildHTML(message){

      addImage = message.image.url ? `<img src="${message.image.url}" class="lower-message__image">` : "";

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
      $.ajax({
        url: location.href,
        type: 'GET',
        data: { id: message_id },
        dataType: 'json'
      })

      .done(function(data){
        if (data.length){
        $.each(data, function(i, data){
          var html = buildHTML(data);
          $('.chat__messages').append(html)
          $('.chat__form')[0].reset();
        })
      }
      })
      .fail(function(){
        alert('自動更新に失敗しました')
      })
    }
  });
});
