import groupService from '../services/group';

const getAllGroups = async (req, res) => {
  try {
    const result = await groupService.getAllGroups();
    res.json(result)
  } catch (error) {
    res.json(error);
  }
}

export default {
  getAllGroups
}