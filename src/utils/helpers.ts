import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export const isActive = (is_active: boolean): string => {
  return is_active ? "Yes" : "No";
};

export async function categoriesApi(
  req: NextApiRequest,
  res: NextApiResponse,
  listOrShow: "list" | "show"
): Promise<void> {
  const account = req.session.account;

  if (!account) {
    return res.status(401).json({ message: "Unauthenticated" });
  }
  let targetUrl = `${process.env.NEST_API_HOST}/categories`;

  if (listOrShow === "show") {
    const { id } = req.query;
    targetUrl = `${targetUrl}/${id}`;
  }

  try {
    const { data } = await axios.get(targetUrl, {
      headers: {
        "x-token": account.token,
      },
    });
    res.status(200).json(data);
  } catch (e) {
    console.error(e);
    if (axios.isAxiosError(e)) {
      res.status(e.response!.status).json(e.response?.data);
    } else {
      res.status(500).json({ message: "Ocorreu um erro interno" });
    }
  }
}
