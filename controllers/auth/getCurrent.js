const getCurrent = (req, res) => {
  const { email, subscription } = req.user;
  res.status(200).json({
    status: 'success',
    code: 200,
    user: { email, subscription },
  });
};

module.exports = getCurrent;