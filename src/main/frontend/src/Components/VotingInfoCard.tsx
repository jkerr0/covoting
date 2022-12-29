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
import { FC } from "react";
import { Voting } from "Utils/data";
import ForwardIcon from "@mui/icons-material/Forward";

interface VotingInfoCardProps {
  votingCount: number;
  voting?: Voting;
  withControl: boolean;
  onNextVoting?: () => void;
}

const TableCellNoBorder = (props: TableCellProps) => (
  <TableCell {...props} sx={{ borderBottom: "none" }} />
);

const VotingInfoCard: FC<VotingInfoCardProps> = ({
  votingCount,
  voting,
  withControl,
  onNextVoting,
}) => {
  const InfoTable = () => {
    return (
      <Table size="small">
        <TableBody>
          {voting ? (
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
            <TableRow>The voting hasn't started yet</TableRow>
          )}
          {withControl && (
            <TableRow>
              <TableCellNoBorder>
                <Button endIcon={<ForwardIcon />} onClick={onNextVoting}>
                  {voting ? "Next voting" : "Start voting"}
                </Button>
              </TableCellNoBorder>
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  };

  const votingProgress = (): string =>
    voting ? `(${voting.seq}/${votingCount})` : "";

  return (
    <Card style={{ height: "100%" }}>
      <CardHeader title={"Current voting " + votingProgress()} />
      <CardContent>
        <InfoTable />
      </CardContent>
    </Card>
  );
};

export default VotingInfoCard;
