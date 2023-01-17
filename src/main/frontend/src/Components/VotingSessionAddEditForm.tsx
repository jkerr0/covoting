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
import { FC } from "react";
import { Voting, VotingSession } from "Utils/data";
import moment from "moment";
import useErrorHandler from "Hooks/useErrorHandler";
import AddIcon from "@mui/icons-material/Add";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  getVotingSessionVotingList,
  NewVotingSession,
  postVotingSession,
  putVotingSession,
} from "Services/voting-session-api-service";
import Queries from "Utils/queries";
import { AxiosError } from "axios";
import * as yup from "yup";
import { FieldArray, FormikProvider, useFormik } from "formik";
import VotingFormCard from "Components/VotingFormCard";

interface AddEditFormProps {
  isAdd: boolean;
  votingSession?: VotingSession;
  afterSave: () => void;
}

const DATE_FORMAT: string = "yyyy-MM-DDThh:mm";

const validationSchema = yup.object({
  name: yup.string().required("Session name is required"),
  startDate: yup.date().required(),
  published: yup.boolean(),
  votingList: yup.array().of(
    yup.object().shape({
      name: yup.string().required("Voting name is required"),
      majorityType: yup.string().required("Majority type is required"),
    })
  ),
});

export const VotingSessionAddEditForm: FC<AddEditFormProps> = ({
  isAdd,
  votingSession,
  afterSave,
}) => {
  const defaultErrorHandler = useErrorHandler();

  const afterMutationSuccess = () => {
    queryClient.invalidateQueries(getVotingListQueryName());
    queryClient.refetchQueries(Queries.VOTING_SESSIONS).then(() => afterSave());
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

  useQuery<Voting[], AxiosError>(
    getVotingListQueryName(),
    () => getVotingSessionVotingList(votingSession),
    {
      enabled: !!votingSession,
      onSuccess: (list) => formik.setFieldValue("votingList", list),
      onError: defaultErrorHandler,
    }
  );

  type VotingNoSeq = Omit<Voting, "seq">;

  const formik = useFormik({
    initialValues: {
      name: isAdd ? "" : votingSession?.name,
      startDate:
        isAdd || votingSession === undefined
          ? moment().format(DATE_FORMAT)
          : moment(votingSession.startDate).format(DATE_FORMAT),
      isPublished: votingSession?.isPublished || false,
      votingList: new Array<VotingNoSeq>(),
    },
    validationSchema,
    onSubmit: (values) => {
      const votingList: Voting[] = values.votingList.map((voting, index) => {
        return {
          seq: index + 1,
          name: voting.name,
          majorityType: voting.majorityType,
        };
      });
      console.log("Saving");
      console.log(values);
      if (values.name && values.startDate) {
        const addedVotingSession: NewVotingSession = {
          name: values.name,
          startDate: values.startDate,
          isPublished: values.isPublished,
          votingList,
        };
        console.log(addedVotingSession);
        if (!isAdd && votingSession) {
          const editedVotingSession: VotingSession = {
            id: votingSession.id,
            ...addedVotingSession,
          };
          editMutation.mutate(editedVotingSession);
        } else {
          addMutation.mutate(addedVotingSession);
        }
      }
    },
  });

  return (
    <Box sx={{ m: 2, p: 5 }}>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={2}>
            <Typography variant="h6" component="h2">
              {isAdd ? "Add session" : "Edit session"}
            </Typography>
            <TextField
              id="name"
              label="Voting session name"
              placeholder="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.name)}
              helperText={formik.errors.name}
            />
            <TextField
              id="startDate"
              value={formik.values.startDate}
              onChange={formik.handleChange}
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
                    id="isPublished"
                    checked={formik.values.isPublished}
                    onChange={formik.handleChange}
                  />
                }
                label="Publish voting session"
                labelPlacement="start"
              />
            </FormGroup>
            <FieldArray
              name="votingList"
              render={({ remove, swap, push }) => (
                <>
                  {formik.values.votingList.map((v, index) => (
                    <VotingFormCard
                      key={`voting-${index}`}
                      onVotingDelete={() => remove(index)}
                      onVotingDown={() =>
                        index + 1 < formik.values.votingList.length &&
                        swap(index, index + 1)
                      }
                      onVotingUp={() => index > 0 && swap(index, index - 1)}
                      index={index}
                    />
                  ))}
                  <Button onClick={() => push({})} startIcon={<AddIcon />}>
                    Add voting
                  </Button>
                </>
              )}
            />
            <Button type="submit" variant="contained">
              Save
            </Button>
          </Stack>
        </form>
      </FormikProvider>
    </Box>
  );
};

export default VotingSessionAddEditForm;
