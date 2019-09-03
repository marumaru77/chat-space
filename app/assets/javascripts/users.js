$(document).on('turbolinks:load', function(){
  var search_list = $("#user-search-result");
  var member_list = $("#member-search-result");
  
  function appendUser(name, user_id) {
     var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user_id}" data-user-name="${name}">追加</div>
                 </div>` 
       search_list.append(html);
     
  }

  function appendErrMsgToHTML() {
    var html = `<div clearfix">
                  一致するユーザーは居ませんでござる
                </div>`
      search_list.append(html);
  }

  function appendMembers(name, user_id) {
    var html = `<div class="chat-group-user clearfix">
                  <input name='group[user_ids][]' class="select_user_add" type='hidden' value='${user_id}'>
                  <p class="chat-group-user__name">${name}</p>
                  <div class="user-search-remove chat-group-user__btn chat-group-user__btn--add" data-user-id="${user_id}" data-user-name="${name}">削除</div>
                </div>`
      member_list.append(html);
  }
  
  $("#user-search-field").on("keyup", function() {
    var add_user_ids = [0];
    $('.select_user_add').each(function(){
      add_user_ids.push($(this).val());
    })
    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { 
        keyword: input,
        'user_ids[]': add_user_ids
      },
      dataType: 'json'
    })
    .done(function(users) {
        $("#user-search-result").empty();
      if (users.length !== 0 && input.length !== 0) {
        users.forEach(function(user){
          var name = user.name
          var user_id = user.id
            appendUser(name, user_id);
        });
      }
      else {
        appendErrMsgToHTML();
      }    
    })
    .fail(function(){
      alert('ユーザー検索に失敗しました');
    })
  });

    $('#user-search-result').on("click", '.user-search-add', function () {
        var name = $(this).attr("data-user-name");
        var user_id = $(this).attr("data-user-id");
        $(this).parent().remove();
        appendMembers(name, user_id);
    });
    $('#member-search-result').on("click", '.user-search-remove', function () {
        var name = $(this).attr("data-user-name");
        var user_id = $(this).attr("data-user-id");
        $(this).parent().remove();
        appendUser(name, user_id);
    });
});

