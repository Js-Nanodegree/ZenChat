import * as iType from "../interface";
import { searchRefChannel, ROUTE_CHANNEL } from "./getChannel";
import { resultString } from "./resultString";

export async function getAllAppealChannel({ appeal, client, workshop, workspaceType }: any) {
  if (workspaceType === iType.ENUM_TYPE.APPEAL && appeal) {
    const commentsRef = searchRefChannel(
      "appealId",
      appeal,
      ROUTE_CHANNEL
    );
    return resultString(commentsRef)
  }
  if (workspaceType === iType.ENUM_TYPE.CLIENT && client?.id) {
    const commentsRef = searchRefChannel(
      'clientId',
      client?.id,
      ROUTE_CHANNEL
    );
    return resultString(commentsRef)
  }
  if (workspaceType === iType.ENUM_TYPE.GARAGE && workshop?.[0]?.id) {
    const commentsRef = searchRefChannel(
      `workshop_${workshop[0].id}`,
      true,
      ROUTE_CHANNEL
    );
    return resultString(commentsRef)
  }
  throw new Error('params not this valid');
}
