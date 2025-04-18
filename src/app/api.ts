export interface emailValidate {
  message?: string;
  email: string;
  otp?: string;
  contactNumber?: string;
  fullName?: string;
  hotelId?: string;
}

export interface userinfo {
  aboutMe: string;
  contact: string;
  email: string;
  id: number;
  name: string;
  profilePicUrl?: any;
}
