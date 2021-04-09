const { default: axios } = require("axios")
async function addHospital(hosData) {
    let body = new FormData()
    body.append("mobile", mobile)
    body.append("mobile", mobile)
    body.append("mobile", mobile)
    try {
        const { data } = await axios(
            `https://d.doctdesk.com/mediseen/v1/hospital/Signup/register`,
            {
                method: "POST",
                headers: { "Content-Type": "multipart/form-data" },
                data: body,
            }
        )
        return data
    } catch (err) {
        console.log(err)
    }
}

async function checkHospitalExists(mobile) {
    let body = new FormData()
    body.append("mobile", mobile)
    try {
        const { data } = await axios(
            `https://d.doctdesk.com/mediseen/v1/hospital/Verify/isHospitalExist`,
            {
                method: "POST",
                headers: { "Content-Type": "multipart/form-data" },
                data: body,
            }
        )
        return data
    } catch (err) {
        console.log(err)
    }
}
async function verifyHospital(mobile) {
    let body = new FormData()
    body.append("mobile", mobile)
    try {
        const { data } = await axios(
            `https://d.doctdesk.com/mediseen/v1/hospital/Verify/isRegisterHospitalVerified`,
            {
                method: "POST",
                headers: { "Content-Type": "multipart/form-data" },
                data: body,
            }
        )
        return data
    } catch (err) {
        console.log(err)
    }
}
async function fetchHospital(mobile) {
    let body = new FormData()
    body.append("mobile", mobile)
    try {
        const { data } = await axios(
            `https://d.doctdesk.com/mediseen/v1/hospital/Fetch/fetchHospitalDetails`,
            {
                method: "POST",
                headers: { "Content-Type": "multipart/form-data" },
                data: body,
            }
        )
        return data
    } catch (err) {
        console.log(err)
    }
}
async function fetchHospitalRelatedDoctors(hosId) {
    let body = new FormData()
    body.append("hospital_id", hosId)
    try {
        const { data } = await axios(
            `https://d.doctdesk.com/mediseen/v1/hospital/Fetch/fetchHospitalRelatedDoctors`,
            {
                method: "POST",
                headers: { "Content-Type": "multipart/form-data" },
                data: body,
            }
        )
        return data
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    addHospital,
    checkHospitalExists,
    verifyHospital,
    fetchHospital,
    fetchHospitalRelatedDoctors,
}
