import axios from 'axios';
export default function baseURL() {
    const api = axios.create({
        // baseurl =
        // run a code space on main
        // command: npm run start:prod
        // go to ports tab in terminal and make the 3000 port public under the visibility column
        // baseURL: "https://obscure-fishstick-g4qr6jx547rpf9644-3000.app.github.dev/",
        baseURL: "https://talentlink-backend-75gc.onrender.com/",
        //replace with own uri
    });
    return api;
}