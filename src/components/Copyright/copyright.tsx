import { Link, Typography } from "@suid/material";

export function Copyright(props: any) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          YTC
        </Link> - ALPHA {' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }