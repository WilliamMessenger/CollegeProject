const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('index', {
    pageTitle: 'Home',
    js: [
      "/public/js/index.js"
    ]
  })
})

router.get('/college', (req, res) => {
  res.render('college', {
    pageTitle: 'College',
    js: [
      "/public/js/index.js"
    ]
  })
})

router.get('/example-work', (req, res) => {
  res.render('example-work', {
    pageTitle: 'Example Work',
    js: [
      "/public/js/index.js"
    ]
  })
})

router.get('/faqs', (req, res) => {
  res.render('faqs', {
    pageTitle: 'FAQs',
    js: [
      "/public/js/index.js"
    ]
  })
})

router.get('/specimen-papers', (req, res) => {
  res.render('specimen-papers', {
    pageTitle: 'Specimen Papers',
    js: [
      "/public/js/index.js"
    ]
  })
})

router.get('/summary', (req, res) => {
  res.render('summary', {
    pageTitle: 'Summary',
    js: [
      "/public/js/index.js"
    ]
  })
})

router.get('/syllabus', (req, res) => {
  res.render('syllabus', {
    pageTitle: 'Syllabus',
    js: [
      "/public/js/index.js"
    ]
  })
})

router.get('/videos', (req, res) => {
  res.render('videos', {
    pageTitle: 'Videos',
    js: [
      "/public/js/index.js"
    ]
  })
})

router.get('/work', (req, res) => {
  res.render('work', {
    pageTitle: 'Work',
    js: [
      "/public/js/index.js"
    ]
  })
})

module.exports = router;