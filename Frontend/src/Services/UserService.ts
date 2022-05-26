import { NavigateFunction } from 'react-router-dom';
import { toast } from 'react-toastify';
import { REACT_APP_SERVER_URL } from '../Common/constants';
import http from "../Common/http-common";
import { UploadData } from '../Data/model';

type GetAllProps = {
    accessToken: string,
    city?: string,
    category?: string,
    page?: number,
    condition?: string,
}

const BASE_URL = REACT_APP_SERVER_URL;
const id = "3FA85F64-5717-4562-B3FC-2C963F66AFA6"

class UserService {
    async getById(props?: GetAllProps) {
        const url = `${BASE_URL}/User/${id}`
        return http.get(url, {
            headers: {
              'Authorization': `Bearer ${props?.accessToken}`
            }
          }).then((res) => { return res.data });
    }
}

export default new UserService();