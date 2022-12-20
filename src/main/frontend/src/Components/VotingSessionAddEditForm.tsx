import {
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import { MajorityType, Voting, VotingSession } from "Utils/data";
import moment from "moment";
import useErrorHandler from "Hooks/useErrorHandler";
import AddIcon from "@mui/icons-material/Add";
import useEntityWithSeqList from "Hooks/useEntityWithSeqList";
import VotingFormCard from "Components/VotingFormCard";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  getVotingSessionVotingList,
  NewVotingSession,
  postVotingSession,
  putVotingSession,
} from "Services/voting-session-api-service";
import Queries from "Utils/queries";
import { AxiosError } from "axios";

interface AddEditFormProps {
  isAdd: boolean;
  votingSession?: VotingSession;
  afterSave: () => void;
}

const DATE_FORMAT: string = "yyyy-MM-DDThh:mm";

export const VotingSessionAddEditForm: FC<AddEditFormProps> = ({
  isAdd,
  votingSession,
  afterSave,
}) => {
  const [
    votingList,
    setVotingList,
    addVoting,
    updateVoting,
    deleteVoting,
    votingDown,
    votingUp,
  ] = useEntityWithSeqList<Voting>();

  const [name, setName] = useState<string | undefined>(
    isAdd ? undefined : votingSession?.name
  );
  const [date, setDate] = useState<string>(
    isAdd || votingSession === undefined
      ? moment().format(DATE_FORMAT)
      : moment(votingSession.startDate).format(DATE_FORMAT)
  );
  const defaultErrorHandler = useErrorHandler();

  const [isPublished, setIsPublished] = useState(
    isAdd || votingSession === undefined ? false : votingSession.isPublished
  );

  const afterMutationSuccess = () => {
    queryClient
      .invalidateQueries([Queries.VOTING_SESSIONS, getVotingListQueryName()])
      .then(() => afterSave());
  };

  const queryClient = useQueryClient();
  const addMutation = useMutation(postVotingSession, {
    onSuccess: afterMutationSuccess,
    onError: defaultErrorHandler,
  });

  const editMutation = useMutation(putVotingSession, {
    onSuccess: afterMutationSuccess,
    onError: defaultErrorHandler,
  });

  const getVotingListQueryName = () => `voting-list-${votingSession?.id}`;

  const { error } = useQuery<Voting[], AxiosError>(
    getVotingListQueryName(),
    () => getVotingSessionVotingList(votingSession),
    {
      enabled: !!votingSession,
      onSuccess: (votingList) => setVotingList(votingList),
    }
  );
  useErrorHandler(error);

  const handleSave = () => {
    isAdd ? handleSaveAdd() : handleSaveEdit();
  };

  const handleSaveEdit = () => {
    if (!votingSession?.id || name === undefined) {
      throw new Error("Invalid edited session");
    }
    const editedSession: VotingSession = {
      id: votingSession.id,
      isPublished,
      name,
      startDate: moment(date).toISOString(),
      votingList,
    };
    editMutation.mutate(editedSession);
  };

  const handleSaveAdd = () => {
    if (!name) {
      throw new Error("Name not defined");
    }
    const newSession: NewVotingSession = {
      name,
      isPublished,
      startDate: moment(date).toISOString(),
      votingList,
    };
    addMutation.mutate(newSession);
  };

  const handleVotingAdd = () => {
    const defaultVoting: Voting = {
      seq: 0,
      name: "",
      majorityType: MajorityType.SIMPLE,
    };
    addVoting(defaultVoting);
  };

  return (
    <Box sx={{ m: 2, p: 5 }}>
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
        <FormGroup row>
          <FormControlLabel
            control={
              <Switch
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
              />
            }
            label="Publish voting session"
            labelPlacement="start"
          />
        </FormGroup>
        {votingList.map((voting, index) => (
          <VotingFormCard
            key={`voting-${index}`}
            voting={voting}
            onVotingChanged={updateVoting}
            onVotingDelete={deleteVoting}
            onVotingDown={votingDown}
            onVotingUp={votingUp}
          />
        ))}
        <Button onClick={handleVotingAdd} startIcon={<AddIcon />}>
          Add voting
        </Button>
        <Button onClick={handleSave} variant="contained">
          Save
        </Button>
      </Stack>
    </Box>
  );
};

export default VotingSessionAddEditForm;
