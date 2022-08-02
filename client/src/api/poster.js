/* eslint-disable indent */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const poster = async (...args) => {
    const res = await axios.post(...args);
    return res.data;
};

export default poster;
