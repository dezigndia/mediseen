function getBusinessCountByType(data) {
    let count = {
        doctor: 0,
        hospital: 0,
        pharmacy: 0,
        pathology: 0,
    }
    data.forEach(b => {
        count[b.type]++
    })
    return count
}

module.exports = { getBusinessCountByType }
