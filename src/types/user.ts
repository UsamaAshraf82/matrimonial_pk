export type User_Type = {
  // ✅ Built-in Parse fields
  objectId: string;
  username: string;
  email?: string;
  createdAt: string;
  updatedAt: string;
  sessionToken?: string;

  // ✅ Your custom fields
//   firstName?: string;
//   lastName?: string;
//   phone?: string;
//   gender?: "male" | "female" | "other";
//   dateOfBirth?: string; // ISO date string
//   profileImage?: string; // URL

  // ✅ Example app-specific fields
//   isVerified?: boolean;
//   role?: "user" | "admin";
};
