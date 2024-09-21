import { createContext, useContext } from "react";

export const ResultContext= createContext({
     resultFullBody:"",
     inputFullBody:"",
     
})
export const useResult = () => {
    return useContext(ResultContext)
}
export const ResultProvider=ResultContext.Provider