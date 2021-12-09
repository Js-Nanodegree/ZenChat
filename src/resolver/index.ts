import { Query } from "./Query/getChannel";
import { deleteChannel } from "./Mutation/deleteChannel";
import { createChannel } from "./Mutation/createChannel";
import { sendMessage } from "./sendMessage";
import * as iType from "./interface";
import * as R from "ramda";

export const ROUTE_MESSAGE = "MESSAGE_TRASH";

export const resolvers = {
  Query: {
    channel: async (
      root: any,
      { input }: iType.iInput,
      context: any,
      info: any
    ) => {
      console.log(input)
      return await Query.currentChannel(input);
    },
    appealChannel: async (
      root: any,
      { input }: iType.iInput,
      context: any,
      info: any
    ) => {
      return await Query.currentChannel(input);
    },
    adminChannel: async (
      root: any,
      { input }: iType.iInput,
      context: any,
      info: any
    ) => {
      return await Query.currentChannel(input);
    },
    garageChannel: async (
      root: any,
      { input }: iType.iInput,
      context: any,
      info: any
    ) => {
      return await Query.currentChannel(input);
    },
  },
  Mutation: {
    createChannel: async (
      root: any,
      { input }: iType.iInput,
      context: any,
      info: any
    ) => {
      const data: any = await createChannel(input);
      await sendMessage({ message: 'create message', sharedMessage: { uuid: "", message: "" }, write: "", channel: data.idChannel })

      return data
    },
    sendMessage: async (
      root: any,
      { input }: iType.iInput,
      context: any,
      info: any
    ) => {
      return await sendMessage(input);
    },
    deleteChannel: async (
      root: any,
      { input }: iType.iInput,
      context: any,
      info: any
    ) => {
      return await deleteChannel(input);
    },
  },
};
