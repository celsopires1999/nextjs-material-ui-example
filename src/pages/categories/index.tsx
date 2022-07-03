import { GetServerSideProps } from "next";
import axios from "axios";
import { Typography, Link as MuiLink } from "@mui/material";
import { DataGrid, GridColumns } from "@mui/x-data-grid";
import Link from "next/link";
import { isActive } from "../../utils/helpers";
import { withIronSessionSsr } from "iron-session/next";
import ironConfig from "../../utils/iron-config";
import { format, parseISO } from "date-fns";
import Router from "next/router";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data.items);

type CategoriesProps = { data: any[] };
const CategoriesPage: React.FunctionComponent<CategoriesProps> = (props) => {
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
      valueFormatter: (params) => format(parseISO(params.value), "dd/MM/yyyy"),
    },
  ];

  const { data, error: _error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_HOST}/categories`,
    fetcher,
    {
      fallbackData: props.data,
      refreshInterval: 2,
      onError: (error) => {
        console.error(error);
        if (error.response.status === 401 || error.response.status === 403) {
          Router.push("/login");
        }
      },
    }
  );

  return (
    <div style={{ height: 400, width: "100%" }}>
      <Typography component="h1" variant="h4">
        Categories
      </Typography>
      <DataGrid
        columns={columns}
        rows={data}
        checkboxSelection
        disableSelectionOnClick
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
};

export default CategoriesPage;

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
  async (context) => {
    const account = context.req.session.account;
    if (!account) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_HOST}/categories`,
      {
        headers: { cookie: context.req.headers.cookie as string },
      }
    );

    const { items } = data;

    return {
      props: {
        data: items,
      },
    };
  },
  ironConfig
);
