import type { ChatEnum } from "../enums/chat";

export interface AuthSession  {
	id: string;
};

export interface MessageStore  {
	text: string;
  id: string;
	type: string;
  sender_id: string;
  chat_room_id: string;
  createdAt: string;
};

export interface ResponseSession {
	user: AuthSession;
};

export interface LoginDto {
	email: string;
	password: string;
};


export interface User {
  id: string;
  email: string;
  hashed_password: string;
  createdAt: Date;
  updatedAt: Date;

  profile: Profile;
  sendedMessages: Message[];
  chatRooms: ChatRoomMember[];
  contactsOf: Contact[];
  contacts: Contact[];
}

export interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  image_url: string;
  createdAt: Date;
  updatedAt: Date;

  user: User;
}

export interface Contact {
  id: string;
  user_id: string;
  contact_name: string;
  contact_id: string;
  createdAt: Date;
  updatedAt: Date;

  user: User;
  contact: User;
}

export type ChatType = 'PRIVATE' | 'GROUP';

export interface ChatRoom {
  id: string;
  type: ChatType;
  createdAt: Date;
  updatedAt: Date;

  messages: Message[];
  members: ChatRoomMember[];
  groups: Group[];
}

export interface ChatRoomMember {
  id: string;
  chat_room_id: string;
  user_id: string;
  createdAt: Date;
  updatedAt: Date;

  chatRoom?: ChatRoom;
  user?: User;
}

export interface Group {
  id: string;
  group_name: string;
  group_avatar: string;
  chat_room_id: string;
  createdAt: Date;
  updatedAt: Date;

  chatRoom?: ChatRoom;
}

export interface Message {
  id: string;
  chat_room_id: string;
  sender_id: string;
  text: string;
  createdAt: string;
  updatedAt: string;

  chatRoom?: ChatRoom;
  sender?: User;
}

