import React, { useMemo, useState, useEffect } from 'react';
import MaterialReactTable from 'material-react-table';

const SimpleTable = ({tableData, tableColumns, updateDataFunction, updateChartData}) => {
    const columns = useMemo(() => {
            return tableColumns.map(e => {return {...e}})
    }, [tableColumns]);
    const [rowSelection, setRowSelection] = useState(
        tableData.reduce((result, item, index) => {
            return {...result, [index]: true};
        },{})
    );
    useEffect(() => {
        updateChartData(rowSelection);
      }, [rowSelection]);
    const handleSaveRow = async ({ exitEditingMode, row, values }) => {
        updateDataFunction(row, values);
        exitEditingMode();
    };
    return (
        <MaterialReactTable
        columns={columns}
        data={tableData}
        enableRowNumbers
        editingMode="row"
        enableEditing
        onEditingRowSave={handleSaveRow}
        enableRowSelection
        onRowSelectionChange={setRowSelection} //connect internal row selection state to your own
        state={{ rowSelection }} //pass our managed row selection state to the table to use
        enableColumnActions={false}
        enableColumnFilters={false}
        enablePagination={true}
        initialState={{ pagination: { pageSize: 20} }}
        enableSorting={false}
        enableBottomToolbar={true}
        enableTopToolbar={false}
        muiTableBodyRowProps={{ hover: false }}
        enableColumnResizing
        />
    );
};

export default SimpleTable;