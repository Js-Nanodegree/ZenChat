import * as iType from "../interface";
import { searchRefChannel, ROUTE_CHANNEL } from "./getChannel";
import { resultString } from "./resultString";

export async function getAllAdminChannel({ client, workspaceType=iType.ENUM_TYPE.ADMIN }: iType.iMessage) {
  if (!client?.id) {
    throw new Error('params not valid');
  }

  if (![iType.ENUM_TYPE.CLIENT, iType.ENUM_TYPE.ADMIN].includes(workspaceType)) {
    throw new Error('workspaceType not valid');
  }

  let commentsRef = searchRefChannel(
    "clientId",
    client.id,
    ROUTE_CHANNEL
  );

  if (workspaceType === iType.ENUM_TYPE.ADMIN) {
    console.log('3123')
    commentsRef = searchRefChannel(
      "admin",
      true,
      ROUTE_CHANNEL
    );
  }
  return resultString(commentsRef)
}
