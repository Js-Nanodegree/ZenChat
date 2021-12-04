import { Query } from '../resolver/Query'
import { initializeApp } from "firebase/app";
import * as iType from "../resolver/interface";

initializeApp({
  apiKey: 'AIzaSyBAnJSjK8SAP267JQHKy5xHWiBl2lb_KN8',
  authDomain: 'zencar-client.firebaseapp.com',
  projectId: 'zencar-client',
  storageBucket: 'zencar-client.appspot.com',
  messagingSenderId: '1004420877530',
  appId: '1:1004420877530:web:b055b5653b8e1a3627a9e3',
  measurementId: 'G-C7RVKHYXBM',
  databaseURL: 'https://zencar-client.firebaseio.com/',
});

describe('', () => {
  test('', async () => {
    const message = { workspaceType: iType.ENUM_TYPE.APPEAL,appeal:14223,workshop:[{id:323}], client: { id: 123 } }
    // const createChannel = await Query.createChannel(message)
  })
})

console.log(Query)