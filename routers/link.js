const fetch = require('node-fetch');
const { JSDOM } = require('jsdom');
const express = require('express');

const router = express.Router();

router.post('/', (req, res, next) => {
  (async () => {
    try {
      const fetched = await fetch(req.body.url);
      const page = await fetched.text();
      const dom = new JSDOM(page);
      const document = dom.window.document;

      let selected = document.querySelectorAll('a');
      let links = [];
      for (let i = 0; i < selected.length; i++) {
        if (selected[i].textContent && !selected[i].href.startsWith('about')) {
          links.push({
            name: selected[i].textContent,
            href: selected[i].href
          });
        }
      }

      res.status(200).render('link', {title: 'Links', links});
    } catch (e) {
      console.log(e);
      res.status(404).send('An error occured');
    }
  })();
});

module.exports = router;
