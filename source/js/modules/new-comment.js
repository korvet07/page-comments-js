import {correctionMinHour, getRandomIntInclusive, showMessageDateTime} from '../utils/utils';

const MAX_AMOUNT_LIKES = 70;
const form = document.forms.new_comment;
const inputName = form.elements.comment_name;
const inputTextContent = form.elements.comment_text;

form.addEventListener('blur', (event) => {

  if (event.target.matches('.add-comment__input-name')) {
    validateInputName();
  }
  if (event.target.matches('.add-comment__input-content')) {
    validateInputTextContent();
  }
}, true);

form.addEventListener('focus', (event) => {

  if (event.target.matches('.add-comment__input-name') || event.target.matches('.add-comment__input-content')) {
    event.target.classList.remove('is-invalid');
  }
}, true);


function addNewComment(fnLike) {

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (validateInputName() && validateInputTextContent()) {
      createNewComment(fnLike);
      inputName.classList.remove('is-valid');
      inputTextContent.classList.remove('is-valid');
    }

  });
}

function createNewComment(fnLike) {
  const comment = document.querySelector('#new-comment').content.querySelector('.comments__item').cloneNode(true);
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

function validateInputName() {
  const regularExpression = /^[A-Za-zА-Яа-яЁё\s]+$/;

  if (regularExpression.test(inputName.value) && inputName.value.trim().length > 2) {
    inputName.classList.add('is-valid');
    inputName.classList.remove('is-invalid');

    return true;
  } else {
    inputName.classList.add('is-invalid');
    inputName.classList.remove('is-valid');

    return false;
  }
}

function validateInputTextContent() {

  if (inputTextContent.value.trim().length > 2) {
    inputTextContent.classList.add('is-valid');
    inputTextContent.classList.remove('is-invalid');

    return true;
  } else {
    inputTextContent.classList.add('is-invalid');
    inputTextContent.classList.remove('is-valid');

    return false;
  }
}

export default addNewComment;
