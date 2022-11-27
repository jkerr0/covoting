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

export const VotingSessionList: FC = () => {
  const API_URL: string = "voting_sessions";

  const [votingSessions, setVotingSessions] = useState<Array<VotingSession>>(
    []
  );
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [isFormAdd, setIsAdd] = useState<boolean>(true);
  const [selected, setSelected] = useState<VotingSession | undefined>();
  const [listUpdated, setListUpdated] = useState<boolean>(false);
  const defaultErrorHandler = useErrorHandler();

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
      .get(API_URL, getHeadersConfig())
      .then((response) => response.data)
      .then((data) => setVotingSessions(data))
      .then(() => setListUpdated(false))
      .catch(defaultErrorHandler);
  }, [listUpdated]);

  const handleEdit = (votingSession: VotingSession) => {
    setSelected(votingSession);
    handleOpenAddEditModal(false);
  };
  const handleDelete = (votingSession: VotingSession) => {
    axios
      .delete(API_URL + "/" + votingSession.id, getHeadersConfig())
      .then(() => setListUpdated(true))
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
            onSave={handleCloseAddEditModal}
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
              <TableCell>Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{votingSessions.map((session) => Row(session))}</TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[10, 15]}
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
