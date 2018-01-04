import moment from 'moment';

const minDate = moment().subtract(100, 'years').toDate();
const maxDate = moment().toDate();

export default {
  getMessage() {
    return `Birth date must be between ${moment(minDate).format('MMMM Do YYYY')} and ${moment(maxDate).format('MMMM Do YYYY')}`;
  },
  validate(value) {
    if (!value) return true;
    if (minDate <= moment(value) && moment(value) <= maxDate) {
      return true;
    }
    return false;
  },
};
