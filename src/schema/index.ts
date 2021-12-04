import { gql } from "apollo-server-express";

export const schema = gql`
  input WorkNameInput {
    address: String
    name: String
    first: String
    last: String
    middle: String
  }

  input WorkShopInput {
    id: Int
    name: String
    phone: String
  }

  input MessageInput {
    appeal: Int
    workshop: [WorkShopInput]
    workspaceType: ENUM_TYPE 
    client: WorkShopInput
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
    members: [Members]
    workshop:[Garage]
    admin:Boolean
    workspaceType:ENUM_TYPE
    uuid:String
  }

  type Members{
    client: [User]
    garage:[User]
  }

  type Workspace {
    type: String
    client: User
    garage:[Garage]
  }

  type Garage{
    id:Int
    name:String
    phone:String
    address:String
  }

  type User {
    id: Int
    name: Name
    phone: String
  }

  type Name {
    first: String
    last: String
    middle: String
  }
`;
