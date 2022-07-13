/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const deleteResource = async (resource, id) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `/api/v1/${resource}s/${id}`
    });

    if (res.status === 204) {
      showAlert(
        'success',
        `${resource[0].toUpperCase() + resource.slice(1)} Deleted successfully!`
      );
      window.setTimeout(() => {
        location.reload();
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const editResource = async (id, data) => {
  try {
    console.log(data);
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/users/${id}`,
      data
    });
    if (res.data.status === 'success') {
      showAlert('success', 'User Edited successfully!');
      console.log(res.data);
      window.setTimeout(() => {
        location.assign('/manage-users');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
