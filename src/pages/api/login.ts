// import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import ironConfig from "../../utils/iron-config";

export default withIronSessionApiRoute(login, ironConfig);

async function login(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.body;

  try {
    // const { data } = await axios.get(
    //   `http://host.docker.internal:3000/accounts/${token}`
    // );
    const { data } = await _get(token);

    req.session.account = data;
    await req.session.save();
    res.status(200).json(data);
  } catch (e) {
    console.log(e);
    res.status(404).json({ message: "Unauthenticated" });
  }
}

async function _get(token: string): Promise<any> {
  console.log(token);

  if (token !== "palmeirasforever") {
    throw new Error("Unauthorized");
  }

  return {
    data: {
      id: "48199a4a-af71-43ea-8334-8a378b400fb0",
      name: "Conta 1",
      token: "palmeirasforever",
    },
  };
}
