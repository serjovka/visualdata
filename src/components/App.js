import AppMenu from './appMenu/AppMenu';
import {ExcelRenderer} from 'react-excel-renderer';
import React, {useState } from "react";
import SimpleTable from './table/SimpleTable';
import "./App.css"
import { useRef } from 'react';
import ChartsCreator from './chartsCreator/ChartsCreator';
import WelcomePage from './welcomePage/WelcomePage';

function App() {
  const [maxCharZIndex, setMaxCharZIndex] = useState(0);
  const [charCounter, setCharCounter] = useState(1);
  const [fileLoaded, setFileLoaded] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [chartsArr, setChartsArr] = useState([])
  const appRef = useRef(null);
  const updateChartData = (rowSelection) => {
    setChartData(tableData.filter((row, index) => rowSelection[index]));
  }
  const updateRow = (row, values) => {
      tableData[row.index] = values;
      setTableData([...tableData]);
  };
  const fileHandler = (event) => {
    let fileObj = event.target.files[0];
    ExcelRenderer(fileObj, (err, resp) => {
      if(err){
        console.log(err);            
      }
      else{
        const data = resp.rows.map((e, i) => {
          let result = {};
          for(let k = 0; k < e.length; k++){
            result[resp.cols[k].name] = e[k];
          }          
          return result;
        });

        const columns = resp.cols.map((e) => {
          return {
            header: e.name,
            accessorKey: e.name
          };
        });
        
        setTableColumns(columns);
        setTableData(data);
        setChartData(data);
        setFileLoaded(1);
      }
    });               
  }
  const addNewChart = (name) => {
    const newChartsArr = [...chartsArr];
    newChartsArr.push({id: charCounter, type: name, zIndex: maxCharZIndex + 1})
    setChartsArr(newChartsArr);
    setCharCounter(charCounter + 1);
    setMaxCharZIndex(maxCharZIndex + 1);
    
  }
  const closeFunction = (id) => {
    setChartsArr(chartsArr.filter(item => item.id !== id));
  };
  const changeMaxCharZIndex = (id, e) => {
    if(e?.target.dataset.testid === "CloseIcon")
      return;
    const newChartsArr = chartsArr.map((item) => {
      if(item.id === id && item.zIndex < maxCharZIndex){
        setMaxCharZIndex(maxCharZIndex + 1);
        return {...item, zIndex: maxCharZIndex + 1};
      } 
      return item;
    });
    setChartsArr(newChartsArr);
  }

  return (
    <>
      <div className='app' ref={appRef}>
        <AppMenu fileHandler={fileHandler} addNewChart={addNewChart}/>
        <div className='table-wrapper'>
          {fileLoaded === 1 
          ? <SimpleTable tableData={tableData} tableColumns={tableColumns} updateDataFunction={updateRow} updateChartData={updateChartData}/>
          : <WelcomePage/>
        }
        </div>
        <ChartsCreator 
          chartsList={chartsArr}
          changeMaxCharZIndex={changeMaxCharZIndex}
          closeFunction={closeFunction}
          chartData={chartData}
          appRef={appRef}
          tableColumns={tableColumns}

        />
      </div>
    </>
  );
}
export default App;
