import { GetServerSideProps } from "next";
import axios from "axios";

type OrdersProps = { name: string };
const OrdersPage: React.FunctionComponent<OrdersProps> = (props) => {
  const { name } = props;
  console.log(name);
  return <div>{`Hello!`}</div>;
};

export default OrdersPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data } = await axios.get(
    "http://host.docker.internal:3000/categories",
    {
      headers: {
        "x-token": "uwjv5dgrlpo",
      },
    }
  );

  return {
    props: {
      name: data,
    },
  };
};
