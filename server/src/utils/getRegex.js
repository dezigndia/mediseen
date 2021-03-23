const getRegex = text => {
    return new RegExp(`^${text}`, "gi")
}

const splitStringRegex = (str = "") => {
    return str.split(/(\s+)/).filter(function (e) {
        return e.trim().length > 0
    })
}

module.exports = {
    getRegex,
    splitStringRegex,
}
