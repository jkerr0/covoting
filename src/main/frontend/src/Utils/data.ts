export interface WithId {
  id: number;
}

export interface WithSeq {
  seq: number;
}
export interface VotingSession extends WithId {
  name: string;
  startDate: string;
  isPublished: boolean;
  votingList: Voting[];
  isClosed?: boolean;
  currentVotingSeq?: number;
}

export enum MajorityType {
  SIMPLE = "SIMPLE",
  ABSOLUTE = "ABSOLUTE",
  EFFECTIVE = "EFFECTIVE",
}

export interface Voting extends WithSeq {
  id?: number;
  name: string;
  majorityType: MajorityType;
}

export interface CurrentVotingInfo {
  voting: Voting;
  started: boolean;
  votingCount: number;
  sessionClosed: boolean;
}

export interface VotingProgress {
  maxVotes: number;
  currentVotes: number;
}

export interface ApplicationUser extends WithId {
  fullName: string;
  email: string;
  voteWeight: number;
}

export interface VotingResult {
  name: string;
  forCount: number;
  againstCount: number;
  abstainCount: number;
  accepted: boolean;
}
