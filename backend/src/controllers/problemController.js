 import Problem from '../models/Problem.js';

export const getProblems = async (req, res) => {
  try {
    const { difficulty, tags, search, sort } = req.query;
    let query = { isActive: true };
    if (difficulty) query.difficulty = difficulty;
    if (tags) query.tags = { $in: tags.split(',') };
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    let sortOption = {};
    if (sort === 'acceptance') sortOption.acceptance = -1;
    else if (sort === 'difficulty') sortOption.difficulty = 1;
    else sortOption.createdAt = -1;

    const problems = await Problem.find(query)
      .select('-testCases.output -testCases.visible')
      .sort(sortOption);

    res.status(200).json({ success: true, count: problems.length, data: problems });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProblem = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id).populate('createdBy', 'username name avatar');
    if (!problem) {
      return res.status(404).json({ success: false, message: 'Problem not found' });
    }
    const visibleTestCases = problem.testCases.filter(tc => tc.visible);
    res.status(200).json({ success: true, data: { ...problem.toObject(), testCases: visibleTestCases } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createProblem = async (req, res) => {
  try {
    req.body.createdBy = req.user.id;
    const problem = await Problem.create(req.body);
    res.status(201).json({ success: true, data: problem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProblem = async (req, res) => {
  try {
    let problem = await Problem.findById(req.params.id);
    if (!problem) {
      return res.status(404).json({ success: false, message: 'Problem not found' });
    }
    problem = await Problem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({ success: true, data: problem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProblem = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) {
      return res.status(404).json({ success: false, message: 'Problem not found' });
    }
    await problem.deleteOne();
    res.status(200).json({ success: true, message: 'Problem deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProblemStats = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) {
      return res.status(404).json({ success: false, message: 'Problem not found' });
    }
    res.status(200).json({
      success: true,
      data: {
        totalSubmissions: problem.totalSubmissions,
        acceptedSubmissions: problem.acceptedSubmissions,
        acceptance: problem.acceptance,
        likes: problem.likes,
        dislikes: problem.dislikes
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
