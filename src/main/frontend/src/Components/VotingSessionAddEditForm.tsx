import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { FC, useState } from "react";
import { VotingSession } from "../data";
import axios from "../axios-instance";
import moment from "moment";
import getHeadersConfig from "../Services/default-headers-provider";
import useErrorHandler from "../Hooks/useErrorHandler";

interface AddEditFormProps {
  isAdd: boolean;
  votingSession?: VotingSession;
  onSave: Function;
}

const DATE_FORMAT: string = "yyyy-MM-DDThh:mm";

export const VotingSessionAddEditForm: FC<AddEditFormProps> = ({
  isAdd,
  votingSession,
  onSave,
}) => {
  const [name, setName] = useState<string | undefined>(
    isAdd ? undefined : votingSession?.name
  );
  const [date, setDate] = useState<string>(
    isAdd || votingSession === undefined
      ? moment().format(DATE_FORMAT)
      : moment(votingSession.startDate).format(DATE_FORMAT)
  );

  const handleAddEdit = () => {
    isAdd ? handleAdd() : handleEdit();
    onSave();
  };

  const defaultErrorHandler = useErrorHandler();

  const handleEdit = () => {
    axios
      .put<VotingSession>(
        "voting_sessions",
        {
          id: votingSession?.id,
          name: name,
          startDate: moment(date).toISOString(),
        },
        getHeadersConfig()
      )
      .catch(defaultErrorHandler);
  };

  const handleAdd = () => {
    axios
      .post<VotingSession>(
        "voting_sessions",
        {
          name: name,
          startDate: moment(date).toISOString(),
        },
        getHeadersConfig()
      )
      .catch(defaultErrorHandler);
  };

  return (
    <Box sx={{ margin: "20px" }}>
      <Stack spacing={2}>
        <Typography variant="h6" component="h2">
          {isAdd ? "Add session" : "Edit session"}
        </Typography>
        <TextField
          label="Voting session name"
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <TextField
          value={date}
          onChange={(event) =>
            setDate(moment(event.target.value).format(DATE_FORMAT))
          }
          id="datetime-local"
          label="Voting session start date"
          type="datetime-local"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button onClick={handleAddEdit} variant="contained">
          Save
        </Button>
      </Stack>
    </Box>
  );
};

export default VotingSessionAddEditForm;
