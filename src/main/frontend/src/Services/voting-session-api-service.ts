import axiosInstance from "Utils/axios-instance";
import { CurrentVotingInfo, Voting, VotingSession } from "Utils/data";
import getAxiosHeadersConfig from "Services/default-headers-provider";
import { findCredentials } from "./auth-service";

const apiUrl = "voting_sessions";

const getApiUrl = () => {
  if (!findCredentials()) {
    throw new Error("No credentials found");
  }
  const userTypePrefix = findCredentials().credentials?.userType.toLowerCase();
  return `${userTypePrefix}/${apiUrl}`;
};

export const getVotingSessions = async (): Promise<VotingSession[]> => {
  const response = await axiosInstance.get<VotingSession[]>(
    getApiUrl(),
    getAxiosHeadersConfig()
  );
  return response.data;
};

export interface NewVotingSession extends Omit<VotingSession, "id"> {}

export const postVotingSession = async (
  newVotingSession: NewVotingSession
): Promise<VotingSession> => {
  const response = await axiosInstance.post<VotingSession>(
    getApiUrl(),
    newVotingSession,
    getAxiosHeadersConfig()
  );
  return response.data;
};

export const putVotingSession = async (
  editedSession: VotingSession
): Promise<VotingSession> => {
  const response = await axiosInstance.put<VotingSession>(
    getApiUrl(),
    editedSession,
    getAxiosHeadersConfig()
  );
  return response.data;
};

export const deleteVotingSession = async (
  deletedSession: VotingSession
): Promise<void> => {
  return await axiosInstance.delete(
    `${getApiUrl()}/${deletedSession.id}`,
    getAxiosHeadersConfig()
  );
};

export const getVotingSessionVotingList = async (
  votingSession: VotingSession | undefined
): Promise<Voting[]> => {
  if (!votingSession) {
    return [];
  }
  const response = await axiosInstance.get(
    `${getApiUrl()}/${votingSession.id}/voting_list`,
    getAxiosHeadersConfig()
  );
  return response.data;
};

export const getVotingSessionCurrentVoting = async (
  votingSessionId: number
): Promise<CurrentVotingInfo> => {
  const response = await axiosInstance.get(
    `${apiUrl}/${votingSessionId}/current_voting`,
    getAxiosHeadersConfig()
  );
  return response.data;
};
