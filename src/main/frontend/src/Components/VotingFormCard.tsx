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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Card from "@mui/material/Card/Card";
import { ChangeEvent, FC } from "react";
import { MajorityType, Voting } from "Utils/data";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

interface VotingCardProps {
  voting: Voting;
  onVotingChanged: (voting: Voting) => void;
  onVotingDelete: (voting: Voting) => void;
  onVotingUp: (voting: Voting) => void;
  onVotingDown: (voting: Voting) => void;
}

const VotingFormCard: FC<VotingCardProps> = ({
  voting: votingInit,
  onVotingChanged,
  onVotingDelete,
  onVotingDown,
  onVotingUp
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

  const UpButton = () => (
    <Button onClick={() => onVotingUp(votingInit)}>
      <ArrowUpwardIcon />
    </Button>
  );

  const DownButton = () => (
    <Button onClick={() => onVotingDown(votingInit)}>
      <ArrowDownwardIcon />
    </Button>
  );

  const theme = useTheme();
  const smallBreakpoint = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Card>
      <CardContent>
        <Typography>{cardTitle}</Typography>
        <Grid
          container
          alignItems="center"
          justifyContent="space-evenly"
          spacing={1}
        >
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
                  value={votingInit.majorityType}
                  onChange={handleMajorityTypeUpdate}
                >
                  {Object.values(MajorityType).map((majorityType) => (
                    <MenuItem key={majorityType} value={majorityType}>
                      {capitalize(majorityType)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </Grid>
          <Grid item xl={1}>
            <Grid
              container
              spacing={2}
              direction={smallBreakpoint ? "row" : "column"}
            >
              <Grid item>
                <UpButton />
              </Grid>
              <Grid item>
                <DeleteButton />
              </Grid>
              <Grid item>
                <DownButton />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default VotingFormCard;
