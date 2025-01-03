"use client"
import React,{useContext,createContext,useState,ReactNode} from "react";

interface DateState {
    date:Date|null;
    setDate:(date:Date|null)=>void;
}

const DateContext=createContext<DateState|undefined>(undefined);

export const DateProvider=({children}:{children:ReactNode})=>{
    const [date,setDate]=useState<Date|null>(null);
    return (
    <DateContext.Provider value={{date,setDate}}>
        {children}
    </DateContext.Provider>)
}

export const useDateContext=()=>{
    const context=useContext(DateContext);
    if(!context){
        throw new Error("useDateContext must be used within a DateProvider");
    }
    return context;
}
