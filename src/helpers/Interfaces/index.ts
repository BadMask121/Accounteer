interface SignupPayload {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  organisation: {
    organisationname: string;
    organisationlocation: string;
  };
}
interface Login {
  email: string;
  password: string;
}
export {SignupPayload, Login};
