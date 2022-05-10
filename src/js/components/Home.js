import { templates, select } from '../settings.js';
//import Player from './Player.js';

class Home {
  constructor(element, data) {
    const thisHome = this;
    thisHome.initData(data);
    thisHome.render(element, data);
    //thisHome.initWidgets(thisHome.dom.players, data);
  }

  initData(data) {
    const thisHome = this;

    thisHome.data = data;
  }
  render(element, songs) {
    const thisHome = this;

    thisHome.dom = {};
    thisHome.dom.songWrapper = element;

    for (let song of songs) {
      const songId = song.id;
      console.log(songId);
      const songTitle = song.title;
      const songCategories = song.categories;
      const songRanking = song.ranking;
      const songFileName = song.filename;
      const songFileNameLowerCase = songFileName.toLowerCase();

      // get author
      const nameSongAndAuthor = songFileNameLowerCase
        .replaceAll('_', ' ')
        .replace('-', '')
        .replace('.mp3', '');

      const songAuthor = nameSongAndAuthor.replace(songTitle, '').trim();
      // const songAuthor = authors.find(author => author.id === song.author).fullName
      console.log(songAuthor);

      const songData = {
        songId,
        songTitle,
        songAuthor,
        songCategories,
        songRanking,
        songFileName,
      };
      console.log(songData);
      const generatedHTML = templates.player(songData);

      thisHome.dom.songWrapper.innerHTML += generatedHTML;
      console.log(thisHome.dom.songWrapper.innerHTML);
    }

    GreenAudioPlayer.init({
      selector: '.player', // inits Green Audio Player on each audio container that has class "player"
      stopOthersOnPlay: true,
    });

    thisHome.pages = document.querySelector(select.containerOf.pages).children;
    thisHome.navLinks = document.querySelectorAll(select.nav.links);

    const idFromHash = window.location.hash.replace('#', '');

    let pageMatchingHash = thisHome.pages[0].id;

    for (let page of thisHome.pages) {
      console.log({ page });
      if (page.id == idFromHash) {
        pageMatchingHash = page.id;
        break;
      }
    }

    thisHome.activatePage(pageMatchingHash);

    /*thisHome.dom.players = thisHome.dom.wrapper.querySelectorAll(
      select.home.players
    );
    console.log(thisHome.dom.players);*/
  }

  activatePage(pageId) {
    const thisHome = this;

    // add class 'active to matching pages, remove from non-matching
    for (let page of thisHome.pages) {
      page.classList.toggle('active', page.id == pageId);
    }
  }
  /*initWidgets(elements) {
    const thisHome = this;

    for (let element of elements) {
      thisHome.player = new Player(element);
    }
  }*/
}

export default Home;
