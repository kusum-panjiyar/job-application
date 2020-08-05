import Axios from 'axios'

const axios = Axios.create({
    baseURL: 'http://dct-application-form.herokuapp.com'
})

export default axios