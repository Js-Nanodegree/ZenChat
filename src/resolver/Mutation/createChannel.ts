import {
  getDatabase,
  onChildAdded, push, ref, set
} from "firebase/database";
import * as R from "ramda";
import * as iType from "../interface";
import { workspaceSelect } from "../workspaceSelect";
import { ROUTE_CHANNEL } from "../Query/getChannel";
import { sendMessage } from "../sendMessage";


export async function createChannel({ client, appeal, workshop, workspaceType, members }: iType.iMessage) {
  let data;

  if (workspaceType === iType.ENUM_TYPE.APPEAL && appeal && client?.id && !R.isEmpty(workshop) && !R.isEmpty(members)) {
    data = workspaceSelect({ client, appeal, workshop, workspaceType, members });
  }
  if (workspaceType === iType.ENUM_TYPE.ADMIN && client?.id && !R.isEmpty(members)) {
    data = workspaceSelect({ client, appeal, workshop, workspaceType, members });
  }
  if (workspaceType === iType.ENUM_TYPE.GARAGE && !R.isEmpty(workshop) && !R.isEmpty(members)) {
    data = workspaceSelect({ client, appeal, workshop, workspaceType, members });
  }
  if (workspaceType === iType.ENUM_TYPE.CLIENT && !R.isEmpty(workshop) && !R.isEmpty(workshop) && client?.id) {
    data = workspaceSelect({ client, appeal, workshop, workspaceType, members });
  }
  if (!data) {
    throw new Error('params create not valid');
  }

  const messageChannel = workspaceSelect({ client, appeal, workshop, workspaceType, members});

  return new Promise(async (resolve, reject) => {
    const db = getDatabase();
    const commentsRef = ref(db, ROUTE_CHANNEL);

    if (R.isEmpty(messageChannel)) {
      throw new Error('params not valid');
    }

    const newPostRef = push(commentsRef);
    onChildAdded(commentsRef,  (data) => {
      if (data?.val()?.idChannel===messageChannel.idChannel) {
        resolve({ ...data.val(), uuid: data.key });
      }
    });

    await set(newPostRef, messageChannel).catch((error) => {
      reject(error);
    });
  });
}
