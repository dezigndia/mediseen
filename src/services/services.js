const server = 'http://43.204.17.144/:5001/';
// const server = 'http://localhost:5001/';

export const GET_OTP = `${server}api/auth/user-get-otp`

// @reqBody={phoneNo,otp}
// @res={ status:true/false, payload:jwt }
export const VERIFY_OTP = `${server}api/auth/user-verify-otp`

export const USER_GET_OTP = `${server}api/user/user-get-otp`
export const USER_VERIFY_OTP = `${server}api/user/user-verify-otp`

// returns a url for retreiving search result
export const SEARCH_BUSINESS = (category, query, filter) => {
  let searchQuery = query !== '' ? `&search=${query}` : '';  //search value
  let locationQuery = filter.location ? `&city=${filter.value}` : ''; //location
  let specialityQuery = filter.speciality ? `&speciality=${filter.value}` : ''; //speciality
  let categoryQuery = category !== 'All' ? `&category=${category}` : '';  //category
  let url = `${server}api/business?${searchQuery}${locationQuery}${specialityQuery}${categoryQuery}`;
  return url;
}

//returns a url for retreiving available doctors in a hospital or
//hospitals doctor is going to be vailable in
//export const getAvailablityList = (id) => {
//  let url = `${server}`;
//}

//registring user
export const REGISTER_LINK = `${server}api/business`
export const UPDATE_REGISTERED_USER = `${server}api/business/update`
export const DELETE_VENDOR_BY_ID = (id)=>`${server}api/business/delete/${id}`;
export const GET_USER_DEETAIL_BY_TOKEN = `${server}api/business/details`
export const GET_VENDOR_DETAILS_BY_ID=(businessType,id)=>`${server}api/${businessType}/${id}`;
export const GET_ALL_PADDING_REQUEST= `${server}api/business/pending/requests`

//adding products and tests

//export const ADD_TEST_AND_PRODUCTS = `${server}api/product/create`;
//export const GET_TEST_AND_PRODUCTS = `${server}api/product/find/business`;
export const ADD_TESTS = `${server}api/test/create`;
export const ADD_PRODUCTS = `${server}api/product/create`;
export const GET_TESTS = `${server}api/test/find/business`;
export const GET_PRODUCTS = `${server}api/product/find/business`;
export const ADD_BULK_PRODUCTS = `${server}api/product/create/batch`;
export const GET_BOLK_PRODUCTS = `${server}api`;
export const ADD_BULK_TEST = `${server}api/test/create/batch`;
export const GET_BULK_PRODUCTS = `${server}api/product/find/bulk`;
export const GET_BULK_TESTS = `${server}api/test/find/bulk`;
export const UPDATE_MY_PRODUCT = (productId) => `${server}api/product/update/${productId}`;
export const UPDATE_MY_TEST = (testId) => `${server}/api/test/update/${testId}`;
export const GET_CATEGORIES=(type)=>`${server}api/category`;
export const ADD_CATEGORIES=`${server}api/category`;
export const GET_SALES_DETAILS=(phoneNo)=>`${server}api/order/get-details?businessPhoneNumber=${phoneNo}`;

//getting products or test categories
export const GET_PRODUCTS_CATEGORY = `${server}api/pharmacy/product/categories`
export const GET_TEST_CATEGORY = `${server}api/pharmacy/product/categories`

//getting staff roles
export const GET_HOSPITAL_STAFF_ROLES = `${server}api/pharmacy/staff/roles`
export const GET_PHARMACY_STAFF_ROLES = `${server}api/pharmacy/staff/roles`
export const GET_PATHOLOGO_STAFF_ROLES = `${server}api/pharmacy/staff/roles`

//appointment
export const createAppointment = `${server}api/appointment/`;
export const getAppointmentByBusiness = `${server}api/appointment/business`;
export const getAppointmentByCustomer = `${server}api/appointment/user`;
export const getAppointmentById = (id) => `${server}api/appointment/id/${id}`;
export const updateAppointmentByID = (id) => `${server}api/appointment/update/${id}`;
export const GET_ALL_PATIENTS=(patient_name)=>`${server}api/appointment/business/patients?patient_name=${patient_name}`;
export const GET_MATCHING_HOSPITAL_LISTS=(search)=>`${server}api/business?search=${search}&category=hospital`;
export const GET_MATCHING_DOCTORS_LIST=(search)=>`${server}api/business?search=${search}&category=doctor`;
export const ACCCEPT_BEING_ADDED_AS_DOCTOR=(hospitalPhone,doctorId)=>`${server}api/business/accept/doctor/${hospitalPhone}/doctor/${doctorId}`;
export const ACCEPT_BEING_ADDED_AS_HOSPITAL=(doctorPhone,hospitalId)=>`${server}api/business/accept/hospital/${doctorPhone}/doctor/${hospitalId}`;
export const REJECT_BEING_ADDED_AS_DOCTOR=(hospitalPhone,doctorId)=>`${server}api/business/reject/doctor/${hospitalPhone}/doctor/${doctorId}`;
export const REJECT_BEING_ADED_AS_HOSPITAL=(doctorPhone,hospitalId)=>`${server}api/business/reject/hospital/${doctorPhone}/doctor/${hospitalId}`;

//uploading files
export const UPLOAD_FILE = `${server}api/blob/upload`;

//orders details
export const GET_ORDERS_BY_BUSINESS = `${server}api/order/all/business`;
export const UPDATE_ORDER_BY_ID = (id) => `${server}api/order/update/${id}`;


export const FILE_UPLOAD = `${server}api/blob/upload/`;
