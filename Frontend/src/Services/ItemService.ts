import { toast } from 'react-toastify';
import { BASE_URL } from '../Common/constants';
import http from "../Common/http-common";
import { UploadData } from '../Data/model';

class ItemService {
    async upload(data: UploadData) {
        return http.post<UploadData>(`${BASE_URL}/api/jsonBlob`, data).then(
            () => toast.success("Item was successfully uploaded")
        );
    }
}

export default new ItemService();