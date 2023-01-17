import {
  Button,
  capitalize,
  CardContent,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Card from "@mui/material/Card/Card";
import { FC } from "react";
import { MajorityType } from "Utils/data";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { getIn, useFormikContext } from "formik";

interface VotingCardProps {
  onVotingDelete: () => void;
  onVotingUp: () => void;
  onVotingDown: () => void;
  index: number;
}

const VotingFormCard: FC<VotingCardProps> = ({
  onVotingDelete,
  onVotingDown,
  onVotingUp,
  index,
}) => {
  interface FieldInterface {
    name: string;
    majorityType: string;
  }

  interface FormInterface {
    name: string;
    startDate: Date;
    votingList: FieldInterface[];
  }

  const cardTitle = `Voting #${index + 1}`;

  const DeleteButton = () => (
    <Button onClick={onVotingDelete}>
      <DeleteIcon />
    </Button>
  );

  const UpButton = () => (
    <Button onClick={onVotingUp}>
      <ArrowUpwardIcon />
    </Button>
  );

  const DownButton = () => (
    <Button onClick={onVotingDown}>
      <ArrowDownwardIcon />
    </Button>
  );

  const theme = useTheme();
  const smallBreakpoint = useMediaQuery(theme.breakpoints.down("md"));
  const { values, errors, handleChange } =
    useFormikContext<FormInterface>();

  const arrError = getIn(errors, `votingList[${index}]`);
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
                name={`votingList.${index}.name`}
                key="name"
                onChange={handleChange}
                value={(values.votingList[index] && values.votingList[index].name) || ''}
                error={Boolean(getIn(arrError, "name"))}
                helperText={getIn(arrError, "name")}
                label="Name"
              />
              <FormControl>
                <InputLabel id="majority-field-label">Majority</InputLabel>
                <Select
                  name={`votingList.${index}.majorityType`}
                  labelId="majority-field-label"
                  label="Majority type"
                  value={(values.votingList[index] && values.votingList[index].majorityType) || ''}
                  error={Boolean(getIn(arrError, "majorityType"))}
                  onChange={handleChange}
                >
                  <MenuItem/>
                  {Object.values(MajorityType).map((majorityType) => (
                    <MenuItem key={majorityType} value={majorityType}>
                      {capitalize(majorityType)}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText error={true}>
                  {getIn(arrError, "majorityType")}
                </FormHelperText>
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
