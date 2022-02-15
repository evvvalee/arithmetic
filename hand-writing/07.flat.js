//多维数组拍平
//1.原生方法
const flat1 = (array) => {
    return array.flat(Infinity)
}

//2.
const flat2 = (array) => {
    return array.reduce((flat, toFlat) => {
        return flat.concat(Array.isArray(toFlat) ? flat2(toFlat) : toFlat)
    })
}

//3.
const flat3 = (array) => {
    const result = [];
    const stack = [...array];

    while (stack.length !== 0) {
        const val = stack.pop()
        if (Array.isArray(val)) {
            stack.push(...val)
        } else {
            result.unshift(val)
        }
    }
    return result
}