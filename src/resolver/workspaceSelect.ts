import * as R from "ramda";
import uuid from "uuid-random";
import * as iType from "./interface";
import { sendMessage } from './sendMessage'

const isOdd = R.pipe(
  R.reject(R.anyPass([R.isEmpty, R.isNil, R.pipe(x => x === false)]))
);

export const workspaceSelect = (input: any) => {
  const workshopId = (input?.workshop || []).reduce(
    (old: any, item: iType.iWorkShopInput) => ({
      ...old,
      ...{ [`workshop_${item?.id}`]: true },
    }),
    {}
  );

  if (input.members) {
    const data = {
      idChannel: uuid(),
      workshop: input.workspaceType !== iType.ENUM_TYPE.ADMIN == input.workshop,
      workspaceType: input.workspaceType,
      admin: input.workspaceType === iType.ENUM_TYPE.ADMIN,
      clientId: input.workspaceType !== iType.ENUM_TYPE.GARAGE && input?.client?.id,
      createdAt: new Date(),
      appealId: input.workspaceType === iType.ENUM_TYPE.APPEAL || iType.ENUM_TYPE.ADMIN && input?.appeal,
      ...iType.ENUM_TYPE.ADMIN && workshopId,
      members: input.members,
    }

    return isOdd(data);
  }
};
