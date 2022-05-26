import { NavigateFunction } from 'react-router-dom';
import { toast } from 'react-toastify';
import { REACT_APP_SERVER_URL } from '../Common/constants';
import http from "../Common/http-common";
import { UploadData } from '../Data/model';

type GetByIdProps = {
  accessToken: string,
  id: string,
}


type CreateProps = {
  accessToken: string,
  user: any,
  navigate: NavigateFunction,
}

const BASE_URL = REACT_APP_SERVER_URL;
// const id = "3FA85F64-5717-4562-B3FC-2C963F66AFA6"

class UserService {
  async getById(props?: GetByIdProps) {
    const url = `${BASE_URL}/User/UserScreen/${props?.id}`
    return http.get(url, {
      headers: {
        'Authorization': `Bearer ${props?.accessToken}`
      }
    }).then((res) => { return res });
  }

  async create(props?: CreateProps) {
    const url = `${BASE_URL}/User/`
    return http.post(url, JSON.stringify(props?.user), {
      headers: {
        'Authorization': `Bearer ${props?.accessToken}`
      }
    }).then(
      (res) => res.status === 200 ? toast.success("Your user was successfully created", {
        onClick: () => props?.navigate(`/browse`)
      }) : toast.error(`Error code: ${res.status}`)
    );
  }
}

export default new UserService();