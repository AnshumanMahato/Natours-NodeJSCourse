/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const saveReview = async (tour, rating, review) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/reviews',
      data: {
        tour,
        rating,
        review
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', 'review saved in successfully!');
      window.setTimeout(() => {
        location.reload();
      }, 1000);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
