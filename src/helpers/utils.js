import moment from 'moment';

export function unixDateFormating(date) {
  return moment.unix(date).format("DD MMMM YYYY");
}

export function dateFormating(element, flag) {
  let frmt = '';
  (flag === 'days')? frmt = 'MMM Do':frmt = 'HH:ss';
  element.dt_txt = moment(element.dt_txt,('YYYY-MM-DD h:mm:ss')).format(frmt);
}
