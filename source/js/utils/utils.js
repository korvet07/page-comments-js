function getRandomIntInclusive(min, max) {
  if ((min >= max)) {
    return 0;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


function dropHMS(date) {
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0, 0);
}

function getMonthDate(date) {
  let month = ['Янв.', 'Фев.', 'Мар.', 'Апр.', 'Мая', 'Июня', 'Июля', 'Авг.', 'Сент.', 'Окт.', 'Нояб.', 'Дек.'];

  return month[date.getMonth()];
}

function correctionMinHour(num) {
  let arrStr = [...String(num)];

  if (arrStr.length === 1) {
    return `0${num}`;
  }

  return num;
}

function showMessageDateTime(dateTime) {
  let today = new Date();
  let yesterday = new Date();
  let roomLastMessageDate = new Date(dateTime);
  let dateTimeHours = roomLastMessageDate.getHours();
  let dateTimeMin = roomLastMessageDate.getMinutes();
  yesterday.setDate(today.getDate() - 1);

  dropHMS(today);
  dropHMS(yesterday);
  dropHMS(roomLastMessageDate);

  if (dateTime) {

    if (today.getTime() === roomLastMessageDate.getTime()) {

      return `сегодня, ${correctionMinHour(dateTimeHours)}:${correctionMinHour(dateTimeMin)}`;
    } else if (today.getTime() < roomLastMessageDate.getTime()) {                                //Будущие даты заменяем на сегодня

      return `сегодня, ${correctionMinHour(new Date().getHours())}:${correctionMinHour(new Date().getMinutes())}`;
    } else if (yesterday.getTime() === roomLastMessageDate.getTime()) {

      return `вчера, ${correctionMinHour(dateTimeHours)}:${correctionMinHour(dateTimeMin)}`;
    }
    return `${roomLastMessageDate.getDate()} ${getMonthDate(roomLastMessageDate)}, ${correctionMinHour(dateTimeHours)}:${correctionMinHour(dateTimeMin)}`;
  }
};

export {
  showMessageDateTime,
  getRandomIntInclusive,
  correctionMinHour
}
