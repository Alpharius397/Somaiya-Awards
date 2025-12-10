import {
  DataGrid,
  type GridRowsProp,
  type GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";
import React from "react";
import ErrorBoundary, {
  EmptyData,
  DefaultError,
} from "@/components/utils/ErrorBoundary";

function Datagrid(props: { rows: { [key: string]: [] }[] }) {
  const rows: GridRowsProp = props.rows || [];

  const columns: GridColDef[] = [
    { field: "institution_name", headerName: "Institute", width: 400 },
    {
      field: "institution_form",
      headerName: "Institution Form",
      width: 150,
    },
    { field: "research_form", headerName: "Research Form", width: 150 },
    { field: "sports_form", headerName: "Sports Form", width: 150 },
    { field: "teaching_form", headerName: "Teaching Form", width: 150 },
    {
      field: "non_teaching_form",
      headerName: "Non-Teaching Form",
      width: 170,
    },
    { field: "students_form", headerName: "Students Form", width: 170 },
  ];

  return (
      <div className="w-[97%] p-2 flex justify-center items-center">
          {!(rows && rows.length > 0) ? (
              <EmptyData />
          ) : (
              <DataGrid
                  getRowId={(row) => row.institution_name}
                  rows={rows}
                  columns={columns}
                  slots={{ toolbar: GridToolbar }}
                  slotProps={{
                      toolbar: {
                          showQuickFilter: true,
                          quickFilterProps: { debounceMs: 500 },
                      },
                  }}
              />
          )}
      </div>
  );
}

export default function ActualDataGrid(props: {
  rows: { [key: string]: [] }[];
}) {
  return (
    <ErrorBoundary fallback={<DefaultError />}>
      <Datagrid {...props} />
    </ErrorBoundary>
  );
}
