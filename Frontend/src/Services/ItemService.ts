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

type GetByIdProps = {
    accessToken: string,
    id: string,
}

type UploadProps = {
    accessToken: string,
    data: UploadData, 
    navigate: NavigateFunction ,
}


const BASE_URL = REACT_APP_SERVER_URL;

class ItemService {
    async upload(props: UploadProps) {
        return http.post<UploadData>(`${BASE_URL}/Item`, JSON.stringify(props?.data), {
            headers: {
              'Authorization': `Bearer ${props?.accessToken}`
            }
          }).then(
            (res) => res.status === 200 ? toast.success("Item was successfully uploaded", {
                onClick: () => props?.navigate(`/details/${res.data}`)
            }) : toast.error(`Error code: ${res.status}`)
        );
    }
    
    async getAll(props?: GetAllProps) {
        const url = `${BASE_URL}/Item${props ? `?` : ``}${props?.city ? `City=${props.city}&` : ``}${!props?.category ? `` : (props?.category == "All") ? `` : `Category=${props?.category}&`}${props?.page ? `Page=${props.page}&` : ``}ItemsPerPage=12`
        
        return http.get(url, {
            headers: {
              'Authorization': `Bearer ${props?.accessToken}`
            }
          }).then((res) => { return res.data });
    }

    async getById(props: GetByIdProps) {
        return http.get(`${BASE_URL}/Item/${props.id}`, {
            headers: {
              'Authorization': `Bearer ${props?.accessToken}`
            }
          }).then((res) => {return res.data;})
    }
}

export default new ItemService();