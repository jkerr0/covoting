import {
  Box,
  Button,
  ButtonGroup,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect } from "react";
import { VotingSession } from "../data";
import axios from "../axios-instance";
import { VotingSessionAddEditForm } from "./VotingSessionAddEditForm";
import moment from "moment";

const modalStyle: React.CSSProperties = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "white",
  border: "none",
};

const DATE_FORMAT: string = "DD.MM.yyyy hh:mm";

export default function VotingSessionList() {
  const API_URL: string = "voting_sessions";

  const [votingSessions, setVotingSessions] = React.useState<
    Array<VotingSession>
  >([]);
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [isFormAdd, setIsAdd] = React.useState<boolean>(true);
  const [selected, setSelected] = React.useState<VotingSession | undefined>();
  const [listUpdated, setListUpdated] = React.useState<boolean>(false);

  const handleOpenAddEditModal = (add: boolean) => {
    setModalOpen(true);
    setIsAdd(add);
  };
  const handleCloseAddEditModal = () => {
    setModalOpen(false);
    setSelected(undefined);
    setListUpdated(true);
  };

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => response.data)
      .then((data) => setVotingSessions(data))
      .then(() => setListUpdated(false))
      .catch(err => console.error(err))
  }, [listUpdated]);

  const handleEdit = (votingSession: VotingSession) => {
    setSelected(votingSession);
    handleOpenAddEditModal(false);
  };
  const handleDelete = (votingSession: VotingSession) => {
    axios
      .delete(API_URL + "/" + votingSession.id)
      .then(() => setListUpdated(true));
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
            onSave={handleCloseAddEditModal}
          ></VotingSessionAddEditForm>
        </Box>
      </Modal>
    );
  };

  return (
    <Box>
      <Button
        variant="contained"
        style={{ margin: "20px" }}
        onClick={() => handleOpenAddEditModal(true)}
      >
        Add new
      </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{votingSessions.map((session) => Row(session))}</TableBody>
        </Table>
      </TableContainer>
      <FormModal></FormModal>
    </Box>
  );
}
