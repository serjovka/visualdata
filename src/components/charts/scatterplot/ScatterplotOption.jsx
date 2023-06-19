import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

const ScatterplotOption = ({columns, options, changeOptions}) => {
    return (
        <>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="x-select-label">X</InputLabel>
                <Select
                    labelId="x-select-label"
                    value={options.x}
                    label="x"
                    onChange={(e) => {changeOptions({...options, x: e.target.value})}}
                >
                    {columns.map((e) => {
                        return <MenuItem value={e.header} key={e.header + "X"}>{e.header}</MenuItem>
                    })}
                </Select>       
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="y-select-label">Y</InputLabel>
                <Select
                    labelId="y-select-label"
                    value={options.y}
                    label="y"
                    onChange={(e) => {changeOptions({...options, y: e.target.value})}}
                >
                    {columns.map((e) => {
                        return <MenuItem value={e.header} key={e.header + "X"}>{e.header}</MenuItem>
                    })}
                </Select>       
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="title-select-label">Title</InputLabel>
                <Select
                    labelId="title-select-label"
                    value={options.title}
                    label="Title"
                    onChange={(e) => {changeOptions({...options, title: e.target.value})}}
                >
                    {columns.map((e) => {
                        return <MenuItem value={e.header} key={e.header + "X"}>{e.header}</MenuItem>
                    })}
                </Select>       
            </FormControl>
            <FormControl sx={{ m: 1, maxWidth: 200 }} size="small">
                <Typography variant="body2" gutterBottom>
                    Радиус
                </Typography>            
                <Slider
                    size="small"
                    value={options.r}
                    aria-label="Small"
                    valueLabelDisplay="auto"
                    min={1} max={10}
                    onChange={(e) => {changeOptions({...options, r: e.target.value})}}
                />
            </FormControl>
        </>
      );
}
export default ScatterplotOption;