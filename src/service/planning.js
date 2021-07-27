import api from '../service/api.js'

//collection of request to API for computer
export default {
    fetchDataPlanning(data) {
        return api.get('/planning/' + data)
    }
}