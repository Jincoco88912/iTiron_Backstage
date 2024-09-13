import React from 'react';
import { Button, Typography, Container } from '@material-ui/core';

const PermissionDenied = () => {
  return (
    <Container style={{ textAlign: 'center', marginTop: '100px' }}>
      <img
        src="https://i.imgur.com/aKkviaX.png"
        alt="Permission Denied"
        style={{width: '50%',  margin: '20px auto', display: 'block', maxWidth: '100%' }}
      />
      <Typography variant="h2" gutterBottom>
        Permission Denied
      </Typography>
      <Typography variant="h5" gutterBottom>
        您尚未有權訪問此插件
      </Typography>
      <Typography gutterBottom　color='textSecondary'>
        當前允許用戶組: backstage-developer (權限功能開發中)
      </Typography>
      <Button
        variant="contained"
        color="primary"
        href="/"
        style={{ marginTop: '20px' }}
      >
        返回主頁
      </Button>
    </Container>
  );
};

export default PermissionDenied;
