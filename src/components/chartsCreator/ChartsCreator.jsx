import BasicLineChart from '../charts/lineChart/BasicLineChart';
import BasicAreaChart from '../charts/areaChart/BasicAreaChart';
import BasicBarChart from '../charts/barChart/BasicBarChart';
import CandlestickChart from '../charts/candlestickChart/CandlestickChart';
import PieChart from '../charts/pieChart/PieChart';
import MapChart from '../charts/mapChart/MapChart';
import Scatterplot from "../charts/scatterplot/Scatterplot"
import { chartsName } from '../../constants';

const ChartsCreator = ({chartsList, changeMaxCharZIndex, closeFunction, chartData, appRef, tableColumns}) => {
    return chartsList.map((item) => {
        switch(item.type){
            case chartsName.BasicLineChart:
              return <BasicLineChart key={item.id} title={`${chartsName.BasicLineChart}#${item.id}`} zIndex={item.zIndex} changeMaxCharZIndex={(e) => changeMaxCharZIndex(item.id, e)} closeFunction={() => closeFunction(item.id)} appRef={appRef} data={chartData} columns={tableColumns}/>  
            case chartsName.BasicAreaChart:
              return <BasicAreaChart key={item.id} title={`${chartsName.BasicAreaChart}#${item.id}`} zIndex={item.zIndex} changeMaxCharZIndex={(e) => changeMaxCharZIndex(item.id, e)} closeFunction={() => closeFunction(item.id)} appRef={appRef} data={chartData} columns={tableColumns}/> 
            case chartsName.BasicBarChart:
              return <BasicBarChart key={item.id} titleChart={`${chartsName.BasicBarChart}#${item.id}`} zIndex={item.zIndex} changeMaxCharZIndex={(e) => changeMaxCharZIndex(item.id, e)} closeFunction={() => closeFunction(item.id)} appRef={appRef} data={chartData} columns={tableColumns}/> 
            case chartsName.CandlestickChart:
              return <CandlestickChart key={item.id} titleChart={`${chartsName.CandlestickChart}#${item.id}`} zIndex={item.zIndex} changeMaxCharZIndex={(e) => changeMaxCharZIndex(item.id, e)} closeFunction={() => closeFunction(item.id)} appRef={appRef} data={chartData} columns={tableColumns}/> 
            case chartsName.MapChart:
              return <MapChart key={item.id} titleChart={`${chartsName.MapChart}#${item.id}`} zIndex={item.zIndex} changeMaxCharZIndex={(e) => changeMaxCharZIndex(item.id, e)} closeFunction={() => closeFunction(item.id)} appRef={appRef} data={chartData} columns={tableColumns}/>
            case chartsName.PieChart:
              return <PieChart key={item.id} titleChart={`${chartsName.PieChart}#${item.id}`} zIndex={item.zIndex} changeMaxCharZIndex={(e) => changeMaxCharZIndex(item.id, e)} closeFunction={() => closeFunction(item.id)} appRef={appRef} data={chartData} columns={tableColumns}/>  
            case chartsName.Scatterplot:
              return <Scatterplot key={item.id} titleChart={`${chartsName.Scatterplot}#${item.id}`} zIndex={item.zIndex} changeMaxCharZIndex={(e) => changeMaxCharZIndex(item.id, e)} closeFunction={() => closeFunction(item.id)} appRef={appRef} data={chartData} columns={tableColumns}/>    
            default:
              return;
        }
    });

}

export default ChartsCreator;