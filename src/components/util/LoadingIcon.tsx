import { Box, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function CircularIndeterminate() {
    return (
      <div style={{"display" : "flex",margin:"auto"}}>
      <Box sx={{ display: 'flex',margin:'auto',textAlign:'center',alignItems:'center' }}>
        <div>Logging in .. </div><CircularProgress />
      </Box>
      </div>
    );
  }