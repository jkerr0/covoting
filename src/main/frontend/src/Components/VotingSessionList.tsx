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
import React, { FC, useEffect, useState } from "react";
import { VotingSession } from "../data";
import axios from "../axios-instance";
import VotingSessionAddEditForm from "./VotingSessionAddEditForm";
import moment from "moment";
import getHeadersConfig from "../Services/default-headers-provider";
import useErrorHandler from "../Hooks/useErrorHandler";
import useEntityWithIdList from "../Hooks/useEntityWithIdList";

const modalStyle: React.CSSProperties = {
  display: 'block',
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: '35vw',
  backgroundColor: "white",
  border: "none",
  maxHeight: '80vh',
  overflow: 'auto'
};

const DATE_FORMAT: string = "DD.MM.yyyy hh:mm";

export const VotingSessionList: FC = () => {
  const API_URL: string = "voting_sessions";

  const [votingSessions, setVotingSessions, saveSession, deleteSession] = useEntityWithIdList<VotingSession>()
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [isFormAdd, setIsAdd] = useState<boolean>(true);
  const [selected, setSelected] = useState<VotingSession | undefined>();
  const defaultErrorHandler = useErrorHandler();

  const handleOpenAddEditModal = (add: boolean) => {
    setModalOpen(true);
    setIsAdd(add);
  };

  const handleSave = (votingSession: VotingSession) => {
    saveSession(votingSession)
    handleCloseAddEditModal();
  };
  const handleCloseAddEditModal = () => {
    setModalOpen(false);
    setSelected(undefined);
  };

  useEffect(() => {
    axios
      .get(API_URL, getHeadersConfig())
      .then((response) => response.data)
      .then((data) => setVotingSessions(data))
      .catch(defaultErrorHandler);
  }, [defaultErrorHandler]);

  const handleEdit = (votingSession: VotingSession) => {
    setSelected(votingSession);
    handleOpenAddEditModal(false);
  };
  const handleDelete = (votingSession: VotingSession) => {
    axios
      .delete(API_URL + "/" + votingSession.id, getHeadersConfig())
      .then(() => deleteSession(votingSession))
      .catch(defaultErrorHandler);
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
            <Button onClick={() => handleDelete(votingSession)}>Delete</Button>
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
            onSave={handleSave}
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
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{votingSessions.map((session) => Row(session))}</TableBody>
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
