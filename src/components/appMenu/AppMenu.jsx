import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import * as React from 'react';
import List from '@mui/material/List';
import Drawer from '@mui/material/Drawer';
import ListItem from '@mui/material/ListItem';
import { useState } from 'react';
import { chartsName } from '../../constants';
import AddchartIcon from '@mui/icons-material/Addchart';
import { Card, CardContent, CardHeader, CardMedia } from '@mui/material';
import { chartsNameForMenu } from '../../constants';

const AppMenu = ({fileHandler, addNewChart}) => {
    const [drawerState, setDrawerState] = useState(false);
    
      const toggleDrawer = (open) => (event) => {
        if (event?.type === 'keydown' && (event?.key === 'Tab' || event?.key === 'Shift'))
          return;
        setDrawerState(open);
      };
    
      const list = 
        <Box
            sx={{ width: 400, background: "#1976d2"}}
            role="presentation"
        >
            <List>
                {Object.keys(chartsNameForMenu).map((key, index) => {
                    return <Card key={chartsNameForMenu[key].name} sx={{ maxWidth: 345, margin: "10px auto"}}>
                        <CardHeader 
                            action={
                                <IconButton  onClick={() => {addNewChart(chartsName[key])}}>
                                    <AddchartIcon />
                                </IconButton>
                            }
                            title={chartsNameForMenu[key].name}
                        />
                        <CardMedia 
                            component="img"
                            height="194"
                            image={process.env.PUBLIC_URL + "/examples/" + chartsNameForMenu[key].example}
                            alt={chartsNameForMenu[key].name}
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                {chartsNameForMenu[key].description}
                            </Typography>
                        </CardContent>
                    </Card>
                   //return <ListItem key={name}</ListItem>
                })}
            </List>
        </Box>

    return(
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => window.location.reload()}
                    >
                    <RestartAltIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Визуализация данных
                    </Typography>
                    <div>
                        <React.Fragment>
                            <Button color='inherit' onClick={toggleDrawer(true)}>Новый график</Button>
                            <Drawer
                                anchor={"right"}
                                open={drawerState}
                                onClose={toggleDrawer(false)}
                            >
                                {list}
                            </Drawer>
                        </React.Fragment>
                    </div>
                    <input
                        className='input-file'
                        accept=".xlsx, .xls"
                        id="contained-button-file"
                        type="file"
                        onChange={fileHandler} value=""
                    />
                    <label htmlFor="contained-button-file">
                        <Button color='inherit' component="span">Загрузить таблицу</Button>
                    </label>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default AppMenu;