//Add context menu item
browser.menus.create({
	id: "blockSubreddit",
	title: "Block subreddit",
	contexts: ["link"]
});

//Add listener for context menu
browser.menus.onClicked.addListener((info,tab)=>{
	switch(info.menuItemId){
		case "blockSubreddit":
			//block a subreddit from a link
			let subreddit = info.linkUrl.toLowerCase();
			subreddit = subreddit.match(/\/r\/[^/\n]+/g);	//Extract the subreddit name from the link
			if(subreddit.length < 1) return;
			subreddit = subreddit[0].substr(3);
			//Get current list of blocked subreddits
			browser.storage.sync.get("blockList").then((item)=>{
				//Add new subreddit to the list
				let newBlockList = [...item.blockList]	//Create copy of current blocklist
				newBlockList.push(subreddit);
				newBlockList.sort();
				browser.storage.sync.set({blockList:newBlockList});	//Update the block list
				//Reload the page
				browser.tabs.reload(tab.id);
			},(err)=>{});
			break;
	}
});
