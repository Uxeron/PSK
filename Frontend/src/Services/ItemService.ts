import { BASE_URL } from './../contants';
import http from "../http-common";
import { UploadData } from '../Data/model';

class ItemService {
    async upload(data: UploadData) {
        return http.post<UploadData>(`${BASE_URL}/api/jsonBlob`, data);
    }
}

export default new ItemService();