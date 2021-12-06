import { getDatabase, ref, remove } from "firebase/database";
import { ROUTE_CHANNEL } from "../Query/getChannel";


export async function deleteChannel({ channel }: any) {
  const db = getDatabase();
  const commentsRef = ref(db, [ROUTE_CHANNEL, '/', channel].join(''));
  await remove(commentsRef);
  return;
}
