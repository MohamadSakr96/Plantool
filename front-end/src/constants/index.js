// For local server use http://localhost:8080-
const SERVER_URL = "http://13.58.86.86:3000";

// AUTH APIS
export const LOGIN_URL = SERVER_URL+"/api/auth/login";
export const REGISTER_URL = SERVER_URL+"/api/auth/register";
export const LOGOUT_URL = SERVER_URL+"/api/auth/logout";

// EMPLOYEE APIS
export const EMP_GET_ALL_USERS_URL = SERVER_URL+"/api/employee/getAllUsers";
export const EMP_UPDATE_PROFILE_URL = SERVER_URL+"/api/employee/updateProfile";

// ADMIN APIS
export const UPDATE_NOTIFICATION_TOKEN = SERVER_URL+"/api/admin/updateNotificationToken";
export const GET_ALL_USERS_URL = SERVER_URL+"/api/admin/getAllUsers";
export const UPDATE_PROFILE_URL = SERVER_URL+"/api/admin/updateProfile";
export const GET_PENDING_REQUESTS_URL = SERVER_URL+"/api/admin/pending";
export const ACCEPT_REQUEST_URL = SERVER_URL+"/api/admin/acceptRequest";
export const REJECT_REQUEST_URL = SERVER_URL+"/api/admin/rejectRequest";
export const GET_ALL_PROJECTS_URL = SERVER_URL+"/api/admin/getAllProjects";
export const CREATE_PROJECT_URL = SERVER_URL+"/api/admin/createProject";
export const CREATE_EVENT_URL = SERVER_URL+"/api/admin/createEvent";
export const UPDATE_TEAM_MEMBER_URL = SERVER_URL+"/api/admin/updateTeamMember";
