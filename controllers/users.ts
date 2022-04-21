import { Request, Response} from "express";
import { where } from "sequelize/types";
import User from "../models/user";

export const getUsers = async (req: Request, res: Response) => {

    const users = await User.findAll();

    res.json({users});
}

export const getUser = async ( req: Request, res: Response) => {

    const { id } = req.params;

    const user = await User.findByPk( id );

    if (user) {
        res.json(user);
    } else {
        res.status(404).json({
            msg: `No existe usuario con ese ${id}`
        });
    }
}

export const postUser = async (req: Request, res: Response) => {

    const { body } = req;

    try {

        const existEmail = await User.findOne({
            where: {email: body.email}
        })

        if (existEmail) {
            return res.status(400).json({
                msg: 'Ya existe un usuario con ese email' + body.email
            });
        }

        const user = await User.create(body);

        res.json(user);
    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: 'Hable con el admin'
        })
    }

    res.json({
        msg: 'postUser',
        body
    });
}

export const putUser = async (req: Request, res: Response) => {

    const {id} = req.params;
    const {body} = req;

    try {

        const user = await User.findByPk(id)
        if (!user) {
            return res.status(400).json({
                msg: 'Ya existe un usuario con ese id' + id
            });
        }

        await user.update(body);

        res.json(user)
    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: 'Hable con el admin'
        })
    }

    res.json({
        msg: 'pustUser',
        body
    });
}

export const deleteUser = async (req: Request, res: Response) => {

    const {id} = req.params;

    const user = await User.findByPk(id)
    if (!user) {
        return res.status(400).json({
            msg: 'Ya existe un usuario con ese id' + id
        });
    }

    await user.update({status: 0})

    res.json(user);
}

