export const useQueryParams = ()=>{
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const getParam = (key)=>{
        return urlParams.get(key);
    }

    return {
        getParam
    }
}