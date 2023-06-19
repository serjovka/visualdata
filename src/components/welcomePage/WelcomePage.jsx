import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import {imageList} from "../../constants"
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from "@mui/material/ImageListItemBar";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TuneIcon from '@mui/icons-material/Tune';
import TableChartIcon from '@mui/icons-material/TableChart';

const WelcomePage = () => {
    return(
        <Container sx={{ position: "relative" }}>
            <ImageList cols={3} gap={8}>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    <Typography variant='body1'>Возможности:</Typography>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <DriveFolderUploadIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Загрузка табличных данных" secondary=".XLS .XLSX" />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <AddCircleOutlineIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Создание графиков" secondary="line chart, bar chart, pie chart..." />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <TuneIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Настройка графиков" secondary="Выброр данных, темы, размеров..." />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <TableChartIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Изменение таблицы" secondary="Редактирование, исклчение из выборки" />
                    </ListItem>
                </List>
                {imageList.map((item, index)=>{
                    return <ImageListItem key={item.name + index}>
                        <img 
                            src={process.env.PUBLIC_URL + "/examples/" + item.src}
                            loading="lazy"
                            data-testid={item.src}
                        />
                        <ImageListItemBar
                            title={"Пример " + (index + 1) + " (" + item.name + ")"}
                            subtitle={<span>{item.subtitle}</span>}
                            position="below"
                         />
                    </ImageListItem>
                })}
            </ImageList>
        </Container>
    );
};

export default WelcomePage;