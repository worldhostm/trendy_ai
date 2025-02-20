import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ResultItem{
    serviceTitle : string;
    description : string;
    hashtags : string[];
    url : string;
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
}

const initialState : StateInterface = {
    relatedsrchresults:[],
    setrelatedsrchresults: ()=>{},
    srchresults : [],
    setsrchresults :  ()=>{},
    selectedCategories : [],
    setselectedCategories : ()=>{}
}

export const serviceStore = create<StateInterface>()(
    persist((set, get) => ({
        ...initialState,
        setselectedCategories : (category)=>{
            if(!category) set({selectedCategories:[]});
            else{
                const {selectedCategories} = get();
                const newCategories = Array.isArray(category) ? category : [category];
                const newArr = [...selectedCategories, ...newCategories];
                const newValue = newArr.filter((e,idx)=> newArr.indexOf(e) === idx); 
                set({selectedCategories:newValue});
            }
        }
      })
      ,
      {
        name: "serviceStore", // 로컬 스토리지에 저장될 때 사용할 이름
      },
  )
);