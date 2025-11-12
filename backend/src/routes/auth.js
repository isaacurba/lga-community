import express from 'express';
import jwt from 'jsonwebtoken';


const router = express.Router();

// Hardcoded Staff User for MVP. No DB lookup yet.
const HARDCODED_STAFF = {
    email: 'staff@lga.ng',
    password: 'password', // Use this when testing!
    role: 'staff',
    id: '66d0c410f9b6b8d2d6c1f103' // Mock ID
};

// @route   POST /api/v1/auth/login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (email !== HARDCODED_STAFF.email || password !== HARDCODED_STAFF.password) {
        return res.status(401).json({ 
            success: false, 
            message: 'Invalid credentials. Use staff@lga.ng and password.' 
        });
    }

    try {
        // Sign the JWT token with essential user info
        const token = jwt.sign(
            { id: HARDCODED_STAFF.id, role: HARDCODED_STAFF.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' } // Token expires in 1 hour
        );
        
        // Success response with token and user details
        res.json({ 
            success: true, 
            token: token,
            user: { 
                id: HARDCODED_STAFF.id, 
                email: HARDCODED_STAFF.email, 
                role: HARDCODED_STAFF.role 
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error during token creation.' });
    }
});

module.exports = router;