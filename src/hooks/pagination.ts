import {useState} from "react";
import {Pagination, PaginationResponse} from "../models/common";
import {AxiosResponse} from "axios";


export const usePaginationState = <T>(
  initPage: number,
  requestMethod: (params: T) => Promise<AxiosResponse<any>>
) => {
  const [currentPage, setCurrentPage] = useState<number>(initPage);
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [paginationInfo, setPaginationInfo] = useState<Pagination>({
    count: 0,
    page: 0,
    total: 0,
    totalPage: 0
  });

  // 当页码被改变
  const changeCurrentPage = (params: T) => {
    setIsLoading(true);
    requestMethod(params)
      .then((response: PaginationResponse) => {
        const data: Pagination = response.data;
        setPaginationInfo(data);
        setCurrentPage(data.page || 0);
        setItems(data.items);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        //TODO:异常处理
      })
  }

  return {
    currentPage,
    items,
    isLoading,
    paginationInfo,
    changeCurrentPage
  }
}