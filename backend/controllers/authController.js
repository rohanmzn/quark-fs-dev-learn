import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        // Dummy user (later we connect DB)
        const user = {
            id: 1,
            email: "test@example.com",
            password: bcrypt.hashSync("123456", 10)
        };

        if (email !== user.email) {
            return res.status(400).json({ message: "User not found" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(400).json({ message: "Wrong password" });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
        );

        return res.json({ token });
        /* const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token }); */

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
