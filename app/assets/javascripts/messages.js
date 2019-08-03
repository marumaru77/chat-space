$(function(){
  function buildHTML(message){
    var img = message.image ? `<img src= ${message.image}>` : "";
    var html = `<div class="message">
                  <div class="message__upper-info">
                    <div class="message__upper-info__talker">${message.user_name}</div>
                    <div class="message__upper-info__date">${message.created_at}</div>
                  </div>
                  <div class="message__text">
                    <p class="lower-message__content">${message.content}</p>
                    ${img}
                  </div>
                </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);
      $('.messages').append(html);
      $('#new_message.new_message')[0].reset();
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight},500);
    })
    
    .fail(function(){
      alert('エラーが発生しメッセージが送信できませんでした。');
    })
  
  })
})