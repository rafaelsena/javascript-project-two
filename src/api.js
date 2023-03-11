/**
 * @author Rafael Sena <rafaelsena@gmail.com>
 * @version 0.0.1
 * @description basic set up to call the GitHub REST API
 * @module api
 */

/** handle AJAX requests */
import axios from 'axios'


const api = axios.create({
    baseURL: 'https://api.github.com',
});

export default api;

