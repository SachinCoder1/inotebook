const express = require('express')
const router = express.Router()
const fetchUser = require('../middleware/authdata')
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator');

router.get('/fetchallnotes', fetchUser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id })
  res.json(notes)

})

router.post('/addnote', fetchUser, [
  body('title', 'Enter a valid title').isLength({ min: 5 }),
  body('description', 'Enter a valid description').isLength({ min: 5 }),
  body('tag', 'Enter a valid tag'),
], async (req, res) => {
  const { title, description, tag } = req.body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const note = new Notes({
    title, description, tag, user: req.user.id
  })
  const saveNote = await note.save()
  res.json(saveNote)
})

// update

router.put('/updatenote/:id', fetchUser, async (req, res) => {
  const { title, description, tag } = req.body
  const newNote = {}
  if (title) { newNote.title = title }
  if (description) { newNote.description = description }
  if (tag) { newNote.tag = tag }

  let note = await Notes.findById(req.params.id)
  if (!note) { return res.status(401).send('Not Found') }
  if (note.user.toString() !== req.user.id) { return res.status(401).send('Not Found') }
  note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
  res.json(note)
})
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
  // const { title, description, tag } = req.body

  let note = await Notes.findById(req.params.id)
  if (!note) { return res.status(401).send('Not Found') }
  if (note.user.toString() !== req.user.id) { return res.status(401).send('Not Found') }
  note = await Notes.findByIdAndDelete(req.params.id)
  res.json("The item has been succesfully deleted")
})


module.exports = router