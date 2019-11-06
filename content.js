function expandAllComments() {
    for (let link of document.getElementsByClassName("TaskStoryFeed-expandLink")) {
        if (link.innerHTML != "Hide Earlier Comments") {
            link.click();
        }
    };
    const interval = setInterval(function () {
        for (let comment of document.getElementsByClassName("TruncatedRichText-expand")) {
            comment.click();
        };
        if (document.getElementsByClassName("TruncatedRichText-expand").length == 0) {
            clearInterval(interval);
        }
    }, 100);
}

// https://stackoverflow.com/questions/38881301/observe-mutations-on-a-target-node-that-doesnt-exist-yet
function waitForAddedNode(params) {
    new MutationObserver(function(mutations) {
        var el = document.querySelector(params.selector);
        if (el) {
            this.disconnect();
            params.done(el);
        }
    }).observe(document, {
        subtree: !!params.recursive,
        childList: true,
    });
}

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === "initializeExpandAction") {
            waitForAddedNode({
                selector: '.SingleTaskPane',
                recursive: true,
                done: function(el) {
                    console.log("Expanding!");
                    expandAllComments();
                }
            });
        }
    }
);