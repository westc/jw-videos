const fs = require('fs');
const path = require('path');
const remote = require('remote');

const APP_BASE_PATH = path.dirname(require.main.filename);
const APP_SETTINGS_PATH = path.join(APP_BASE_PATH, 'settings.json');

var isPlayingAll = false, isPlaying = false, videoFiles = [], randomOrder = [], lastIndexInRandom = 0;

var appSettings = {
  _: (function() {
    var data = { code: '' };
    try {
      data = readFileJSON(APP_SETTINGS_PATH);
    }
    catch (e) {
      console.error(e.name + '\n' + e.message + '\n' + e.stack);
    }
    return data;
  })(),
  set: function(keyOrValues, value) {
    var isOneValue = JS.typeOf(keyOrValues, 'String'), data = this._;
    if (isOneValue) {
      data[keyOrValues] = value;
    }
    else {
      JS.walk(keyOrValues, function(value, key) {
        data[key] = value;
      });
    }
    this.save();
    return isOneValue ? value : keyOrValues;
  },
  get: function(key, opt_defaultValue) {
    return JS.has(this._, key) ? this._[key] : opt_defaultValue;
  },
  save: JS.debounce(function() {
    fs.writeFileSync(APP_SETTINGS_PATH, JSON.stringify(this._), 'utf8');
  }, 500)
};

function readFileJSON(path) {
  fs.openSync(path, 'r+');
  return JSON.parse(fs.readFileSync(path, 'utf8'));
}

var sleepMouse = JS.debounce(function() {
  if (isPlaying) {
    $('body').addClass('no-mouse');
  }
}, 1000);

