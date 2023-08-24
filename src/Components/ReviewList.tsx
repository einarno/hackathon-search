import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { getRecipeReviews } from "../localStorage";
import { getRecipe } from "../helpers";
import { useNavigate } from "@tanstack/react-router";
import { recipeRoute } from "../router";

export const ReviewList = () => {
  const recipeReviews = getRecipeReviews();
  const navigate = useNavigate();
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Recipe</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Rating&nbsp;(1-5)</TableCell>
            <TableCell align="right">Comment</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {recipeReviews.map(({ recipeId, review }) => {
            const recipe = getRecipe(recipeId);
            return (
              <TableRow
                key={review.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 }, "cursor": "pointer" }}
              >
                <TableCell
                  onClick={() => {
                    navigate({ to: recipeRoute.id, params: { recipeId } });
                  }}
                  sx={{ "&:hover": { textDecoration: "underline", color: "orangered" } }}
                  component="th"
                  scope="row"
                >
                  {recipe.status === "success" ? recipe.recipe.name : "Unknown"}
                </TableCell>
                <TableCell align="right">{review.userName}</TableCell>
                <TableCell align="right">{review.rating}</TableCell>
                <TableCell align="right">{review.comment}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
