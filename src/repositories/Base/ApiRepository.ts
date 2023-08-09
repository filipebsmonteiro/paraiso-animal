import api, { AxiosInstance } from "axios";
import { RepositoryInterface } from "@/repositories/Base/Repository";

export class ApiRepository implements RepositoryInterface {
  endpoint = null;
  $axios = api;

  constructor($axios = null) {
    if ($axios) {
      this.$axios = $axios
    }
  }

  fetch(params: any = null, paramsSerializer: Function|null = null) {
    return this.$axios.useBearerToken().get(`${this.endpoint}`, {
      params,
      paramsSerializer
    })
  }

  fetchOne(id: string|number, params: any = null, paramsSerializer: Function|null = null) {
    if (params) {
      return this.$axios.useBearerToken().get(`${this.endpoint}/${id}`, {
        params,
        paramsSerializer
      })
    }

    return this.$axios.useBearerToken().get(`${this.endpoint}/${id}`)
  }

  post(params: any = null) {
    return this.$axios.useBearerToken().post(`${this.endpoint}`, params)
  }

  put(id: string|number, params: any = null) {
    return this.$axios.useBearerToken().put(`${this.endpoint}/${id}`, params)
  }

  delete(id: string|number) {
    return this.$axios.useBearerToken().delete(`${this.endpoint}/${id}`)
  }

  async cleanRequest(method: string, url: string, headers = {}, body = null) {
    return await new Promise(function (resolve, reject) {
      let xhr = new XMLHttpRequest();
      // xhr.timeout = 1500; // time in milliseconds
      xhr.open(method, url);
      Object.entries(headers).map(([key, value]) => xhr.setRequestHeader(key, value))
      xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
          try {
            resolve(JSON.parse(xhr.response));
          } catch (error) {
            resolve(xhr.response);
          }
        } else {
          reject({
            status: this.status,
            statusText: xhr.statusText
          });
        }
      };
      // xhr.ontimeout = (e) => {
      //   xhr.onload();
      // };
      // xhr.onreadystatechange = function () {
      //   console.log('xhr.readyState :>> ', xhr.readyState);
      //   if (xhr.readyState == 4) {
      //     alert("ready state = 4");
      //   }
      // };
      xhr.onerror = function () {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      };
      xhr.send(body);
    });
  }
}

export function createRepository(Instance: Repository) {
  return ($axios: AxiosInstance) => new Instance($axios)
}

export default new Repository()
