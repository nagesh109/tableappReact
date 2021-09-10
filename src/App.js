import React, { useState, useEffect } from 'react';
import './App.css';
import MaterialTable from 'material-table'

import AddIcon from '@material-ui/icons/Add';

function App() {

  const [tableData, setTableData] = useState([])

  const columns = [
    { title: "Name", field: "name", sorting: false, filterPlaceholder: "filter by Name", emptyValue: ()=><em>null</em>},
    { title: "User Name", field: "username", sorting: false, filterPlaceholder: "filter by User Name", emptyValue: ()=><em>null</em> },
    { title: "Email", field: "email", sorting: false, filterPlaceholder: "filter by Email", emptyValue: ()=><em>null</em> },
    { title: "Phone", field: "phone", sorting: false, filterPlaceholder: "filter by Phone", emptyValue: ()=><em>null</em> },
    { title: "Website", field: "website", sorting: false, filterPlaceholder: "filter by Website", emptyValue: ()=><em>null</em> },
  ]

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(resp => resp.json())
      .then(resp => {
        setTableData(resp)
      })
  }, [])

  return (
    <div className="App">
      <h1 align="center">React-Table-App</h1>
      <MaterialTable columns={columns} data={tableData}
        editable={{
          onRowAdd: (newRow) => new Promise((resolve, reject) => {
            setTableData([...tableData, newRow])

            setTimeout(() => resolve(), 500)
          }),
          onRowUpdate: (newRow, oldRow) => new Promise((resolve, reject) => {
            const updatedData = [...tableData]
            updatedData[oldRow.tableData.id] = newRow
            setTableData(updatedData)
            setTimeout(() => resolve(), 500)
          }),
          onRowDelete: (selectedRow) => new Promise((resolve, reject) => {
            const updatedData = [...tableData]
            updatedData.splice(selectedRow.tableData.id, 1)
            setTableData(updatedData)
            setTimeout(() => resolve(), 1000)

          })
        }}

        onSelectionChange={(selectedRows) => console.log(selectedRows)}
        options={{
          sorting: true, search: true,
          searchFieldAlignment: "right", searchAutoFocus: true, searchFieldVariant: "standard",
          filtering: true, paging: true, pageSizeOptions: [2, 5, 10, 20, 25, 50, 100], pageSize: 5,
          paginationType: "stepped", showFirstLastPageButtons: false, paginationPosition: "bottom", exportButton: true,
          exportAllData: true, exportFileName: "TableData", addRowPosition: "first", actionsColumnIndex: -1, selection: true,
          showSelectAllCheckbox: false, showTextRowsSelected: false, 
          grouping: true, columnsButton: true,
          rowStyle: (data, index) => index % 2 === 0 ? { background: "#f5f5f5" } : null,
          headerStyle: { background: "green",color:"#fff"}
        }}
        title="User Details"
        icons={{ Add: () => <AddIcon /> }} />
    </div>
  );
}

export default App;
