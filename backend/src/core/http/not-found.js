module.exports = function notFound(req, res) {
    res.status(404).json({ error: { message: 'Not Found', code: 'NOT_FOUND' } });
};
