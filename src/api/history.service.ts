import { useQuery } from '@tanstack/react-query'
import { PageRequest, PageResponse } from '@/types/Pagination'
import { HistoryOfChecksFilterProps, HistoryOfChecksResponse } from '@/types/HistoryOfChecks'
import { http } from '@/api/http'
import { AxiosResponse } from 'axios'

const axiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
}

export const getHistoryOfChecks = async (requestBody: PageRequest<HistoryOfChecksFilterProps>) => {
  const response = await http.post<
    PageRequest<HistoryOfChecksFilterProps>,
    AxiosResponse<PageResponse<HistoryOfChecksResponse>>
  >('/mocks/table-example.json', requestBody, axiosRequestConfig)

  return response.data
}

export const getHistoryOfChecksTemporary = (): Promise<PageResponse<HistoryOfChecksResponse>> => {
  return http.getData<PageResponse<HistoryOfChecksResponse>>(`/mocks/table-example.json`)
}

export const useHistoryOfChecks = (requestBody: PageRequest<HistoryOfChecksFilterProps>) => {
  return useQuery({
    queryKey: ['historyOfChecks', requestBody],
    // queryFn: async () => await getHistoryOfChecks(requestBody),
    queryFn: async () => await getHistoryOfChecksTemporary(),
  })
}
