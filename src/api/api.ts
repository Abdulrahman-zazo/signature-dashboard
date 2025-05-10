/* --------------------Auth------------------*/
export const LOGIN = "auth/dashboard/login";
export const USER_INFORMATION = "auth/dashboard/user-info";
export const LOGOUT = "auth/dashboard/logout";
export const FORGET_PASSWORD = "auth/dashboard/forget_password"; //will send code to email
export const CODE_TESTER = "auth/dashboard/verify_reset_password_b"; // will test code and email ? what retuer??
export const CHANGE_PASSWORD = "auth/dashboard/verify_reset_password"; // set email and pasword and new password
export const RESEND_CODE = "auth/dashboard/resend_verify_reset_password";

/* --------------------Order------------------*/
export const GET_ORDER = "orders";
export const GET_ORDER_BY_CLASSIFICATION = "orders/by-classification";
export const ACCEPT_ORDER = "orders/accept";
export const CANCEL_ORDER = "orders/cancel";

/* --------------------Address------------------*/
export const GET_ALL_ADDRESS = "address/dashboard/all";

/* --------------------Address/Country------------------*/
export const GET_ALL_COUNTRIES = "address/dashboard/country/all";
export const ADD_COUNTRIES = "address/dashboard/country/add";
export const UPDATE_COUNTRIES = "address/dashboard/country/update";
export const DELETE_COUNTRIES = "address/dashboard/country/delete";

/* --------------------Address/Cities------------------*/
export const GET_ALL_CITIES = "address/dashboard/city/all";
export const ADD_CITIES = "address/dashboard/city/add";
export const UPDATE_CITIES = "address/dashboard/city/update";
export const DELETE_CITIES = "address/dashboard/city/delete";

/* --------------------Address/ Region------------------*/
export const GET_ALL_REGIONS = "address/dashboard/region/all";
export const ADD_REGIONS = "address/dashboard/region/add";
export const UPDATE_REGIONS = "address/dashboard/region/update";
export const DELETE_REGIONS = "address/dashboard/region/delete";

/* --------------------info-contact------------------*/
export const GET_INFO_CONTACT = "admin/dashboard/info-contact/all";
export const ADD_INFO_CONTACT = "superadmin/dashboard/info-contact/add";
export const UPDATE_INFO_CONTACT = "superadmin/dashboard/info-contact/edit";
export const DELETE_INFO_CONTACT = "superadmin/dashboard/info-contact/delete";

/* --------------------Users------------------*/
export const GET_ALL_USERS = "admin/dashboard/all-users";
export const ADD_USERS = "admin/dashboard/add-user";
export const UPDATE_USERS = "admin/dashboard/edite-user";
export const DELETE_USERS = "admin/dashboard/delete-user";
export const CHANGE_STATUS_USERS = "admin/dashboard/change-status-user";

/* --------------------Super------------------*/

/* --------------------Super/Admin------------------*/
export const GET_ALL_ADMIN = "superadmin/dashboard/admin/all";
export const ADD_ADMIN = "superadmin/dashboard/admin/add";

export const GET_ALL_USERS_SUPER = "superadmin/dashboard/user/all";
export const ADD_ADMIN_SUPER = "superadmin/dashboard/user/add";
export const UPDATE_USERS_SUPER = "superadmin/dashboard/user/edite";
export const DELETE_USERS_SUPER = "superadmin/dashboard/user/delete";
export const CHANGE_STATUS_USER_TO_ADMIN =
  "superadmin/dashboard/user/change-status";
export const CHANGE_USER_ROLE_TO_ADMIN =
  "superadmin/dashboard/user/change-role";

/* --------------------Super/Roles------------------*/
export const GET_ALL_ROLES = "superadmin/dashboard/role/all";
export const UPDATE_PERMISSIONS =
  "superadmin/dashboard/role/update-permissions";

/* --------------------Super/Permissions------------------*/

export const GET_UPDATE_ROLES = "superadmin/dashboard/permission/all";

/* --------------------Super/info contact ------------------*/

export const GET_INFO_CONTACT_SUPER = "superadmin/dashboard/info-contact/all";
export const ADD_INFO_CONTACT_SUPER = "superadmin/dashboard/info-contact/add";
export const UPDATE_INFO_CONTACT_SUPER =
  "superadmin/dashboard/info-contact/edit";
export const DELETE_INFO_CONTACT_SUPER =
  "superadmin/dashboard/info-contact/delete";

/* --------------------AD Package ------------------*/

export const GET_PACKAGE = "ad-package/dashboard/package/all";
export const ADD_PACKAGE = "ad-package/dashboard/package/add";
export const UPDATE_PACKAGE = "ad-package/dashboard/package/edit";
export const DELETE_PACKAGE = "ad-package/dashboard/package/delete";

