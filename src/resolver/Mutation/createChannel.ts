import {
  getDatabase,
  onChildAdded, push, ref, set
} from "firebase/database";
import * as R from "ramda";
import * as iType from "../interface";
import { workspaceSelect } from "../workspaceSelect";
import { ROUTE_CHANNEL } from "../Query/getChannel";


export async function createChannel({ client, appeal, workshop, workspaceType }: iType.iMessage) {
  let data;

  if (workspaceType === iType.ENUM_TYPE.APPEAL && appeal && client && !R.isEmpty(workshop)) {
    data = workspaceSelect({ client, appeal, workshop, workspaceType });
  }
  if (workspaceType === iType.ENUM_TYPE.ADMIN && client?.id) {
    data = workspaceSelect({ client, appeal, workshop, workspaceType });
  }
  if (workspaceType === iType.ENUM_TYPE.GARAGE && !R.isEmpty(workshop)) {
    data = workspaceSelect({ client, appeal, workshop, workspaceType });
  }
  if (!data) {
    throw new Error('params not valid');
  }

  const messageChannel = workspaceSelect({ client, appeal, workshop, workspaceType });

  return new Promise(async (resolve, reject) => {
    const db = getDatabase();
    const commentsRef = ref(db, ROUTE_CHANNEL);

    if (R.isEmpty(messageChannel)) {
      throw new Error('params not valid');
    }

    const newPostRef = push(commentsRef);
    onChildAdded(commentsRef, (data) => {
      if (messageChannel?.channel === data?.val()?.channel) {
        resolve({ ...data.val(), uuid: data.key });
      }
    });

    await set(newPostRef, messageChannel).catch((error) => {
      reject(error);
    });
  });
}
