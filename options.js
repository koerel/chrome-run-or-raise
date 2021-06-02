function saveOptions () {
  const url = document.getElementById('url').value
  chrome.storage.sync.set({
    prefixUrl: url
  }, function () {
    const status = document.getElementById('status')
    status.textContent = 'Options saved.'
    setTimeout(function () {
      status.textContent = ''
    }, 750)
  })
}

function restoreOptions () {
  chrome.storage.sync.get({
    prefixUrl: 'http://run-or-raise'
  }, function (items) {
    document.getElementById('url').value = items.prefixUrl
  })
}
document.addEventListener('DOMContentLoaded', restoreOptions)
document.getElementById('save').addEventListener('click', saveOptions)
