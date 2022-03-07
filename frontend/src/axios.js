import axios from "axios";

    const instance = axios.create({
        baseURL: 'https://amazone-backend-app.herokuapp.com'
        // 'http://localhost:3001'
    });

    export default instance;
