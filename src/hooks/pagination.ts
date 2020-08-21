/*
 * File: pagination.ts
 * Description: 分页相关的自定义hooks
 * Created: 2020-08-11 13:00:33
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import {useState} from "react";
import {AxiosResponse} from "axios";
import {Pagination} from "../models/pagination";


export const usePaginationState = <T>(
  initPage: number,
  requestMethod: (params: T) => Promise<AxiosResponse>
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
  const changeCurrentPage = async (params: T): Promise<any> => {
    setIsLoading(true);
    try {
      const response = await requestMethod(params);
      const data: Pagination = response.data;
      setPaginationInfo(data);
      setCurrentPage(data.page || 0);
      setItems(data.items);
      setIsLoading(false);
      return Promise.resolve();
    } catch (e) {
      setIsLoading(false);
      //TODO:异常处理
      return Promise.reject(e);
    }
  }

  return {
    currentPage,
    items,
    isLoading,
    paginationInfo,
    changeCurrentPage
  }
}