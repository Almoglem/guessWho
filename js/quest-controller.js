'use strict';

// NOTE: This is a global used only in the controller
var gLastRes = null;


$(document).ready(init);
$('.btn-start').click(onStartGuessing);
$('.btn-yes').click({ ans: 'yes' }, onUserResponse);
$('.btn-no').click({ ans: 'no' }, onUserResponse);
$('.btn-add-guess').click(onAddGuess);

function init() {
  createQuestsTree();
}

function onStartGuessing() {
  var elGameStart = $('.game-start');
  $(elGameStart).hide();
  renderQuest();
  $('.quest').show();
}

function renderQuest() {
  $('.quest h2').text(getCurrQuest().txt);
}

function onUserResponse(ev) {
  var res = ev.data.ans;
  // If this node has no children
  if (isChildless(getCurrQuest())) {
    if (res === 'yes') {
      alert('Yes, I knew it!');
      $('.quest').hide();
      onRestartGame();
      //// show sucess + play again modal
    } else {
      $('.quest').hide();
      $('.new-quest').show();
    }
  } else {
    gLastRes = res;
    moveToNextQuest(res);
    renderQuest();
  }
}

function onAddGuess(ev) {
  ev.preventDefault();
  var newGuess = $('#newGuess').val();
  var newQuest = $('#newQuest').val();

  addGuess(newGuess, newQuest, gLastRes);
  $('#newGuess').val('');
  $('#newQuest').val('');
  onRestartGame();
}

function onRestartGame() {
  $('.new-quest').hide();
  $('.game-start').show();
  createQuestsTree();
  gLastRes = null;
}
