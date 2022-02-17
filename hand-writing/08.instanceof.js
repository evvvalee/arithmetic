// instanceof 

const instanceof1 = (obj, func) => {
    if (!(obj && ['object', 'function'].includes(typeof obj))) return false;
    let proto = Object.getPrototypeOf(obj)
    if (proto === func.prototype) {
        return true
    } else if (proto === null) {
        return false
    } else {
        return instanceof1(proto, func)
    }
}

const instanceof2 = (obj, func) => {
    if (!(obj && ['object', 'function'].includes(typeof obj))) return false;
    let proto = obj;
    while (proto = Object.getPrototypeOf(proto)) {
        if (proto === null) {
            return false
        } else if (proto === func.prototype) {
            return true
        }
    }
    return false
}
