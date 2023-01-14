import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableCellProps,
  TableRow,
} from "@mui/material";
import { FC, useState } from "react";
import { Voting } from "Utils/data";
import ForwardIcon from "@mui/icons-material/Forward";
import ConfirmPresenceButton from "Components/ConfirmPresenceButton";

interface VotingInfoCardProps {
  votingCount: number;
  voting?: Voting;
  sessionClosed: boolean;
  withControl: boolean;
  onNextVoting?: () => void;
  sessionId: number;
}

const TableCellNoBorder = (props: TableCellProps) => (
  <TableCell {...props} sx={{ borderBottom: "none" }} />
);

const VotingInfoCard: FC<VotingInfoCardProps> = ({
  votingCount,
  voting,
  withControl,
  onNextVoting,
  sessionId,
  sessionClosed,
}) => {
  const nextVotingButtonLabel = () => {
    const lastVoting = voting && voting.seq === votingCount;
    if (voting && lastVoting) {
      return "Finish session";
    } else if (!lastVoting) {
      return "Next voting";
    } else {
      return "Start session";
    }
  };

  const [finished, setFinished] = useState<boolean>(sessionClosed);
  const handleNextVoting = () => {
    if (voting?.seq === votingCount) {
      setFinished(true);
    }
    onNextVoting && onNextVoting();
  };

  const InfoTable = () => {
    return (
      <Table size="small">
        <TableBody>
          {voting && !finished? (
            <>
              <TableRow>
                <TableCellNoBorder>Name:</TableCellNoBorder>
                <TableCellNoBorder>{voting.name}</TableCellNoBorder>
              </TableRow>
              <TableRow>
                <TableCellNoBorder>Majority type:</TableCellNoBorder>
                <TableCellNoBorder>{voting.majorityType}</TableCellNoBorder>
              </TableRow>
            </>
          ) : (
            <TableRow>
              <TableCellNoBorder>
                { finished ? "The voting session has finished" : "The voting session hasn't started yet." }
              </TableCellNoBorder>
            </TableRow>
          )}
          {!withControl && !voting && (
            <TableRow>
              <TableCellNoBorder>
                <ConfirmPresenceButton sessionId={sessionId} />
              </TableCellNoBorder>
            </TableRow>
          )}
          {withControl && !finished && (
            <TableRow>
              <TableCellNoBorder>
                <Button endIcon={<ForwardIcon />} onClick={handleNextVoting}>
                  {nextVotingButtonLabel()}
                </Button>
              </TableCellNoBorder>
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  };

  const votingSessionProgress = (): string =>
    voting ? `(${voting.seq}/${votingCount})` : "";

  return (
    <Card style={{ height: "100%" }}>
      <CardHeader title={"Current voting " + votingSessionProgress()} />
      <CardContent>
        <InfoTable />
      </CardContent>
    </Card>
  );
};

export default VotingInfoCard;
