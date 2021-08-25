import api from '@/service/api.js'

//collection of request to API for computer
export default {
    getDataUser(token) {
        return api.get('/user/exam?token=' + token)
    }
}