import * as R from "ramda";
import uuid from "uuid-random";
import * as iType from "./interface";

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
  
  const data = {
    idChannel: uuid(),
    members: input.members,
    workshop: input.workshop,
    workspaceType: input.workspaceType,
    admin: input.workspaceType === iType.ENUM_TYPE.ADMIN,
    clientId: input?.client?.id,
    appealId: input?.appeal,
    ...workshopId,
  }

  console.log({data})

  return isOdd(data);
};
