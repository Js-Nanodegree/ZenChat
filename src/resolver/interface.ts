export const enum ENUM_TYPE {
  ADMIN="ADMIN",
  GARAGE="GARAGE",
  APPEAL="APPEAL",
  CLIENT="CLIENT",
};
export interface iClientName {
  first?: String;
  last?: String;
  middle?: String;
}
export interface iWorkShopInput {
  id: String;
  name?: String;
  phone?: String;
}
export interface iClient {
  id: string;
  phone?: String;
  name?: iClientName;
}
 export interface iMessage {
  appeal?: Number;
  workshop?: [iWorkShopInput];
  workspaceType: ENUM_TYPE;
  client?: iClient;
  members?:[iClient];
}
export interface iInput{
  input:iClientEntry
}

export interface  iClientEntry extends iMessage{
  channel?:String
  message?:String
}