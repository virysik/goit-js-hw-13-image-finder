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
  gallery: document.querySelector('.gallery'),
}

refs.form.addEventListener('submit', onSubmit)

let picturesFetchApi = new PicturesFetchApi()

function onSubmit(e) {
  e.preventDefault(e)
  clearGallery()
  picturesFetchApi.query = e.currentTarget.elements.query.value
  picturesFetchApi.resetPage()
  onLoad()
}

async function onLoad() {
  let imageMarkUp = await picturesFetchApi.fetchApi()
  createGallery(imageMarkUp)
  showNotification()
  showBigImg(data)
  //scroll()
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

// function scroll() {
//   setTimeout(() => {
//     refs.gallery.scrollIntoView({
//       behavior: 'smooth',
//       block: 'end',
//     })
//   }, 200)
// }

const callback = (enrtries, obsrv) => {
  enrtries.forEach((entry) => {
    let intersected = entry.isIntersecting
    let string = picturesFetchApi.query.trim()
    let pageNumb = picturesFetchApi.page
    if (intersected && string !== '' && pageNumb > 1) {
      picturesFetchApi.fetchApi().then((data) => {
        createGallery(data)
        showNotification()
      })
    }
  })
}

const observer = new IntersectionObserver(callback, { rootMargin: '100px' })
observer.observe(document.querySelector('.obsrv'))
