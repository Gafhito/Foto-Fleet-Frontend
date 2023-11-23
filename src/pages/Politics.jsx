import { Box } from "@mui/material";
import { PoliticsClauses } from "../components/politics/PoliticsClauses";

export const Politics = () => {
  return (
    <Box sx={{ marginTop: "8rem" }}>
      <div style={{ minHeight: "100vh" }}>
        <h1 style={{color: "black"}}>Políticas de Productos Alquilados</h1>
        <div>
          <PoliticsClauses />
        </div>
      </div>
    </Box>
  );
};
