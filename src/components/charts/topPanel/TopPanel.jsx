import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TuneIcon from '@mui/icons-material/Tune';
import IosShareIcon from '@mui/icons-material/IosShare';
import Typography from '@mui/material/Typography';

export function saveSvgAsPng(svg){
    if(svg == null){
        return "";
    }
    var serializer = new XMLSerializer();
    var source = serializer.serializeToString(svg);
    
    if(!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)){
      source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
    }
    if(!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)){
        source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
    }
    source = '<?xml version="1.0" standalone="no"?>\r\n' + source;
    var url = "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(source);
    return(url);
};

const TopPanel = ({dragStart, title, closeFunction, optionsControl, svg, chartCode}) => {
    return(
        <Box
            onPointerDown={dragStart}
            sx={{
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: 'primary.dark',
                cursor: "grabbing",
            }}
        >
            <Typography variant="body1" sx={{ color: "white", margin: "auto " + "0" }}>
                {title}
            </Typography>
            <Box
                sx={{
                    height: "fit-content",
                    display: "flex",
                    justifyContent: 'flex-end',
                }}
            >
                                <IconButton
                    size="small"
                    edge="end"
                    color="inherit"
                    aria-label="close"
                    sx={{ mr: 1 }}
                    onClick={
                        () => {
                            const anchor = document.createElement('a');
                            anchor.href = saveSvgAsPng(svg);
                            anchor.download = title + ".svg";
                            document.body.appendChild(anchor);
                            anchor.click();
                            document.body.removeChild(anchor);
                        }
                    }
                >
                    <IosShareIcon sx={{color: "white"}}/>
                </IconButton>

                <IconButton
                    size="small"
                    edge="end"
                    color="inherit"
                    aria-label="close"
                    sx={{ mr: 1 }}
                    onClick={optionsControl}
                >
                    <TuneIcon sx={{color: "white"}}/>
                </IconButton>
                
                <IconButton
                    size="small"
                    edge="end"
                    color="inherit"
                    aria-label="close"
                    sx={{ mr: 1 }}
                    onClick={closeFunction}
                >
                    <CloseIcon sx={{color: "white"}}/>
                </IconButton>
            </Box>
        </Box>
    );
}

export default TopPanel;