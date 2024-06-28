import { Box, Skeleton } from "@mui/material"
import React from "react"

export default function SkeletonChatUsers() {
    return (
      <>
        {Array.from({ length: 10 }).map((_, index) => (
          <Box key={index} display="flex" alignItems="center" sx={{"padding" : "10px"}} mb={2}>
            <Skeleton variant="circular" width={60} height={60} />
            <Box ml={2} width="100%">
              <Skeleton variant="text"  height={20} />
              <Skeleton variant="text"  height={20} />
            </Box>
          </Box>
        ))}
      </>
    );
  }