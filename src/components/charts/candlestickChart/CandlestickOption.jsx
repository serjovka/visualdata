import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const CandlestickOption = ({columns, options, changeOptions}) => {
    return (
        <>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="date-select-label">date</InputLabel>
                <Select
                    labelId="date-select-label"
                    value={options.date}
                    label="date"
                    onChange={(e) => {changeOptions({...options, date: e.target.value})}}
                >
                    {columns.map((e) => {
                        return <MenuItem value={e.header} key={e.header + "X"}>{e.header}</MenuItem>
                    })}
                </Select>       
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="open-select-label">open</InputLabel>
                <Select
                    labelId="open-select-label"
                    value={options.open}
                    label="open"
                    onChange={(e) => {changeOptions({...options, open: e.target.value})}}
                >
                    {columns.map((e) => {
                        return <MenuItem value={e.header} key={e.header + "X"}>{e.header}</MenuItem>
                    })}
                </Select>       
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="close-select-label">close</InputLabel>
                <Select
                    labelId="close-select-label"
                    value={options.close}
                    label="close"
                    onChange={(e) => {changeOptions({...options, close: e.target.value})}}
                >
                    {columns.map((e) => {
                        return <MenuItem value={e.header} key={e.header + "X"}>{e.header}</MenuItem>
                    })}
                </Select>       
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="high-select-label">high</InputLabel>
                <Select
                    labelId="high-select-label"
                    value={options.high}
                    label="high"
                    onChange={(e) => {changeOptions({...options, high: e.target.value})}}
                >
                    {columns.map((e) => {
                        return <MenuItem value={e.header} key={e.header + "X"}>{e.header}</MenuItem>
                    })}
                </Select>       
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="low-select-label">low</InputLabel>
                <Select
                    labelId="low-select-label"
                    value={options.low}
                    label="low"
                    onChange={(e) => {changeOptions({...options, low: e.target.value})}}
                >
                    {columns.map((e) => {
                        return <MenuItem value={e.header} key={e.header + "X"}>{e.header}</MenuItem>
                    })}
                </Select>       
            </FormControl>
        </>
      );
}
export default CandlestickOption;