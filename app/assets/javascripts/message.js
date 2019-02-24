$(function(){

  function buildSendMessageHTML(message){

      addImage = message.image.url ? `<img src=${message.image.url} class="lower-message__image">` : "";

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
  $('#new_message').on('submit', function(e){ //new_messageが送信されたらe変数のアクションを起こす
    e.preventDefault();　// 非同期通信でメッセージの投稿を行いたいため、通常の動作を停止。
    var formData = new FormData(this);//fromDataはfromの情報を取得するのに使う
    var url = $(this).attr('action');//attrメソッドは要素がもつ指定の属性の値を返す、指定してないとunderfinedを返す、今回はイベントが発生した要素のaction属性の値を取得してるのでフォームの送信先のurlの値が入っている
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){ //非同期通信の結果として返ってくるデータは、done(function(data) { 処理 })の関数の引数で受け取る
      var html = buildSendMessageHTML(data);//このdataはサーバーから返されたcreate.json.jbuider
      $('.chat__messages').append(html);
      $('.new_message')[0].reset()// .doneからここまでで、テキストとファイルを投稿&テキスト入力欄をクリア。
    })
    .fail(function(){ //エラーの場合はfail関数が呼ばれるfail(function(){処理})
      alert('投稿できませんでした');
    });
    return false;
  });

  // 自動更新
  if (location.pathname.match(/\/groups\/\d+\/messages/)){
    setInterval(update, 5000);
  }

  function update(){
    if($('.message')[0]){
      var message_id = $('.message:last').data('id');

      $.ajax({
        url: location.href,
        type: 'GET',
        data: { id: message_id },
        dataType: 'json'
      })

      .done(function(data){
        console.log(data)
        if (data.length){
          $.each(data, function(data){
          var html = buildHTML(data);
          $('.chat__messages').append(html);
          })
        }
      })
      .fail(function(){
        alert('自動更新に失敗しました')
      });
    }
    else {
      clearInterval();
    }
  }
});
