import Axios from 'axios';

// Axios Handler
export const axiosHandler = ({ method = '', url = '', token = null, data = {}, extra = null }) => {
    let methodType = method.toUpperCase();
    if (['GET', 'POST', 'PATCH', 'PUT', 'DELETE'].includes(methodType) || {}.toString(data) !== '[object Object]') {
        let axiosProps = { method: methodType, url, data };
        if (token) {
            axiosProps.headers = { token: `Bearer ${token}` };
        }
        if (extra) {
            axiosProps.headers = { ...axiosProps.headers, ...extra };
        }
        return Axios(axiosProps);
    } else {
        alert(`method ${methodType} is not accepted or data is not an object`);
    }
};

// Error Handler
export const errorHandler = (err, defaulted = false) => {
    if (defaulted) {
        return 'Ops!, an error occurred.';
    }
    let messageString = '';
    if (!err.response) {
        messageString += 'Network error! check your network and try again';
    } else {
        let data = err.response.data.results;
        if (!err.response.data.results) {
            data = err.response.data;
        }
        messageString = data;
    }
    return messageString.replace(/{|}|'|\[|\]/g, '');
};

// Date Format
export const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

// Captilize First Letter
export const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
