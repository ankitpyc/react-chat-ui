import { Box, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function CircularIndeterminate() {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  }