/* --------------------AD------------------*/

export const GET_AD = "ad-package/dashboard/package/ad/all";
export const ADD_AD = "ad-package/dashboard/package/ad/add";
export const UPDATE_AD = "ad-package/dashboard/package/ad/edit";
export const DELETE_AD = "ad-package/dashboard/package/ad/delete";
export const CHANGE_STATUS_AD = "ad-package/dashboard/ad/change-status";

/* --------------------Features------------------*/

export const GET_FEATURES = "ad-package/dashboard/feature/all";
export const ADD_FEATURES = "ad-package/dashboard/feature/add";
export const UPDATE_FEATURES = "ad-package/dashboard/feature/edit";
export const DELETE_FEATURES = "ad-package/dashboard/feature/delete";

/* --------------------Complaints------------------*/

export const GET_COMPLAINTS = "complaints/dashboard/all";
export const ADD_COMPLAINTS = "complaints/dashboard/add-reply";

/* --------------------
Config------------------*/

export const GET_CLASSIFICATION = "config/dashboard/get-classifications";
export const GET_ALL_CONFIG = "config/dashboard/get-all-config";
export const GET_CONFIG_ATTRIBUTES = "config/dashboard/get-config-attributes";
export const GET_FEATURES_CONFIG = "config/dashboard/get-features";
export const GET_ALL_LANGUAGES = "config/dashboard/get-all-languages";
export const GET_LANGUAGES_APP = "config/dashboard/get-language-app";
export const GET_CHANGE_LANGUAGES = "config/mobile/change-language";

/* --------------------
Properties------------------*/

/* --------------------
Room type------------------*/
export const GET_ROOM_TYPE = "properties/dashboard/room-type/all";
export const ADD_ROOM_TYPE = "properties/dashboard/room-type/add";
export const UPDATE_ROOM_TYPE = "properties/dashboard/room-type/update";
export const DELETE_ROOM_TYPE = "properties/dashboard/room-type/delete";

/* --------------------
Main Categories------------------*/

export const GET_MAIN_CATIGORIES = "properties/dashboard/main-categories/all";
export const ADD_SUB_CATIGORIES = "properties/dashboard/room-type/add";
export const UPDATE_SUB_CATIGORIES = "properties/dashboard/room-type/update";
export const DELETE_SUB_CATIGORIES = "properties/dashboard/room-type/delete";

/* --------------------
Sub Categories------------------*/

export const GET_ALL_SUB_MAIN_CATIGORIES =
  "properties/dashboard/sub-categories/all/2"; //??????????
export const ADD_MAIN_CATIGORIES = "properties/dashboard/sub-categories/add";
export const UPDATE_MAIN_CATIGORIES =
  "properties/dashboard/sub-categories/update";
export const DELETE_MAIN_CATIGORIES =
  "properties/dashboard/sub-categories/delete";

export const GET_ALL_CATEGORIES = "properties/dashboard/categories/all";

/* --------------------
Directions------------------*/
export const GET_DIRECTIONS = "properties/dashboard/directions/all";
export const ADD_DIRECTIONS = "properties/dashboard/directions/add";
export const UPDATE_DIRECTIONS = "properties/dashboard/directions/update";
export const DELETE_DIRECTIONS = "properties/dashboard/directions/delete";

/* --------------------
Services/ ------------------*/
export const GET_ALL_SERVICES_CATIGORIES = "services/dashboard/services/all";
export const ALL_SERVICES_CATIGORIES_WITH_PROVIDERS =
  "services/dashboard/services/all-with-providers";
export const ADD_SERVICES_CATIGORIES = "services/dashboard/services/add";
export const UPDATE_SERVICES_CATIGORIES = "services/dashboard/services/update";
export const DELETE_SERVICES_CATIGORIES = "services/dashboard/services/delete";

/* --------------------
Services 
Providers------------------*/
export const GET_PROVIDERS_SERVICES = "services/dashboard/providers/all/2";
export const ADD_PROVIDERS_SERVICES = "services/dashboard/providers/add";
export const UPDATE_PROVIDERS_SERVICES = "services/dashboard/providers/update";
export const DELETE_PROVIDERS_SERVICES = "services/dashboard/providers/delete";

/* --------------------
Services 
Providers Orders------------------*/
export const GET_ALL_ORDER_PROVIDERS_SERVICES = "services/dashboard/orders/all";
export const ACCEPT_ORDER_PROVIDER_SERVICES =
  "services/dashboard/orders/accept";
export const CANCEL_ORDER_PROVIDER_SERVICES =
  "services/dashboard/orders/cancel";

export const GET_MY_NOTIFICATIONS = "user/dashboard/my-notifications";
export const UPDATE_MY_INFO = "user/dashboard/update-my-info";
export const GET_USER_INFO = "user/dashboard/get-user-profile";
