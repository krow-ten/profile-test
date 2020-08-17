import profiles from "../../mocks/profiles.json";
import { User } from "../types";

interface UserData {
  first_name: string;
  other_names: string;
  address: { street: string; town: string; county: string; postcode: string };
  mobile: string;
  email: string;
  company: string;
  preferences: { contact: string[] };
}
const transform = (userData: UserData): User => {
  const {
    first_name: firstName,
    other_names: otherNames,
    address: { street, town, county, postcode },
    mobile,
    email,
    company,
    preferences: { contact },
  } = userData;
  return {
    firstName,
    otherNames,
    address: { street, town, county, postcode },
    mobile,
    email,
    company,
    preferences: {
      contact: {
        mail: contact.includes("mail"),
        sms: contact.includes("sms"),
      },
    },
  };
};

export default ({
  userName,
  password,
}: {
  userName: string;
  password: string;
}): User => {
  if (userName === "jw" && password) {
    return transform(profiles.users[0]);
  }

  throw new Error("401");
};
