import axios from 'axios';

export default axios.create({

    baseURL: 'https://api.yelp.com/v3/businesses',
    headers: {
        Authorization: 'Bearer hb3TAUE3sxTK2yh7yJi4kGs9gY8KEmAskzC9r9vz09h4pXE9PZMXk3gtiMLnop2cT_16liCaFPCKOQ73EAc__sPnnbVT8yUA3ZEAtXBUGbyBIRvHKPPD6eaqknUiYHYx'
    }
});

