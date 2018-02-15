// Commenting system
var endpoints = {
  base: window.location.pathname + '/comments'
}

function getComments(cb) {
  $.get(base, cb).body;
}

function postComment(message, cb) {
  $.post(base, { comment: message }, cb);
}
