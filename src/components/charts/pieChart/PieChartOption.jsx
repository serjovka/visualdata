import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

const PieChartOption = ({columns, options, changeOptions}) => {
    return (
        <>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="name-select-label">name</InputLabel>
                <Select
                    labelId="name-select-label"
                    value={options.name}
                    label="name"
                    onChange={(e) => {changeOptions({...options, name: e.target.value})}}
                >
                    {columns.map((e) => {
                        return <MenuItem value={e.header} key={e.header + "X"}>{e.header}</MenuItem>
                    })}
                </Select>       
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="value-select-label">value</InputLabel>
                <Select
                    labelId="value-select-label"
                    value={options.value}
                    label="value"
                    onChange={(e) => {changeOptions({...options, value: e.target.value})}}
                >
                    {columns.map((e) => {
                        return <MenuItem value={e.header} key={e.header + "X"}>{e.header}</MenuItem>
                    })}
                </Select>       
            </FormControl>
            <FormControl sx={{ m: 1, maxWidth: 200 }} size="small">
                <Typography variant="body2" gutterBottom>
                    Внутренний радиус
                </Typography>            
                <Slider
                    size="small"
                    value={options.innerRad}
                    aria-label="Small"
                    valueLabelDisplay="auto"
                    min={0} max={500}
                    onChange={(e) => {changeOptions({...options, innerRad: e.target.value})}}
                />
            </FormControl>
        </>
      );
}
export default PieChartOption;