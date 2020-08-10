import {useState} from "react";
import {Pagination, PaginationResponse} from "../models/common";


interface PaginationStateProps {
  initPage: number,
}


export const PaginationState = (state: PaginationStateProps) => {
  const [currentPage, setCurrentPage] = useState<number>(state.initPage);
  const [items, setItems] = useState<any[]>([]);
  const [paginationInfo, setPaginationInfo] = useState<Pagination>({
    count: 0,
    page: 0,
    total: 0,
    totalPage: 0
  });

  // 当页码被改变
  const changeCurrentPage = (response: PaginationResponse) => {
    const data: Pagination = response.data;
    setPaginationInfo(data);
    setCurrentPage(data.page || 0);
    setItems(data.items);
  }


  return [
    currentPage,
    items,
    paginationInfo,
    changeCurrentPage
  ]
}