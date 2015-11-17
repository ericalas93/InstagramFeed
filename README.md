# InstagramFeed

A web app to pull Instagram feed posted based on a user submitted hashtag.
Demo can be viewed [here][1].

##Installation
----------
Simply make a clone of the repo
```
git clone https://github.com/ericalas93/InstagramFeed.git
npm install
```
and begin modifying if you want to change things around. 
I have left the both the build and bundled version of JavaScript and CSS (SCSS),  to allow for editing of the source file or to simply upload to your server and use for your purpose.


##Usage

----------
###Developers
Clone the repo and begin editting `src/build/app.js` file. The background canvas is stored inside the `src/build/starrynight.js` file. I am using Grunt along with Browserify, BrowserSync, and SASS. To edit styling edit the `styles/scss/style.scss` file.

###Users
Anyone is free to use this application for their personal usage. I built this for my brother to use during his wedding to allow guests to post pictures on Instagram and show the feed on a projector screen. Of course you are free to use for any other purpose. A starry night background was used as his wedding theme was based on Vincent Van Gogh's *The Starry Night*. 

Upload the following files to your host/server:
```
index.html
src/js/bundle.js
styles/css/style.css
```
To customize the background or other aspects of the webapp requires some knowledge of development, contact me [here][2] for assistance. 


[1]: http://www.insta.ericalas.com
[2]:http://www.ericalas.com/contact/