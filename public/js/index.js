/* eslint-disable */
import '@babel/polyfill';
import { signup } from './signup';
import { login, logout } from './login';
import { displayMap } from './mapbox';
import { updateSettings } from './updateSettings';
import { bookTour } from './stripe';
import { saveReview } from './review';
import { hideAlert, showAlert, showPrompt } from './alerts';
import { deleteResource, editResource } from './manage';

// DOM ELEMENTS
const mapBox = document.getElementById('map');
const signupForm = document.querySelector('.form--signup');
const loginForm = document.querySelector('.form--login');
const reviewForm = document.querySelector('.form--review');
const editForm = document.querySelector('.form--edit');
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const bookBtn = document.getElementById('book-tour');
const addReviewBtn = document.getElementById('review-tour');
const nav = document.querySelector('.navigation__nav');

const deleteBtns = document.querySelectorAll('.delete');

// DELEGATION
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (signupForm) {
  signupForm.addEventListener('submit', e => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;

    signup(name, email, password, passwordConfirm);
  });
}

if (loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (userDataForm) {
  document.getElementById('photo').addEventListener('change', function() {
    console.log(this);
    document.querySelector('.filename').textContent = this.files[0].name;
  });
  userDataForm.addEventListener('submit', e => {
    e.preventDefault();
    document.querySelector('.btn--save-data').textContent = 'Updating...';
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);

    updateSettings(form, 'data');
  });
}

if (userPasswordForm)
  userPasswordForm.addEventListener('submit', async e => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';

    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );

    document.querySelector('.btn--save-password').textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });

if (reviewForm)
  reviewForm.addEventListener('submit', async e => {
    e.preventDefault();
    const rating = document.getElementById('rating').value;
    const review = document.getElementById('review').value;
    const { tourId } = e.target.dataset;
    await saveReview(tourId, rating, review);
  });

if (editForm)
  editForm.addEventListener('submit', async e => {
    e.preventDefault();

    const data = {};
    data.name = document.getElementById('name').value;
    data.email = document.getElementById('email').value;
    data.role = document.getElementById('role').value;
    data.active = document.getElementById('status').value === 'active';
    const { id } = e.target.dataset;
    console.log(data, id);
    await editResource(id, data);
  });

if (bookBtn)
  bookBtn.addEventListener('click', e => {
    e.target.textContent = 'Processing...';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });

if (addReviewBtn)
  addReviewBtn.addEventListener('click', e => {
    e.preventDefault();
    reviewForm.closest('.review-form').classList.remove('hide');
  });

const alertMessage = document.querySelector('body').dataset.alert;
if (alertMessage) showAlert('success', alertMessage, 20);

if (deleteBtns.length) {
  const { resource } = document.querySelector('table').dataset;
  deleteBtns.forEach(btn =>
    btn.addEventListener('click', async e => {
      e.preventDefault();
      const id = btn.dataset.id;
      showPrompt('warn', `Would you like the delete the ${resource}?`);
      document
        .querySelector('.btn--confirm')
        .addEventListener('click', async () => {
          await deleteResource(resource, id);
        });
      document
        .querySelector('.btn--cancel')
        .addEventListener('click', hideAlert);
    })
  );
}

if (nav)
  nav.addEventListener('click', () => {
    document.getElementById('nav-toggle').checked = false;
  });
