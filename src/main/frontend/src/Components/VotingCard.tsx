import {
  Button,
  capitalize,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import Card from "@mui/material/Card/Card";
import { ChangeEvent, FC } from "react";
import { MajorityType, Voting } from "../data";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";

interface VotingCardProps {
  voting: Voting;
  onVotingChanged: (voting: Voting) => void;
  onVotingDelete: (voting: Voting) => void;
}

const VotingCard: FC<VotingCardProps> = ({
  voting: votingInit,
  onVotingChanged,
  onVotingDelete,
}) => {
  const handleNameUpdate = (event: ChangeEvent<HTMLInputElement>) => {
    onVotingChanged({
      name: event.target.value as string,
      seq: votingInit.seq,
      majorityType: votingInit.majorityType,
    });
  };

  const handleMajorityTypeUpdate = (event: SelectChangeEvent) => {
    const majorityType = event.target.value as MajorityType;
    onVotingChanged({
      name: votingInit.name,
      seq: votingInit.seq,
      majorityType,
    });
  };

  const cardTitle = `Voting #${votingInit.seq}`;

  const DeleteButton = () => (
    <Button onClick={() => onVotingDelete(votingInit)}>
      <DeleteIcon />
    </Button>
  );

  return (
    <Card>
      <CardContent>
        <Typography>{cardTitle}</Typography>
        <Grid container alignItems="center" justifyContent="space-evenly">
          <Grid item xl={10}>
            <Stack spacing={2}>
              <TextField
                key="name"
                onChange={handleNameUpdate}
                value={votingInit.name}
                label="Name"
              />
              <FormControl>
                <InputLabel id="majority-field-label">Majority</InputLabel>
                <Select
                  labelId="majority-field-label"
                  label="Majority type"
                  onChange={handleMajorityTypeUpdate}
                >
                  {Object.values(MajorityType).map((majorityType) => (
                    <MenuItem value={majorityType}>
                      {capitalize(majorityType)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <InputLabel id="resolution-field-label">Resolution</InputLabel>
                <Select labelId="resolution-field-label" label="Resolution">
                  <MenuItem>TODO</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Grid>
          <Grid item xl={1}>
            <DeleteButton />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default VotingCard;
