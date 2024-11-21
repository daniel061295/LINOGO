import { Controller } from "../../libs/Controller.js";
import { LoginUserSchema } from './user.schema.js';
import { SECRET_JWT_KEY } from '../../config.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export class UserController extends Controller {

  create = async (req, res) => {
    const validationResult = this.Schema.validate(req.body);
    if (!validationResult.success) {
      return res.status(422).json({ error: JSON.parse(validationResult.error.message) });
    }
    const userByName = await this.Model.getByNameUser({ username: validationResult.data.username });
    if (userByName.status) { return res.status(404).json({ result: `Username ${validationResult.data.username} is already in use!` }); }
    const userByEmail = await this.Model.getByEmail({ email: validationResult.data.email });
    if (userByEmail.status) { return res.status(404).json({ result: `Email ${validationResult.data.email} is already registered!` }); }
    const { status, result } = await this.Model.createNew({
      input: {
        ...validationResult.data,
        password: await bcrypt.hash(validationResult.data.password, 10)
      }
    });
    if (status) return res.status(201).json({ result: 'User successfully created' });
    res.status(500).json({ result: `Error on create method: ${result}` });
  };

  getById = async (req, res) => {
    const { id } = req.params;
    const { status, result } = await this.Model.getById({ id });
    if (status) {
      const {
        username,
        email
      } = result;
      return res.json({ username, email });
    }
    res.status(404).json({ result: `Object with id: ${id} not found` });
  };

  login = async (req, res) => {
    const loginUserSchema = new LoginUserSchema();

    const validationResult = loginUserSchema.validate(req.body);
    if (!validationResult.success) {
      return res.status(422).json({
        error: JSON.parse(validationResult.error.message)
      });

    }
    const { username, password } = validationResult.data;
    const user = await this.Model.getByNameUser({ username });
    if (!user.status) { return res.status(404).json({ result: `User ${username} does not exist!` }); }

    const isValid = await bcrypt.compare(password, user.result.password);
    if (!isValid) { return res.status(401).json({ result: 'Invalid password' }); }
    console.log(SECRET_JWT_KEY)
    const token = jwt.sign(
      {
        _id: user.result._id,
        username: user.result.username,
        password: user.result.password
      }, SECRET_JWT_KEY, { expiresIn: 3600 * 1 }); // 3600 * 1 expires in 1 hour
    return res
      .cookie('access_token', token)
      .json({ result: 'Login Successful' });
  };

  logout = async (req, res) => {
    res
      .clearCookie('access_token')
      .json({ result: 'Logout Successful' });
  };

}