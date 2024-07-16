import axios from "axios";

export default class LoginApi{
    
    static instance;

    static getInstance(){
        if(LoginApi.instance)
        {
            return LoginApi.instance;
        }
        else {LoginApi.instance = new LoginApi();}
        return LoginApi.instance;
    }

    constructor() {
        this.apiURL = process.env.REACT_APP_SERVER_URL;
    }

    async login(data) {
        const systemToken = process.env.REACT_APP_SYSTEM_TOKEN;
        let response;

        await axios.post(this.apiURL + "/sign-in", data, {
            headers: {
                'Content-Type': 'application/json',
                'systemToken': systemToken
            }
        }).then((res) => {
            response = {
                status: "success",
                response: res
            }
            
            
        }).catch((err) => {
            response = {
                status: "error",
                response: err
            }
        })

        return response;

    }

}