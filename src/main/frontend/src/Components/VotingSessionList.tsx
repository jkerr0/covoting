import {
  Box,
  Button,
  ButtonGroup,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React, { FC, useState } from "react";
import { VotingSession } from "Utils/data";
import VotingSessionAddEditForm from "./VotingSessionAddEditForm";
import moment from "moment";
import useErrorHandler from "Hooks/useErrorHandler";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  deleteVotingSession,
  getVotingSessions,
} from "Services/voting-session-api-service";
import Queries from "Utils/queries";
import { AxiosError } from "axios";

const modalStyle: React.CSSProperties = {
  display: "block",
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "35vw",
  backgroundColor: "white",
  border: "none",
  maxHeight: "80vh",
  overflow: "auto",
};

const DATE_FORMAT: string = "DD.MM.yyyy hh:mm";

export const VotingSessionList: FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [isFormAdd, setIsAdd] = useState<boolean>(true);
  const [selected, setSelected] = useState<VotingSession | undefined>();
  const defaultErrorHandler = useErrorHandler();

  const handleOpenAddEditModal = (add: boolean) => {
    setModalOpen(true);
    setIsAdd(add);
  };

  const handleSave = () => {
    handleCloseAddEditModal();
  };
  const handleCloseAddEditModal = () => {
    setModalOpen(false);
    setSelected(undefined);
  };

  const queryClient = useQueryClient();

  const {
    data: votingSessions,
    error,
  } = useQuery<VotingSession[], AxiosError>(
    Queries.VOTING_SESSIONS,
    getVotingSessions
  );

  useErrorHandler(error);

  const deleteMutation = useMutation(deleteVotingSession, {
    onSuccess: () => {
      queryClient.invalidateQueries(Queries.VOTING_SESSIONS);
    },
    onError: defaultErrorHandler,
  });

  const handleEdit = (votingSession: VotingSession) => {
    setSelected(votingSession);
    handleOpenAddEditModal(false);
  };

  const Row = (votingSession: VotingSession) => {
    return (
      <TableRow key={votingSession.id}>
        <TableCell>{votingSession.name}</TableCell>
        <TableCell>
          {moment(votingSession.startDate).format(DATE_FORMAT)}
        </TableCell>
        <TableCell>
          <ButtonGroup>
            <Button onClick={() => handleEdit(votingSession)}>Edit</Button>
            <Button onClick={() => deleteMutation.mutate(votingSession)}>
              Delete
            </Button>
          </ButtonGroup>
        </TableCell>
      </TableRow>
    );
  };

  const FormModal = () => {
    return (
      <Modal open={modalOpen} onClose={handleCloseAddEditModal}>
        <Box style={modalStyle}>
          <VotingSessionAddEditForm
            isAdd={isFormAdd}
            votingSession={selected}
            afterSave={handleSave}
          />
        </Box>
      </Modal>
    );
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button
          variant="contained"
          style={{ margin: "20px" }}
          onClick={() => handleOpenAddEditModal(true)}
        >
          Add new session
        </Button>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Starts at</TableCell>
              <TableCell/>
            </TableRow>
          </TableHead>
          <TableBody>
            {votingSessions && votingSessions.map((session) => Row(session))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[10]}
                rowsPerPage={10}
                page={0}
                count={1}
                onPageChange={() => {}}
                onRowsPerPageChange={() => {}}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <FormModal />
    </Box>
  );
};

export default VotingSessionList;
