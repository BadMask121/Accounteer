import React, {Component} from 'react';
import Firestore from '@react-native-firebase/firestore';

export class FirebaseAuthentication {
  constructor(private store: Firestore) {}
  signup = async values => {
    const user = await this.store()
      .collection('user')
      .add(values)
      .catch(err => console.log(err));
    console.log(user);
  };
}

export default FirebaseAuthentication;
