import {iosVhFix} from './utils/ios-vh-fix';
import createNewComment from './modules/new-comment';

let buttonsDelete = document.getElementsByClassName('comments__delete');
let likes = document.getElementsByClassName('comments__likes');
// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {
  // Utils
  // ---------------------------------

  iosVhFix();

  // Modules
  // ---------------------------------

  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', () => {
    for (let button of buttonsDelete) {
      addListenerDelete(button);
    }
    for (let like of likes) {
      toggleLikes(like);
    }
    createNewComment(toggleLikes, addListenerDelete);
  });
});

// buttonsDelete.forEach((elem) => addListenerDelete(elem));
// likes.forEach((elem)=> toggleLikes(elem));


function addListenerDelete(button) {
  button.addEventListener('click', (event) => {

    if (event.target.closest('.comments__delete')) {
      event.target.closest('.comments__item').remove();
    }
  });
}

function toggleLikes(like) {
  like.addEventListener('click', (event) => {
    like.classList.toggle('comments__likes--active');
    if (event.target.closest('.comments__likes--active')) {
      let count = Number(like.querySelector('.comments__likes-count').textContent);
      count = ++count;
      like.querySelector('.comments__likes-count').textContent = String(count);
    } else {
      let count = Number(like.querySelector('.comments__likes-count').textContent);
      count = --count;
      like.querySelector('.comments__likes-count').textContent = String(count);
    }
  });
}
// ---------------------------------
