import PicturesFetchApi from './sass/partials/apiService'
import imgMarkUp from './templates/imgMarkUp'
import { success } from '../node_modules/@pnotify/core/dist/PNotify'
import '../node_modules/@pnotify/core/dist/PNotify.css'
import '../node_modules/@pnotify/core/dist/BrightTheme.css'
import * as basicLightbox from 'basiclightbox'
import '../node_modules/basiclightbox/dist/basicLightbox.min.css'
import './sass/main.scss'

const refs = {
  form: document.getElementById('search-form'),
  loadBtn: document.querySelector('.load'),
  gallery: document.querySelector('.gallery'),
}

refs.form.addEventListener('submit', onSubmit)
refs.loadBtn.addEventListener('click', onLoad)

let picturesFetchApi = new PicturesFetchApi()

function onSubmit(e) {
  e.preventDefault(e)
  clearGallery()
  const searchQuery = e.currentTarget.elements.query.value
  picturesFetchApi.query = searchQuery
  picturesFetchApi.resetPage()
  onLoad()
}

function onLoad() {
  picturesFetchApi.fetchApi().then((data) => {
    createGallery(data)
    showNotification()
    showBigImg(data)
    showBtn()
    scroll()
  })
}

function showBtn() {
  if (refs.loadBtn.classList.contains('hide')) {
    refs.loadBtn.classList.remove('hide')
  }
}

function clearGallery() {
  refs.gallery.innerHTML = ''
}

function createGallery(markUp) {
  refs.gallery.insertAdjacentHTML('beforeend', imgMarkUp(markUp))
}

function showNotification() {
  success({ text: 'downloaded succesfully' })
}

function showBigImg(data) {
  data.forEach(({ id, largeImageURL, tags }) => {
    document.getElementById(id).onclick = () => {
      basicLightbox.create(`<img src=${largeImageURL} alt=${tags} />`).show()
    }
  })
}

function scroll() {
  setTimeout(() => {
    refs.gallery.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    })
  }, 200)
}
