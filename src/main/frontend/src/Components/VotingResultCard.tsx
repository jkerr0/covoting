import {
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { FC } from "react";
import { VotingResult } from "Utils/data";

const VotingResultCard: FC<VotingResult> = ({
  name,
  forCount,
  againstCount,
  abstainCount,
  accepted,
}) => {
  return (
    <Card>
      <CardHeader title={`Voting: ${name}`} />
      <CardContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>For:</TableCell>
              <TableCell>{forCount}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Against:</TableCell>
              <TableCell>{againstCount}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Abstained:</TableCell>
              <TableCell>{abstainCount}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Total:</TableCell>
              <TableCell>{abstainCount + againstCount + forCount}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Result:</TableCell>
              <TableCell>
                {accepted ? "Resolution passed" : "Resolution rejected"}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default VotingResultCard;
