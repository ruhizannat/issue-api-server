module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '0b0c0cf2f814df4af21f19be7878a4a2'),
  },
});
