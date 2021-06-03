import axios from 'axios'

const API_KEY = '21690892-48d55623c78353d4b35edb4ee'
axios.defaults.baseURL = 'https://pixabay.com/api'

export default class PicturesFetchApi {
  constructor() {
    this.key = API_KEY
    this.page = 1
    this.searchQuery = ''
  }

  async fetchApi() {
    let url = `/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${this.key}`
    try {
      let response = await axios.get(url)
      let info = response.data.hits
      this.incrementPage()
      return info
    } catch (error) {
      console.log(error)
    }
  }

  resetPage() {
    this.page = 1
  }

  incrementPage() {
    this.page += 1
  }

  get query() {
    return this.searchQuery
  }

  set query(newQuery) {
    this.searchQuery = newQuery
  }
}
