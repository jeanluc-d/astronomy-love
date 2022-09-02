/* eslint-disable import/extensions */
import MS_PER_DAY from '../constants/constants.js';

export const formatDate = (date) => date.toISOString().split('T')[0];

export const numberOfDaysInBetweenDates = (startDate, endDate) => {
  // convert "YYYY-MM-DD" to "YYYY/MM/DD" and create a date object
  const start = new Date(startDate.replace(/-/g, '/'));
  const end = new Date(endDate.replace(/-/g, '/'));

  // calculate difference in milliseconds
  const diff = end - start;
  /*
   * convert to days, rounding down to nearest integer so we don't get partial days
   * add 1 to account for the fact that the start date is included in the difference
  */
  return Math.floor(diff / MS_PER_DAY) + 1;
};
