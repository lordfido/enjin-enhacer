/******************************************************/
/** Enjin Enhacer *************************************/
/** Author: ImperdibleSoft ****************************/
/** Website: http://www.imperdiblesoft.com ************/
/******************************************************/
/*
  INLINE SCRIPT
  <script
    src="https://lordfido.github.io/enjin-enhacer/enjin-enhacer.js"
    id="enjin-enhacer"
    region="us"
    realm="quel'thalas"
    guild="Iterûm"
  ></script>

  DYNAMIC SCRIPT
  var enjinEnhacer = document.createElement("script");
  enjinEnhacer.id="enjin-enhacer"
  enjinEnhacer.src = "https://lordfido.github.io/enjin-enhacer/enjin-enhacer.js";
  enjinEnhacer.region = "us";
  enjinEnhacer.realm = "quel'thalas";
  enjinEnhacer.guild = "Iterûm";
  document.head.appendChild(enjinEnhacer);
*/

(function() {
  var debug = false;
  var log = function(param) {
    if (debug) {
      console.log(param);
    }
  }

  var Enhacer = function() {
    var elem = document.getElementById('enjin-enhacer');
    this.region = elem.region;
    this.realm = elem.realm;
    this.guild = elem.guild;

    var that = this;

    // Point where everything is gonna be mount
    var URLs = {
      styles: 'https://lordfido.github.io/enjin-enhacer/enjin-enhacer.css',
      enhacer: 'https://lordfido.github.io/enjin-enhacer/enjin-enhacer.js',
      repo: 'https://www.github.com/lordfido/enjin-enhacer/'
    };

    this.parseRealm = function(realm) {
      return realm
        .replace("'", '-')
        .replace(" ", '-')
        .toLowerCase();
    }

    // Add enhaced CSS
    this.loadNewStyles = function() {
      var enhacedStyles = document.createElement('link');
      enhacedStyles.href = URLs.styles;
      enhacedStyles.rel = 'stylesheet';
      enhacedStyles.type = 'text/css';
      enhacedStyles.id = 'enjin-ehacer-css';

      document.head.appendChild(enhacedStyles);
      log('enhacedStyles has been loaded.');
    }
    
    // Remove 4 layers that are blocking Flash elements to be clickable (and playable) on website's header
    this.unblockFlashHeader = function() {
      var elem;
      elem = document.querySelector('.special_container .m_header .tl');
      if (elem && elem.remove) elem.remove();

      elem = document.querySelector('.special_container .m_header .tr');
      if (elem && elem.remove) elem.remove();

      elem = document.querySelector('.special_container .m_header .bl');
      if (elem && elem.remove) elem.remove();

      elem = document.querySelector('.special_container .m_header .br');
      if (elem && elem.remove) elem.remove();
    }
    
    // Improve "descriptive titles" for enjin microtags
    this.increaseMicroTags = function() {
      var microTags = document.getElementsByClassName('icon_microtag');
      for (var x in microTags) {
        var tag = microTags[x];
        if (tag.title == 'a') { tag.title = 'Administrador'; }
        if (tag.title == 'o') { tag.title = 'Online'; }
      }
    }
    
    // Place a link announcing Enjin Enhacer
    this.enhacedLink = function() {
      var footer = document.querySelector('#page-footer .left');
      footer.innerHTML = `This website is using <a href="${URLs.repo}" target="_blank">Enjin Enhacer</a>`;
    }

    // Complete wowprogress.com link to our guild's profile
    this.enhaceWowprogressLink = function() {
      var wowprogressLink = document.querySelector('.wowprogress_link a');
      if (wowprogressLink) {
        wowprogressLink.href += `guild/${that.region}/${that.parseRealm(that.realm)}/${that.guild}`;
        wowprogressLink.target = '_blank';
      }
    }
  };

  // Create new tutorial
  var enjinEnhacer = new Enhacer();

  // Instantly set the CSS files on <head></head>
  enjinEnhacer.loadNewStyles();

  // Recursive function, wait until <body></body> is available
  var verifyBodyIsMounted = function() {

    // If body is available, so we can mount things on it
    if (document.body !== null && typeof document.body !== undefined) {
      enjinEnhacer.unblockFlashHeader();
      enjinEnhacer.increaseMicroTags();
      enjinEnhacer.enhacedLink();
      enjinEnhacer.enhaceWowprogressLink();

    // If body is not available
    } else {

      // Ask again in 500ms
      setTimeout(function() {
        verifyBodyIsMounted();
      }, 500);
    }
  };
  verifyBodyIsMounted();
})();
