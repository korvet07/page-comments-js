import {iosVhFix} from './utils/ios-vh-fix';
import addNewComment from './modules/new-comment';

const likes = document.querySelectorAll('.comments__likes');
const list = document.querySelector('.comments__list');

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {
  // Utils
  // ---------------------------------
  iosVhFix();
  // Modules
  // ---------------------------------
  likes.forEach((elem) => toggleLikes(elem));
  addListenerDelete();
  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', () => {

    addNewComment(toggleLikes, list);
  });
});


function addListenerDelete() {
  list.addEventListener('click', (event) => {

    if (event.target.closest('.comments__delete')) {
      event.target.closest('.comments__item').remove();
    }
  });
}

function toggleLikes(like) {
  like.addEventListener('click', (event) => {
    like.classList.toggle('comments__likes--active');

    if (event.target.closest('.comments__likes--active')) {
      let count = like.querySelector('.comments__likes-count').textContent;
      count = ++count;
      like.querySelector('.comments__likes-count').textContent = count;
    } else {
      let count = like.querySelector('.comments__likes-count').textContent;
      count = --count;
      like.querySelector('.comments__likes-count').textContent = count;
    }
  });
}
// ---------------------------------
