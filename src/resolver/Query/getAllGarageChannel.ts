import * as iType from "../interface";
import * as R from 'ramda';
import { searchRefChannel, ROUTE_CHANNEL } from "./getChannel";
import { resultString } from "./resultString";


export async function getAllGarageChannel({ workshop, workspaceType }: iType.iMessage) {
  if (R.isEmpty(workshop)) {
    throw new Error('workshop empty');
  }
  console.log(workspaceType)
  if (workspaceType !== iType.ENUM_TYPE.GARAGE) {
    throw new Error('workspaceType not valid');
  }
  if (!workshop?.[0]?.id) {
    throw new Error('workshop id is nil');
  }

  const commentsRef = searchRefChannel(
    `workshop_${workshop[0].id}`,
    true,
    ROUTE_CHANNEL
  );
  return resultString(commentsRef)
}
