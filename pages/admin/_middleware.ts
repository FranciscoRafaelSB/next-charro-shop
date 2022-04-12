import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest | any, ev: NextFetchEvent) {
  const session: any = await getToken({
    req,
    secret: process.env.NEXT_AUTH_SECRET,
  });

  if (!session) {
    // const requestedPage = req.page.name;

    // return NextResponse.redirect(`/auth/login?p=${requestedPage}`);

    console.log(req.nextUrl.clone());
    const { origin, pathname } = req.nextUrl.clone();

    return NextResponse.redirect(`${origin}/auth/login?p=${pathname}`);
  }

  const validRoles = ["admin", "super-user", "SEO"];

  if (!validRoles.includes(session.user.role)) {
    // console.log("Estoy aqui");
    const { origin } = req.nextUrl.clone();
    return NextResponse.redirect(`${origin}/`);
  }

  return NextResponse.next();
}
