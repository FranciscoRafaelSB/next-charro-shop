import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";

import { db } from "../../../database";
import { User } from "../../../models";
import { jwt, validation } from "../../../utils";

type Data =
  | {
      message: string;
    }
  | {
      token: string;
      user: {
        name: string;
        email: string;
        role: string;
      };
    };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return registerUser(req, res);

    default:
      res.status(400).json({ message: "Bad rquest" });
  }
}
const registerUser = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  //Aqui estoy extaryendo los valores que el usuario envia
  const {
    name = "",
    email = "",
    password = "",
  } = req.body as { name: string; email: string; password: string };

  if (password.length < 3) {
    return res.status(400).json({
      message: "La contraseña debe de ser de 3 caracteres o más",
    });
  }

  if (name.length < 3) {
    return res.status(400).json({
      message: "El nombre debe de ser de 3 caracteres o más",
    });
  }

  //TODO: valid email
  if (!validation.isValidEmail(email)) {
    return res.status(400).json({
      message: "El correo no es valido",
    });
  }

  await db.connect();
  const user = await User.findOne({ email });

  if (user) {
    await db.disconnect();
    return res.status(400).json({ message: "Correo ya resgistrado" });
  }

  const newUser = new User({
    name,
    email: email.toLowerCase(),
    password: bcrypt.hashSync(password),
    role: "client",
  });

  try {
    await newUser.save({ validateBeforeSave: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Revisar logs del servidor",
    });
  }

  //   if (!bcrypt.compareSync(password, newUser.password!)) {
  //     return res
  //       .status(400)
  //       .json({ message: "Correo o contraseña no válidos - EMAIL" });
  //   }

  const { _id } = newUser;

  const token = jwt.signToken(_id, email);

  return res.status(200).json({
    token, //JWT
    user: {
      email,
      role: "client",
      name,
    },
  });
};
