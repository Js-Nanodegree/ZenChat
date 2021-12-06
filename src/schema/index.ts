import { gql } from "apollo-server-express";

export const schema = gql`
  input MemberUser{
    first: String
    last: String
    middle: String
  }

  input WorkShopInput {
    id: Int
    name: String
    phone: String
    address: String
  }

  input WorkShopMemberInput {
    id: Int
    name: MemberUser
    phone: String
  }

  input MessageInput {
    appeal: Int
    workshop: [WorkShopInput]
    workspaceType: ENUM_TYPE 
    client: WorkShopInput
    members:[WorkShopMemberInput]
  }

  enum ENUM_TYPE {
    ADMIN
    APPEAL
    GARAGE
    CLIENT
  }

  input DeleteChannel {
    channel: String
  }

  input AddedMembersInput {
    client: WorkShopInput
  }
  input UpdateMembersInput {
    id: Int
    client: WorkShopInput
  }
  input DeleteMembersInput {
    id: Int
    client: WorkShopInput
    type: String
  }

  input AppealInputChannel{
    appeal:Int
  }

  input AdminInputChannel{
    client:Int
  }

  input GarageInputChannel{
    workshop: [WorkShopInput]
  }

  type Query {
    channel(input: MessageInput): [Channel]
    appealChannel(input:AppealInputChannel):[Channel]
    adminChannel(input:AdminInputChannel):[Channel]
    garageChannel(input:[WorkShopInput]):[Channel]
  }

  input SharedMessageInput{
    uuid: String
    message: String
  }

  input SendMessageInput{
    channel:String
    message:String
    sharedMessage:SharedMessageInput
    write:Int
  }

  type Mutation {
    createChannel(input: MessageInput): Channel
    addedMembers(input: AddedMembersInput): Channel
    updateMembers(input: UpdateMembersInput): Channel
    deleteMembers(input: DeleteMembersInput): Channel
    sendMessage(input:SendMessageInput):String
    deleteChannel(input: DeleteChannel): Channel
  }

  type Channel {
    appealId:Int
    clientId:Int
    idChannel: String!
    members: [UserClient]
    workshop:[Garage]
    admin:Boolean
    workspaceType:ENUM_TYPE
    uuid:String
  }

  type Garage{
    id:Int
    name:String
    phone:String
    address:String
  }

  type UserClient {
    id: Int
    name: NameClient
    phone: String
  }

  type NameClient {
    first: String
    last: String
    middle: String
  }
`;
