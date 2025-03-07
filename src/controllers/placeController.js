const Place = require('../models/Place');

// Fetch all places
exports.getPlaces = async (req, res) => {
  try {
    const places = await Place.find();
    res.status(200).json(places);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching places', error });
  }
};
exports.signup = async (req, res) => {
  const { name, userid, latitude, longitude, password } = req.body;
  
  try {
    // Check if userid already exists
    const existingUser = await Place.findOne({ userid });
    if (existingUser) {
      return res.status(400).json({ error: 'User ID already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new Place({
      name,
      userid,
      location: { latitude, longitude },
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error signing up' });
  }
};

// Login
exports.login = async (req, res) => {
  const { userid, password } = req.body;

  try {
    const user = await Place.findOne({ userid });
    if (!user) return res.status(400).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    // Generate JWT token
    const token = jwt.sign({ id: user._id, userid: user.userid }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ token, user: { name: user.name, userid: user.userid, status: user.status } });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};

exports.toggleStatus = async (req, res) => {
  const { name, status } = req.body;
  try {
    await Place.updateOne({ name }, { status });
    res.json({ message: 'Status updated' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating status' });
  }
};