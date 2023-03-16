import {correctionMinHour, getRandomIntInclusive, showMessageDateTime} from '../utils/utils';

const MAX_AMOUNT_LIKES = 70;
const form = document.forms.new_comment;

function addNewComment(fnLike) {

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    createNewComment(fnLike);
  });
}

function createNewComment(fnLike) {
  const comment = document.querySelector('#new-comment').content.querySelector('.comments__item').cloneNode(true);
  const inputName = form.elements.comment_name;
  const inputTextContent = form.elements.comment_text;
  const inputTime = form.elements.comment_time;
  const container = document.querySelector('.comments__list');
  const elementFragment = document.createDocumentFragment();

  comment.querySelector('.comments__name').textContent = inputName.value;
  comment.querySelector('.comments__content').textContent = inputTextContent.value;
  comment.querySelector('.comments__likes-count').textContent = getRandomIntInclusive(0, MAX_AMOUNT_LIKES);

  fnLike(comment.querySelector('.comments__likes'));

  if (!inputTime.value) {
    comment.querySelector('.comments__time-hours').textContent = `${correctionMinHour(new Date().getHours())}:${correctionMinHour(new Date().getMinutes())}`;
    comment.querySelector('.comments__time').textContent = 'Опубликовано: сегодня, ';
  } else {
    comment.querySelector('time').textContent = `Опубликовано: ${showMessageDateTime(inputTime.value)}`;
  }
  elementFragment.append(comment);
  container.prepend(elementFragment);

  form.reset();
}

export default addNewComment;
