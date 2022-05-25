import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { VotingSession } from "../data";
import axios from "../axios";
import moment from "moment";

interface AddEditFormProps {
  isAdd: boolean;
  votingSession?: VotingSession;
  onSave: Function;
}

const DATE_FORMAT: string = "yyyy-MM-DDThh:mm";

export default function VotingSessionAddEditForm(props: AddEditFormProps) {
  const [name, setName] = React.useState<string | undefined>(
    props.isAdd ? undefined : props.votingSession?.name
  );
  const [date, setDate] = React.useState<string>(
    props.isAdd || props.votingSession === undefined
      ? moment().format(DATE_FORMAT)
      : moment(props.votingSession.startDate).format(DATE_FORMAT)
  );

  const handleAddEdit = () => {
    props.isAdd ? handleAdd() : handleEdit();
    props.onSave();
  };

  const handleEdit = () => {
    axios.put<VotingSession>("voting_sessions", {
      id: props.votingSession?.id,
      name: name,
      startDate: date,
    });
  };

  const handleAdd = () => {
    axios.post<VotingSession>("voting_sessions", {
      name: name,
      startDate: date,
    });
  };

  return (
    <Box sx={{ margin: "20px" }}>
      <Stack spacing={2}>
        <Typography variant="h6" component="h2">
          Add session
        </Typography>
        <TextField
          label="Voting session name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        ></TextField>
        <TextField
          value={date}
          onChange={(event) =>
            setDate(moment(event.target.value).format(DATE_FORMAT))
          }
          id="datetime-local"
          label="Voting session start date"
          type="datetime-local"
          sx={{ width: 250 }}
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
}
