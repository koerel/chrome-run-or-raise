chrome.tabs.onCreated.addListener(async (tab) => {
  const urlString = tab.pendingUrl
  if (!urlString.startsWith('http://run-or-raise')) {
    return
  }
  await chrome.tabs.remove(tab.id)
  const [trigger, titleString, url] = urlString.split('#')
  const title = titleString.replace('_', ' ')
  const tabs = await chrome.tabs.query({})
  const found = tabs.filter(t => (t.title.includes(title) || t.url.includes(title)))
  if (found.length) {
    await chrome.tabs.highlight({tabs: found[0].index})
  } else {
    await chrome.tabs.create({url})
  }
})