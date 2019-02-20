$(function() {

  var search_list = $("#user-search-result");

  function appendUserName(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`
    search_list.append(html);
  }

  function appendNoUserName(fail_comment) {
    var html = `<p>
                  <div class="chat-group-user__name'>${fail_comment}</div>
                </p>`
    search_list.append(html);
  }

  $("#user-search-field").on("keyup", function(e) {//user-search-fieldでキーが入力される度に
    var input = $("#user-search-field").val();//user-search-fieldの内容をinputに代入する
    e.preventDefault();//非同期通信でイベントを行いたいため、通常の動作を停止。

    if(input!==""){
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { name: input },
        dataType: 'json'
      })
      // console.log(input)
      .done(function(users){
        if (users.length !== 0){　//usersの中身の数だけappendUserName関数を呼び出す
          users.forEach(function(user){ //forEach は、与えられた関数を配列に含まれる各要素に対して一度ずつ呼び出す
            appendUserName(user);
          });
        }
        else {
          appendNoUserName("一致する名前はありません") //usersがからの場合appendNoUserName("一致する名前はありません")を返す
        }
      })

      .fail(function() {
        alert('名前検索に失敗しました');
      })

    }
  });

  var search_list_add = $("#chat-group-users");

  function appendUserNameAdd(user_name, user_id) {
     var html =`<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                  <p class='chat-group-user__name'>${user_name}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
      search_list_add.append(html);
  }

  $("#user-search-result").on("click", ".chat-group-user__btn--add", function () {
    var user_name = $(this).data("user-name");
    var user_id = $(this).data("user-id");
    appendUserNameAdd(user_name, user_id);
    $(this).parent().remove();
  });

  $("#chat-group-users").on("click", ".js-remove-btn", function () {
    $(this).parent().remove();
  });

});



$(function() {
// 以下、検索結果の表示に関する記述
  function insertHTML(user) {
    var html = `
      <div class="chat-group-form__chat-group-user search">
        <p class="chat-group-form__chat-group-user__name">
          ${user.name}
        </p>
        <a id= "add_btn" class="chat-group-form__chat-group-user__btn" data-user-name="${user.name}" data-user-id="${user.id}">
          <p class="chat-group-form__chat-group-user__btn--add">追加</p>
        </a>
      </div>
      `
    return html;
  }
// 以下、追加されたチャットメンバー欄の表示に関する記述
  function addUserHTML(user_name, user_id){
    var html = `
      <div class="chat-group-form__chat-group-user">
        <input value="${user_id}" type="hidden" name="group[user_ids][]" id="group_user_ids_${user_id}">
        <p class="chat-group-form__chat-group-user__name">
          ${user_name}
        </p>
        <a id="remove_btn" class="chat-group-form__chat-group-user__btn">
          <p class="chat-group-form__chat-group-user__btn--remove">削除</p>
        </a>
      <div>
      `
    return html;
  }

// 以下、user検索欄に入力後の挙動に関する記述
  $('#user-search-field').on('keyup', function(e) {
    var input = $.trim($(this).val());
    $.ajax({
      type: 'GET',
      url: '/users.json',
      data: { name: input }
    })

    .then(function(users) {
        $(".search").remove();
          users.forEach(function(user){
            if ( String(user.id) !== $("#group_user_ids_" + user.id).val() ) {
              var html = insertHTML(user);
              $('#user-search-result').append(html);
            }
          });
        // 以下、検索欄が空の時に検索結果を削除するための記述
        if(input.length == 0){
          $(".search").remove();
        }
    })
  });

// 以下、追加ボタンの挙動に関する記述
  $('#user-search-result').on('click', '#add_btn', function(e) {
    var user_name =  $(this).data('userName'),
        user_id =  $(this).data('userId'),
        html = addUserHTML(user_name, user_id);
        $('#user-add-result').append(html);
    $(this).parent().remove();
  })

// 以下、削除ボタンの挙動に関する記述
  $('#user-add-result').on('click', '#remove_btn', function(e) {
    $(this).parent().remove();
  })
});
