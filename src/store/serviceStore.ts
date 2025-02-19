import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StateInterface{
    selectedCategories : string[];
    setselectedCategories : (category:string[] | string)=>void;
}

const initialState : StateInterface = {
    selectedCategories : [],
    setselectedCategories : ()=>{}
}

export const serviceStore = create<StateInterface>()(
    persist((set, get) => ({
        ...initialState,
        setselectedCategories : (category)=>{
            console.info(category);
            const {selectedCategories} = get();
            const newCategories = Array.isArray(category) ? category : [category];
            const newArr = [...selectedCategories, ...newCategories];
            const newValue = newArr.filter((e,idx)=> newArr.indexOf(e) === idx); 
            set({selectedCategories:newValue});
        }
      })
      ,
      {
        name: "serviceStore", // 로컬 스토리지에 저장될 때 사용할 이름
      },
  )
);