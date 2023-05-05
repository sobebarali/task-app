import jwt from "jsonwebtoken";
const secretKey: any = process.env.SECRET_KEY;

const verifyAndExtractUserId = (token: string): string | null => {
  const decodedToken = jwt.verify(token, secretKey) as {
    exp?: number;
    userId?: string;
  };
  const todayDate: number = Math.floor(new Date().getTime() / 1000);
  const isExpired: boolean = decodedToken.exp
    ? decodedToken.exp < todayDate
    : true;

  if (!isExpired && decodedToken.userId) {
    return decodedToken.userId;
  }

  return null;
};
export { verifyAndExtractUserId };
