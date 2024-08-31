import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

class Http {
  private axiosInstance: AxiosInstance | null = null
  private get axios(): AxiosInstance {
    if (this.axiosInstance === null) {
      this.axiosInstance = axios.create({
        // baseURL: process.env.NEXT_PUBLIC_BASE_URL,
        // withCredentials: true,
      })
    }

    return this.axiosInstance
  }

  request<T = any, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> {
    return this.axios.request(config)
  }

  get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.axios.get<T, R>(url, config)
  }

  getData<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.axios.get<T>(url, config).then(response => response.data)
  }

  post<T = any, R = AxiosResponse<T>>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R> {
    return this.axios.post<T, R>(url, data, config)
  }
  postData<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.axios.post<T>(url, config).then(response => response.data)
  }

  put<T = any, R = AxiosResponse<T>>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R> {
    return this.axios.put<T, R>(url, data, config)
  }
  putData<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.axios.put<T>(url, config).then(response => response.data)
  }

  delete<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.axios.delete<T, R>(url, config)
  }
}

export const http = new Http()
