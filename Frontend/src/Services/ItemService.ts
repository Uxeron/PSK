import { NavigateFunction } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BASE_URL } from '../Common/constants';
import http from "../Common/http-common";
import { UploadData } from '../Data/model';

type getAllProps = {
    city?: string,
    category?: string,
    page?: number,
    condition?: string,
}

class ItemService {
    async upload(data: UploadData, navigate: NavigateFunction ) {
        return http.post<UploadData>(`${BASE_URL}/Item`, JSON.stringify(data)).then(
            (res) => res.status === 200 ? toast.success("Item was successfully uploaded", {
                onClick: () => navigate(`/details/${res.data}`)
            }) : toast.error(`Error code: ${res.status}`)
        );
    }
    async getAll(props?: getAllProps) {
        console.log(props)
        const url = `${BASE_URL}/Item${props ? `?` : ``}${props?.city ? `City=${props.city}&` : ``}${!props?.category ? `` : (props?.category == "All") ? `` : `Category=${props?.category}&`}${props?.page ? `Page=${props.page}&` : ``}ItemsPerPage=12`
        console.log(url)
        return http.get(url).then((res) => { return res.data });
    }
    async getById(id: string) {
        return http.get(`${BASE_URL}/Item/${id}`).then((res) => {return res.data;})
    }
}

export default new ItemService();