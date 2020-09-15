export interface User {
  id: string;
  name: string;
  picture: string;
}
export interface Reaction {
  id: number;
  content: string;
  created_at: string;
  user_id: string;
  entry_id: number;
}

export interface Entry {
  id: number;
  week: number;
  month: number;
  year: number;
  image: {
    fixed_width_webp_url?: string;
    fixed_width_url?: string;
    original_url: string;
    color?: string;
  };
  user: User;
  presented?: boolean;
  reactions: Reaction[];
}

export type TeamStatus = 'DEFAULT' | 'STARTED' | 'ENDED';

interface Team {
  id: number;
  name: string;
  status: TeamStatus;
  entry?: { id: number };
  entries: Entry[];
}

export type Lobby = User & {
  team: Team;
  role: 'PARTICIPANT' | 'HOST';
};

export type TeamLobby = User & {
  role: 'PARTICIPANT' | 'HOST';
  team: {
    id: number;
    name: string;
    active: boolean;
    status: TeamStatus;
    changed_entry_at: string;
    entries: Entry[];
    participants: User[];
    entry?: Entry;
  };
};
