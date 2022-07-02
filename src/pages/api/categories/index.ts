import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import ironConfig from "../../../utils/iron-config";
import { categoriesApi } from "../../../utils/helpers";

export default withIronSessionApiRoute(categoriesList, ironConfig);

async function categoriesList(req: NextApiRequest, res: NextApiResponse) {
  categoriesApi(req, res, "list");
}
