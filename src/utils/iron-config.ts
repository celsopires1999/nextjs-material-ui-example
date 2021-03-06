const ironConfig = {
  password: `${process.env.COOKIE_KEY}`,
  cookieName: "fullcycle-session",
  cookieOptions: {
    // the next line allows to use the session in non-https environments like
    // Next.js dev mode (http://localhost:3000)
    secure: false,
  },
};

declare module "iron-session" {
  interface IronSessionData {
    account?: {
      id: string;
      name: string;
      token: string;
    };
  }
}

export default ironConfig;
