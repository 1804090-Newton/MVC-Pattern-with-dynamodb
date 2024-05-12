const User = require('../models/User');

exports.getAllUsers = async (ctx) => {
  try {
    const users = await User.getAll();
    ctx.response.ok('All users retrieved successfully', { users });
  } catch (error) {
    ctx.response.internalError('Failed to retrieve users');
  }
};

exports.getUserById = async (ctx) => {
  const { id } = ctx.params;
  try {
    const user = await User.getById(id);
    if (user) {
      ctx.response.ok('User retrieved successfully', { user });
    } else {
      ctx.response.notFound('User not found');
    }
  } catch (error) {
    ctx.response.internalError('Failed to retrieve user');
  }
};

exports.createUser = async (ctx) => {
  const userData = ctx.request.body;
  try {
    const newUser = await User.createUser(userData);
    ctx.response.created('User created successfully', { newUser });
  } catch (error) {
    ctx.response.badRequest('Failed to create user');
  }
};

exports.updateUser = async (ctx) => {
  const { id } = ctx.params;
  const userData = ctx.request.body;
  try {
    const updatedUser = await User.updateUser(id, userData);
    if (updatedUser) {
      ctx.response.ok('User updated successfully', { updatedUser });
    } else {
      ctx.response.notFound('User not found');
    }
  } catch (error) {
    ctx.response.internalError('Failed to update user');
  }
};


exports.patchUser = async (ctx) => {
    const { id } = ctx.params;
    const userData = ctx.request.body;
    try {
      const patchedUser = await User.patchUser(id, userData);
      if (patchedUser) {
        ctx.response.ok('User patched successfully', { patchedUser });
      } else {
        ctx.response.notFound('User not found');
      }
    } catch (error) {
      ctx.response.internalError('Failed to patch user');
    }
  };
  
exports.deleteUser = async (ctx) => {
  const { id } = ctx.params;
  try {
    const deletedUser = await User.deleteUser(id);
    if (deletedUser) {
      ctx.response.ok('User deleted successfully', { deletedUser });
    } else {
      ctx.response.notFound('User not found');
    }
  } catch (error) {
    ctx.response.internalError('Failed to delete user');
  }
};
