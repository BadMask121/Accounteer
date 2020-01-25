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

interface createItemProps {
  id: any;
  itemname: String;
  itemprice: Float32Array;
}
export {SignupPayload, Login, createItemProps};
