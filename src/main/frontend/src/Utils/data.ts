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
}

export enum MajorityType {
  SIMPLE = "SIMPLE",
  ABSOLUTE = "ABSOLUTE",
  EFFECTIVE = "EFFECTIVE",
  UNANIMITY = "UNANIMITY",
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