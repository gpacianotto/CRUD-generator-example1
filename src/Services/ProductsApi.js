import axios from "axios";
import UserDataService from "./UserDataService";

export default class ProductsApi{
    
    static instance;

    static getInstance(){
        if(ProductsApi.instance)
        {
            return ProductsApi.instance;
        }
        else {ProductsApi.instance = new ProductsApi();}
        return ProductsApi.instance;
    }

    constructor() {
        this.apiURL = process.env.REACT_APP_SERVER_URL;
        this.userService = UserDataService.getInstance();
        this.tableId = 2;
    }

    async list(page) {
        const systemToken = process.env.REACT_APP_SYSTEM_TOKEN;
        const token = this.userService.getUserToken();

        let response;

        await axios.get(this.apiURL + "/list/" + this.tableId + "?page=" + page, {
            headers: {
                'Content-Type': 'application/json',
                'systemToken': systemToken,
                'token': token
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

    async createProduct(data) {
        const systemToken = process.env.REACT_APP_SYSTEM_TOKEN;
        const token = this.userService.getUserToken();

        let response;

        await axios.post(this.apiURL + "/create/" + this.tableId, data, {
            headers: {
                'Content-Type': 'application/json',
                'systemToken': systemToken,
                'token': token
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