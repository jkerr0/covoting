import axiosInstance from "Utils/axios-instance";
import { Voting, VotingSession } from "Utils/data";
import getHeadersConfig from "Services/default-headers-provider";

const apiUrl = "voting_sessions";

export const getVotingSessions = async (): Promise<VotingSession[]> => {
  const response = await axiosInstance.get<VotingSession[]>(
    apiUrl,
    getHeadersConfig()
  );
  return response.data;
};

export interface NewVotingSession extends Omit<VotingSession, "id"> {
}

export const postVotingSession = async (
  newVotingSession: NewVotingSession
): Promise<VotingSession> => {
  const response = await axiosInstance.post<VotingSession>(
    apiUrl,
    newVotingSession,
    getHeadersConfig()
  );
  return response.data;
};

export const putVotingSession = async (
  editedSession: VotingSession
): Promise<VotingSession> => {
  const response = await axiosInstance.put<VotingSession>(
    apiUrl,
    editedSession,
    getHeadersConfig()
  );
  return response.data;
};

export const deleteVotingSession = async (
  deletedSession: VotingSession
): Promise<void> => {
  return await axiosInstance.delete(
    `${apiUrl}/${deletedSession.id}`,
    getHeadersConfig()
  );
};

export const getVotingSessionVotingList = async (
  votingSession: VotingSession | undefined
): Promise<Voting[]> => {
  if (!votingSession) {
    return []
  }
  const response = await axiosInstance.get(
    `${apiUrl}/${votingSession.id}/voting_list`,
    getHeadersConfig()
  )
  return response.data
}