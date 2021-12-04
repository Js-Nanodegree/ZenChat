import { onValue } from "firebase/database";

export const resultString = (commentsRef: any) => {
  return new Promise((resolve, reject) => {
    onValue(commentsRef, (snapshot) => {
        let result: any = [];
        snapshot.forEach((child) => {
          console.log();
          result.push({ ...child.val(), uuid: child.key });
        });
        resolve(result);
    });
  });
};
