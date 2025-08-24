import UserModel from '../models/user.model';

class UserRepository {
  async findByEmail(email: string) {
    return await UserModel.findOne({ email });
  }

  async createUser(data: { username: string; email: string; password: string, role: string }) {
    const newUser = new UserModel(data);
    return await newUser.save();
  }

  async findById(id: string) {
    return await UserModel.findById(id);
  }

  async updateRefreshToken(id: string, refreshToken: string) {
    return await UserModel.findByIdAndUpdate(id, { refreshToken });
  }
}

export default new UserRepository();
