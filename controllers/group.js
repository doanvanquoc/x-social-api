import groupService from '../services/group';
const cloudinary = require('cloudinary').v2;
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

const createGroup = async (req, res) => {
  try {
    const group = await groupService.createGroup(req.body, req.user.data.id, req.file);
    res.json(group);
  } catch (error) {
    if (req.file) {
      cloudinary.uploader.destroy(req.file.filename);
    }
    res.json(error);
  }
}

const createPostInGroup = async (req, res) => {
  try {
    const post = await groupService.createPostInGroup(req.body, req.user.data.id, req.params.groupId, req.files);
    res.json(post);
  } catch (error) {
    if (req.files) {
      for (const file of req.files) {
        cloudinary.uploader.destroy(file.filename)
      }
    }
    res.json(error);
  }
}

const getAllPostsInGroup = async (req, res) => {
  try {
    const posts = await groupService.getAllPostsInGroup(req.params.groupId);
    res.json(posts);
  } catch (error) {
    res.json(error);
  }
}

export default {
  getAllGroups,
  joinGroup,
  getGroupById,
  createGroup,
  createPostInGroup,
  getAllPostsInGroup
}