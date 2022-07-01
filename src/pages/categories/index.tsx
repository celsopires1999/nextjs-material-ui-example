import { GetServerSideProps } from "next";
import axios from "axios";
import { Button, Typography, Link as MuiLink } from "@mui/material";
import { DataGrid, GridColumns } from "@mui/x-data-grid";
import Link from "next/link";
import { isActive } from "../../utils/helpers";

type CategoriesProps = { categories: any[] };
const CategoriesPage: React.FunctionComponent<CategoriesProps> = (props) => {
  const { categories } = props;
  const columns: GridColumns = [
    {
      field: "id",
      headerName: "ID",
      width: 300,
      renderCell: (params) => {
        return (
          <Link href={`/categories/${params.value}`} passHref>
            <MuiLink>{params.value}</MuiLink>
          </Link>
        );
      },
    },
    {
      field: "name",
      headerName: "Name",
      width: 200,
    },
    {
      field: "description",
      headerName: "Description",
      width: 200,
    },
    {
      field: "is_active",
      headerName: "Active?",
      width: 80,
      valueFormatter: (params) => isActive(params.value),
    },
    {
      field: "created_at",
      headerName: "Created At",
      width: 200,
    },
  ];
  return (
    <div style={{ height: 400, width: "100%" }}>
      <Typography component="h1" variant="h4">
        Categories
      </Typography>
      <DataGrid
        columns={columns}
        rows={categories}
        checkboxSelection
        disableSelectionOnClick
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
      <div>
        <Button variant="contained">Contained</Button>
      </div>
    </div>
  );
};

export default CategoriesPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data } = await axios.get(
    "http://host.docker.internal:3000/categories"
  );
  const { items } = data;

  return {
    props: {
      categories: items,
    },
  };
};
