import groupService from '../services/group';

const getAllGroups = async (req, res) => {
  try {
    const result = await groupService.getAllGroups();
    res.json(result)
  } catch (error) {
    res.json(error);
  }
}

const joinGroup = async (req, res) => {
  try {
    const result = await groupService.joinGroup(req.body.group_id, req.user.data.id);
    res.json(result)
  } catch (error) {
    res.json(error);
  }
}

const getGroupById = async (req, res) => {
  try {
    const result = await groupService.getGroupById(req.params.groupId);
    res.json(result)
  } catch (error) {
    res.json(error);
  }
}

export default {
  getAllGroups,
  joinGroup,
  getGroupById
}