function scoreTextSearch(searchTerm, arrRecords) {
  // Make sure that each record is an array of texts to be searched.
  var arrayOfArrays = arrRecords.slice().map(function(record) {
    return JS.toArray(record).slice().map(function(text) {
      return JS.deburr(text);
    });
  });

  // Zero out the scores to start off.
  var scores = JS(arrayOfArrays).slice().fill(0).$;

  // Loop through all search terms modifying the scores appropriately.
  var trash = JS.deburr(searchTerm).replace(
    /(?:(\+)|(-))?(?:"(.+?)"|([^\s,.:;"\[\]\{\}\!\?\xA1\xBF]+))/g,
    function(keyword, mustHave, hide, quoted, normal) {
      var rgx = new RegExp(JS.quoteRegExp(quoted || normal).replace(/\\\*/g, "\\S*").replace(/^|$/g, '\\b').replace(/\s+/, '\\b\\s+\\b'), 'i');
      arrayOfArrays.forEach(function(arrayOfTexts, i) {
        if (scores[i] > -Infinity) {
          JS.walk(arrayOfTexts, function(text) {
            if (rgx.test(text) ? hide : mustHave) {
              this(scores[i] = -Infinity);
            }
            else if (rgx.test(text) == !hide) {
              scores[i]++;
            }
          });
        }
      });
    }
  );

  // If no search terms were found just return scores of 1 for all records.
  if (trash.indexOf('undefined') < 0) {
    JS.fill(scores, 1);
  }

  // Return the scores as an array where positive numbers should be shown.
  return scores;
}

function compareStrNumArray(arrA, arrB) {
  for (var a, b, i = 0, l = arrA.length, l2 = arrB.length; i < l; i++) {
    a = arrA[i];
    b = i < l2 ? arrB[i] : '';
    if (a != b) {
      return a < b ? -1 : 1;
    }
  }
  return l - l2;
}

function processStrNum(v) {
  var arr = [];
  v.replace(/(\d+)|\D+/g, function(m, isDigit) {
    arr.push(isDigit ? parseInt(m, 10) : m);
  });
  return arr;
}

function playNextVideo() {
  // show next valid video
  var visibleIndex = JS.map($('.video-div-wrap'), function(elem) {
    return !$(elem).is('.hidden');
  });
  JS.walk(
    randomOrder.slice(lastIndexInRandom + 1).concat(randomOrder.slice(0, lastIndexInRandom + 1)),
    function(file, i) {
      if (visibleIndex[videoFiles.indexOf(file)]) {
        $('#videoModal video')
          .one('loadedmetadata', function() {
            this.play();
          })
          .prop('src', file.path.replace(/\?/g, '%3F'));
        lastIndexInRandom = randomOrder.indexOf(file);
        return this();
      }
    }
  );
}

function showVids(files) {
  var vidDivs = files.map(function(file) {
    var div = JS.dom({
      _: 'div',
      cls: 'video-div-wrap',
      $: [{
        _: 'table',
        cls: 'video-table-wrap',
        onclick: JS.partial(showVideo, file),
        border: 0,
        cellPadding: 0,
        cellSpacing: 0,
        $: [{
          _: 'tr',
          $: [
            { _: 'td', cls: 'video-thumbnail' },
            {
              _: 'td',
              cls: 'video-details',
              $: [
                { _: 'div', cls: 'video-title', text: file.vid.title }
              ]
            }
          ]
        }]
      }]
    });
    showThumbnail(file, div);
    return div;
  });
  $('#body').html('').append(vidDivs);
}

function showVideo(file) {
  lastIndexInRandom = randomOrder.indexOf(file);

  var vidElem = JS.dom({
    _: 'video',
    src: file.path.replace(/\?/g, '%3F'),
    controls: true,
    onended: function() {
      if (isPlayingAll) {
        incrementVideoCount();
        playNextVideo();
      }
      else {
        $('#videoModal').modal('hide');
      }
    }
  });
  $('#videoModal').modal('show').find('.modal-body').html('').append(vidElem);
  vidElem.play();
  vidElem.webkitRequestFullScreen();
  isPlaying = true;
}

function showThumbnail(file, div) {
  function callback() {
    $('.video-thumbnail', div).append(JS.dom({
      _: 'img',
      src: path.join(path.dirname(file.path), '.jw-videos', file.vid.name + '.png').replace(/\?/g, '%3F')
    }));
  }

  if (file.vid.has_thumbnail) {
    callback();
  }
  else {
    generateMetaData(file, callback);
  }
}

var generateMetaData = (function(argsStack, blocked) {
  return function(file, callback) {
    if (!blocked) {
      blocked = true;
      var vidElem = JS.dom({
        _: 'video',
        src: file.path.replace(/\?/g, '%3F'),
        onloadedmetadata: function(e) {
          this.currentTime = this.duration * 3 / 4;
          file.vid.duration = this.duration;
        },
        onseeked: function(e) {
          console.log('onseeked', JSON.stringify(new Date));
          var canvas = JS.dom({
            _: 'canvas',
            height: vidElem.videoHeight,
            width: vidElem.videoWidth
          });
          var ctx = canvas.getContext('2d');
          ctx.drawImage(vidElem, 0, 0, canvas.width, canvas.height);
          var buf = new Buffer(canvas.toDataURL().replace(/^data:image\/\w+;base64,/, ""), 'base64');
          fs.writeFileSync(path.join(path.dirname(file.path), '.jw-videos', file.vid.name + '.png'), buf);
          file.vid.has_thumbnail = true;
          file.saveIndex();
          callback();
          blocked = false;
          if (argsStack.length) {
            generateMetaData.apply(0, argsStack.pop());
          }
        }
      });
    }
    else {
      argsStack.push(arguments);
    }
  };
})([], false);

function refreshIndex(dirPath, files) {
  var jwvPath = path.join(dirPath, '.jw-videos'),
      indexPath = path.join(jwvPath, 'index.json');
  if (!fs.existsSync(jwvPath)) {
    fs.mkdirSync(jwvPath);
  }
  if (!fs.existsSync(indexPath)) {
    fs.writeFileSync(indexPath, '{}', 'utf8');
  }

  var index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
  index.vids = JS.pull(index, 'vids', []);

  var filesByName = files.reduce(function(carry, file) {
    carry[path.basename(file.path)] = file;
    return carry;
  }, {});

  // Remove any thumbnails and vid records that no longer exist
  var vidsNotFoundByName = [];
  index.vids = index.vids.filter(function(vid) {
    if (JS.has(filesByName, vid.name)) {
      var file = filesByName[vid.name];
      delete filesByName[vid.name];
      file.vid = updateVid(vid, file);
      return true;
    }
    vidsNotFoundByName.push(vid);
  });

  // Add all videos to vids that are not already included.
  JS.walk(filesByName, function(file, fileName) {
    // Check to see if the file name was changed by matching against file size and birth time.
    var result = JS.walk(vidsNotFoundByName, function(vid, i) {
      if (vid.birth_time == file.stat.birthtime.getTime() && vid.size == file.stat.size) {
        file.vid = updateVid(vid, file);
        vidsNotFoundByName.splice(i, 1);
        return this(vid);
      }
    });

    // If file name wasn't changed add it as a new vid.
    if (JS.typeOf(result, 'Number')) {
      result = [file.vid = updateVid({
        title: fileName.replace(/(?!^)\.\w+$/, ''),
        show_time: null,
        duration: null,
        has_thumbnail: false,
        keywords: [],
        slides: []
      }, file)];
    }

    index.vids.push(result[0]);
  });

  files.forEach(JS(JS.set).setArgs({
    1: 'saveIndex',
    2: JS.callReturn(function() {
      fs.writeFileSync(indexPath, JSON.stringify(index), 'utf8');
    })
  }).cap(1).$);

  return { path: indexPath, index: index };
}

function updateVid(vid, file) {
  if (vid.has_thumbnail) {
    try {
      var oldThumbnailPath = path.join(path.dirname(file.path), '.jw-videos', vid.name + '.png');
      if (!fs.existsSync(oldThumbnailPath)) {
        throw 0;
      }
      var newThumbnailPath = path.join(path.dirname(file.path), '.jw-videos', path.basename(file.path) + '.png');
      fs.renameSync(oldThumbnailPath, newThumbnailPath);
    }
    catch(e) {
      vid.has_thumbnail = false;
    }
  }
  return JS.extend(vid, {
    name: path.basename(file.path),
    birth_time: file.stat.birthtime.getTime(),
    size: file.stat.size
  });
}

function recurseDirSync(currentDirPath, depthLeft, opt_filter) {
  depthLeft--;

  var result = {
    isFile: false,
    path: currentDirPath,
    stat: fs.statSync(currentDirPath),
    files: []
  };

  fs.readdirSync(currentDirPath).forEach(function (name) {
    var filePath = path.join(currentDirPath, name),
      stat = fs.statSync(filePath),
      isFile = stat.isFile();
    if ((isFile || stat.isDirectory()) && (!opt_filter || opt_filter(filePath, isFile, stat))) {
      result.files.push((isFile || !depthLeft) ? { isFile: isFile, path: filePath, stat: stat } : recurseDirSync(filePath, depthLeft, opt_filter));
    }
  });
  return result;
}

function loadFromPrevious() {
  var last = appSettings.get('last', {});
  var lastDirPath = JS.pull(last, 'path', undefined);
  if (lastDirPath) {
    if (!setDirPath(lastDirPath)) {
      appSettings.set('last', {});
    }
  }
}

function setDirPath(dirPath, clearHistory) {
  var pathExists = fs.existsSync(dirPath);
  if (pathExists) {
    videoFiles = [];
    JS.unnest(
      [recurseDirSync(dirPath, Infinity)],
      function(dir, index, add, recurse) {
        if (dir.files) {
          var vidsAtStart = videoFiles.length;

          dir.files.forEach(function(file) {
            if (file.isFile && file.stat.size >= 1e6 && /\.mp4$/i.test(file.path)) {
              videoFiles.push(file);
            }
          });

          // Create .jw-videos directory if this directory has MP4s.
          if (vidsAtStart < videoFiles.length) {
            refreshIndex(dir.path, videoFiles.slice(vidsAtStart));
          }

          recurse(dir.files);
        }
      }
    );

    videoFiles = JS.sort(
      videoFiles,
      function(arrA, arrB) {
        for (var a, b, i = 0, l = arrA.length, l2 = arrB.length; i < l; i++) {
          a = arrA[i];
          b = i < l2 ? arrB[i] : '';
          if (a != b) {
            return a < b ? -1 : 1;
          }
        }
        return l - l2;
      },
      function(v) {
        var arr = [];
        v.path.toUpperCase().replace(/(\d+)|\D+/g, function(m, isDigit) {
          arr.push(isDigit ? parseInt(m, 10) : m);
        });
        return arr;
      }
    );

    randomOrder = JS.randomize(videoFiles);

    showVids(videoFiles);

    if (clearHistory) {
      appSettings.set('last', { path: dirPath, history: [] });
    }
  }
  return pathExists;
}

function showTimesShown() {
  var timesShown = JS.get(appSettings.get('last'), 'history', []).length;
  $('#shownMsg').text(JS.sub('You have shown {0?{0}:one} video{0?s:}.', [timesShown]));
}

function incrementVideoCount() {
  var vidElem = $('#videoModal video')[0];
  if (vidElem && vidElem.currentTime / vidElem.duration >= 0.75) {
    var last = appSettings.get('last');
    last.history.push({
      time: (new Date).getTime(),
      path: randomOrder[lastIndexInRandom].path
    });
    appSettings.set('last', last);
  }
}

$(function() {
  $('body').on('mousemove', function() {
    $('body').removeClass('no-mouse');
    sleepMouse();
  });

  $('#formFilter').on('submit', function(e) {
    e.preventDefault();
  });

  $('#linkRndVid').click(function() {
    $(JS.random($('.video-div-wrap:not(.hidden) .video-table-wrap').toArray())).click();
  });

  $("#linkSetDir").click(function() {
    remote.dialog.showOpenDialog({
      properties: ['openDirectory']
    }, function(paths) {
      if (paths) {
        setDirPath(paths[0], true);
      }
    });
  });

  $('#linkPlayAll').click(function() {
    isPlayingAll = true;
    $('#linkRndVid').click();
  });

  $('#linkDetails').click(function() {
    $('#detailsModal').modal('show');
    showTimesShown();
  });

  $('#detailsModal .btn-reset').click(function() {
    var last = appSettings.get('last');
    last.history = [];
    appSettings.set('last', last);
    showTimesShown();
  });

  $('#videoModal')
    .on('hide.bs.modal', incrementVideoCount)
    .on('hidden.bs.modal', function() {
      isPlayingAll = isPlaying = false;
      $('#videoModal video').remove();
    });

  $('#txtSearch').on('keyup keypress', JS.debounce(function() {
    var searchTerm = this.value;
    var videoTexts = videoFiles.map(function(file) {
      return file.vid.name;
    });
    var elems = $('.video-div-wrap');
    scoreTextSearch(searchTerm, videoTexts).forEach(function(score, i) {
      $(elems[i])[score > 0 ? 'removeClass' : 'addClass']('hidden');
    });
  }, 200));

  loadFromPrevious();
});
