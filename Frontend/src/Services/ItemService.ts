import { toast } from 'react-toastify';
import { BASE_URL } from '../Common/constants';
import http from "../Common/http-common";
import { UploadData } from '../Data/model';

class ItemService {
    async upload(data: UploadData) {
        return http.post<UploadData>(`${BASE_URL}/Item`, JSON.stringify(data)).then(
            (res) => res.status === 200 ? toast.success("Item was successfully uploaded") : toast.error(`Error code: ${res.status}`)
        );
    }
}

export default new ItemService();