import { google, Auth } from "googleapis";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { signIn } from "next-auth/react";

import { options } from "@/app/api/auth/[...nextauth]/options";

export async function getOAuth2Client(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<Auth.OAuth2Client> {
  const session = await getServerSession(req, res, options);

  const token = await getToken({ req });
  if (!session || !token) signIn();

  const accessToken = token?.accessToken as string;
  const refreshToken = token?.refreshToken as string;

  if (!accessToken) throw Error("Access Token not found.");

  const oauth2Client = new google.auth.OAuth2({});
  oauth2Client.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  return oauth2Client;
}
