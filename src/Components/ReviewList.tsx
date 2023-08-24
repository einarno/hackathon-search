import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { getAllRecipeReviews } from "../localStorage";
import { getRecipe } from "../helpers";
import { useNavigate } from "@tanstack/react-router";
import { recipeRoute } from "../router";

export const ReviewList = () => {
  const allReviews = getAllRecipeReviews();
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
          {allReviews.slice(0, 10).reverse().map((r) => {
            const res = getRecipe(String(r.recipeId));
            if (res.status === "error") {
              return null;
            }
            const recipe = res.recipe;
            return (
              <TableRow
                key={recipe.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  cursor: "pointer",
                }}
              >
                <TableCell
                  onClick={() => {
                    navigate({ to: recipeRoute.id, params: { recipeId: recipe.id } });
                  }}
                  sx={{
                    "&:hover": {
                      textDecoration: "underline",
                      color: "orangered",
                    },
                  }}
                  component="th"
                  scope="row"
                >
                  {recipe.name}
                </TableCell>
                <>
                  <TableCell align="right">{r.userName}</TableCell>
                  <TableCell align="right">{r.rating}</TableCell>
                  <TableCell align="right">{r.comment}</TableCell>
                </>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
