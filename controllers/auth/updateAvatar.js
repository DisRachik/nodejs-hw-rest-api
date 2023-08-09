const fs = require('fs/promises');
const path = require('path');

const { UsersModel } = require('../../models');
const { deleteOldImg, optimizeImg } = require('../../helpers');

const avatarPath = path.resolve('public', 'avatars');

const updateAvatar = async (req, res) => {
  const { _id, avatarURL: oldAvatarUrl } = req.user;
  const { path: oldPath, filename } = req.file;
  const newPath = path.join(avatarPath, filename);

  await optimizeImg(oldPath);

  await fs.rename(oldPath, newPath);

  const avatarURL = path.join('public', 'avatars', filename);

  const { avatarURL: newUrl } = await UsersModel.findByIdAndUpdate(
    _id,
    { avatarURL },
    { new: true }
  );

  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      avatarURL: newUrl,
    },
  });

  deleteOldImg(oldAvatarUrl);
};

module.exports = updateAvatar;
