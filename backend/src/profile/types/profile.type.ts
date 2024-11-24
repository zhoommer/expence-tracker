export type Profile = {
  id: number;
  image?: string;
  phone: string;
  gender: "MALE" | "FEMALE";
  userId: string;
  lastname: string;
  birthDate: Date;
  firstname: string;
};
