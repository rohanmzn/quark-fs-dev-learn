export function protectedData(req, res) {
    res.json({ message: "Protected data", user: req.user });
}
