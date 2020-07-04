export const removeFromArrayByAttr = (arr, attr, value) => {
    var i = findIndexArrayByAttr(arr, attr, value);
    arr.splice(i, 1);
    return arr;
}

export const findIndexArrayByAttr = (arr, attr, value) => {
    var i = 0;
    while(i < arr.length){
        if(arr[i]
            && arr[i].hasOwnProperty(attr)
            && (value && arr[i][attr] === value)){
                return i;
        }
        i++;
    }
    return -1;
}