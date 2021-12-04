import {
  getDatabase,
  onValue,
  orderByChild,
  query,
  ref,
  equalTo,
} from "firebase/database";
import * as iType from "../interface";
import { getAllAdminChannel } from "./getAllAdminChannel";
import { getAllAppealChannel } from "./getAllAppealChannel";
import { getAllGarageChannel } from "./getAllGarageChannel";
import { resultString } from "./resultString";
import * as R from 'ramda'

export const ROUTE_CHANNEL = "CHANNEL_LIST";
export const searchRefChannel = (
  keySearch: any,
  value: number | boolean | string | null,
  route: string
) => {
  const db = getDatabase();
  return query(ref(db, route), orderByChild(keySearch), equalTo(value));
};

export const Query = {
  getAllAdminChannel,
  getAllGarageChannel,
  getAllAppealChannel,
  currentChannel({ appeal, client, workshop, workspaceType }: any) {
    if (workspaceType === iType.ENUM_TYPE.APPEAL) {
      if (appeal || client || workshop) {
        return this.getAllAppealChannel({
          appeal,
          client,
          workshop,
          workspaceType,
        });
      }
    }
    if (workspaceType === iType.ENUM_TYPE.ADMIN && client?.id) {
      return this.getAllAdminChannel({ client, workspaceType });
    }
    if (workspaceType === iType.ENUM_TYPE.CLIENT && client?.id) {
      return this.getAllAdminChannel({ client, workspaceType });
    }
    if (workspaceType === iType.ENUM_TYPE.GARAGE && workshop) {
      return this.getAllGarageChannel({ workshop, workspaceType });
    }
    throw new Error("Params not Valid");
  },
  async profileChannel({ channel }: any) {
    if (!channel) {
      throw new Error("Channel not Found");
    }
    const commentsRef = searchRefChannel("idChannel", channel, ROUTE_CHANNEL);
    return new Promise((resolve, reject) => {
      onValue(commentsRef, (snapshot: any) => {
        snapshot.forEach((element: any) => {
          console.log(
            { ...element.val(), uuid: snapshot.key })
          resolve({ ...element.val()})
        })
      }, {
        onlyOnce: true
      });
    });
  },
};
