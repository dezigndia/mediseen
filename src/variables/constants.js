export const baseUrl = "http://43.204.17.144/:5001/api/";
export const testurl = "http://localhost:5001/api/";
export const endPointsArray = {
  get_businesses: {
    endpoint: "admin/get-businesses",
    method: "GET",
  },
  get_admins: {
    endpoint: "admin/get-admins",
    method: "GET",
  },
  admin_login: {
    endpoint: "auth/admin-login",
    method: "POST",
  },
  add_admin: {
    endpoint: "admin/add-admin",
    method: "POST",
  },
  remove_admin: {
    endpoint: "admin/remove-admin",
    method: "POST",
  },
  get_businesses: {
    endpoint: "admin/get-businesses",
    method: "GET",
  },
  get_total_users: {
    endpoint: "admin/get-total-users",
    method: "GET",
  },
  get_orders: {
    endpoint: "admin/get-orders",
    method: "GET",
  },
  get_users: {
    endpoint: "admin/get-users",
    method: "GET",
  },
  get_total_businesses: {
    endpoint: "admin/get-total-businesses",
    method: "GET",
  },
  get_products: {
    endpoint: "admin/get-products",
    method: "GET",
  },
  get_tests: {
    endpoint: "admin/get-tests",
    method: "GET",
  },
  order_trend: {
    endpoint: "admin/get-monthly-orders",
    method: "GET",
  },
  weekly_appointment_trend: {
    endpoint: "admin/get-weekly-appointment-trend",
    method: "POST",
  },
  remove_product: {
    endpoint: "admin/remove-product",
    method: "POST",
  },
  new_business_this_month: {
    endpoint: "admin/new-business-this-month",
    method: "GET",
  },
  total_users: {
    endpoint: "admin/get-total-patients",
    method: "GET",
  },
  get_relative_amount: {
    endpoint: "admin/get-relative-amounts",
    method: "GET",
  },
  total_OA_month: {
    endpoint: "admin/get-total-oa-month",
    method: "GET",
  },
  update_business_status: {
    endpoint: "admin/update-business-status",
    method: "PUT",
  },
  send_otp: {
    endpoint: "admin/send-otp",
    method: "POST",
  },
  login_by_otp: {
    endpoint: "admin/verify-otp",
    method: "POST",
  },
  set_password: {
    endpoint: "admin/set-password",
    method: "POST",
  },
  total_active_business: {
    endpoint: "admin/get-active-business",
    method: "GET",
  },
  new_oa_month: {
    endpoint: "admin/new-oa-month",
    method: "GET",
  },
  successful_oa: {
    endpoint: "admin/successful-oa",
    method: "GET",
  },
  active_business_month: {
    endpoint: "admin/get-active-business",
    method: "GET",
  },
  returning_business: {
    endpoint: "admin/returning-business",
    method: "GET",
  },
  returning_patients: {
    endpoint: "admin/returning-patients",
    method: "GET",
  },
};
export const alert = {
  success: "success",
  warning: "warning",
  error: "error",
  info: "info",
};

export const alertMessages = {
  unexpectedError: "Something went wrong, try again!",
};
