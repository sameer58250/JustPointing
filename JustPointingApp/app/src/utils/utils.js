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

export const getValuesWithCount = (arr, attr) => {
    var i = 1;
    if(arr.length > 0){
        var newArr = [{StoryPoint: arr[0][attr], count: 1}];
        while(i < arr.length){
            var idx = findIndexArrayByAttr(newArr, attr, arr[i][attr]);
            if(idx == -1){
                var obj = {StoryPoint: arr[i][attr], count: 1};
                newArr.push(obj);
            }
            else{
                newArr[idx].count++;
            }
            i++;
        }
        return newArr;
    }
    return [{}];
}