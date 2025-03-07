import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ResultItem{
    serviceTitle : string;
    description : string;
    hashtags : string[];
    url : string;
    searchTypes : 0
}

interface StateInterface{
    // 검색결과 배열
    srchresults : ResultItem[];
    // 검색결과 세팅함수
    setsrchresults : (arr:ResultItem[])=>void;
    // 연관 검색 결과 배열
    relatedsrchresults:ResultItem[];
    // 연관 검색 결과 배열 세팅함수
    setrelatedsrchresults : (arr:ResultItem[])=>void;
    selectedCategories : string[];
    setselectedCategories : (category?:string[] | string)=>void;
    searchTypes :{
        ko: {
          rslt: "검색결과",
          related: "연관 검색 결과",
          simple: "간편 검색 결과",
        },
        en: {
          rslt: "Search Result",
          related: "Related Search Result",
          simple: "Quick Search Result",
        },
      };
}

const initialState : StateInterface = {
    relatedsrchresults:[],
    setrelatedsrchresults: ()=>{},
    srchresults : [],
    setsrchresults :  ()=>{},
    selectedCategories : [],
    setselectedCategories : ()=>{},
    searchTypes :{
        ko: {
          rslt: "검색결과",
          related: "연관 검색 결과",
          simple: "간편 검색 결과",
        },
        en: {
          rslt: "Search Result",
          related: "Related Search Result",
          simple: "Quick Search Result",
        },
      }
}

export const serviceStore = create<StateInterface>()(
    persist((set) => ({
        ...initialState,
        setselectedCategories : (category)=>{
            if(!category) set({selectedCategories:[]});
            else{set({ selectedCategories: [...category]});}
        },
        setsrchresults : (arr)=>{set({srchresults:arr})},
        setrelatedsrchresults : (arr)=>{set({relatedsrchresults:arr})},
      })
      ,
      {
        name: "serviceStore", // 로컬 스토리지에 저장될 때 사용할 이름
      },
  )
);