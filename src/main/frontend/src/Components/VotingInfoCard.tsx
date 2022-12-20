import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Table,
  TableCell,
  TableCellProps,
  TableRow,
} from "@mui/material";
import { FC } from "react";
import { Voting } from "Utils/data";
import ForwardIcon from "@mui/icons-material/Forward";

interface VotingInfoCardProps {
  votingCount: number;
  voting: Voting;
  withControl: boolean;
}

const TableCellNoBorder = (props: TableCellProps) => (
  <TableCell {...props} sx={{ borderBottom: "none" }} />
);

interface InfoProps extends Voting {
  withControl: boolean;
}

const InfoTable: FC<InfoProps> = ({ name, majorityType, withControl }) => (
  <Table size="small">
    <TableRow>
      <TableCellNoBorder>Name:</TableCellNoBorder>
      <TableCellNoBorder>{name}</TableCellNoBorder>
    </TableRow>
    <TableRow>
      <TableCellNoBorder>Majority type:</TableCellNoBorder>
      <TableCellNoBorder>{majorityType}</TableCellNoBorder>
    </TableRow>
    {withControl && (
      <TableRow>
        <TableCellNoBorder>
          <Button endIcon={<ForwardIcon />}>Next voting</Button>
        </TableCellNoBorder>
      </TableRow>
    )}
  </Table>
);

const VotingInfoCard: FC<VotingInfoCardProps> = ({
  votingCount,
  voting,
  withControl,
}) => {
  const { seq } = voting;

  return (
    <Card>
      <CardHeader title={`Current voting (${seq}/${votingCount})`} />
      <CardContent>
        <InfoTable {...voting} withControl={withControl} />
      </CardContent>
    </Card>
  );
};

export default VotingInfoCard;
