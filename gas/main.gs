function doGet() {
  const RepositoryAddress = 'https://api.github.com/repos/sekiya9311/CplusplusAlgorithmLibrary/contents';
  const AccessToken = '見せられないよ!';
  const url = RepositoryAddress + '/?access_token=' + AccessToken;
  var res = JSON.parse(UrlFetchApp.fetch(url).getContentText());
  var tree = [];

  for (var i = 0; i < res.length; i++) {
    var node = res[i];
    var ret = makeTree(node, AccessToken);
    if (ret) {
      tree.push(ret);
    }
  }
  var out = ContentService.createTextOutput();
  out.setContent((JSON.stringify(tree)));
  out.setMimeType(ContentService.MimeType.JSON);
  return out;
}

function makeTree(data, AccessToken) {
  var node = {
    name: data.name,
    content: '',
    link: data.url,
    nodes: []
  };
  if (data.type === 'dir') {
    if (data.name === 'test') {
      // for test dir
      return null;
    }
    const url = data.url + '&' + 'access_token=' + AccessToken;
    var res = JSON.parse(UrlFetchApp.fetch(url).getContentText());
    for (var i = 0; i < res.length; i++) {
      var nxtNode = res[i];
      var ret = makeTree(nxtNode, AccessToken);
      if (ret) {
        node.nodes.push(ret);
      }
    }
  } else if (data.type === 'file' && data.name.lastIndexOf('.cpp') === data.name.length - 4) {
    node.content = UrlFetchApp.fetch(data.download_url).getContentText();
  } else {
    return null;
  }
  return node;
}
