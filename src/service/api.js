import axios from 'axios'

export default axios.create({
    baseURL: `https://app-planning-cda.herokuapp.com/api`,
    headers: {
        //'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
})