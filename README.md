# Hi team

I have created the basic setup for our webapp.
Right now it is a cleaned up React app (made with Vite, plain JavaScript) and I have connected it to Back4App and set it up with github pages.
You can find the webpage right here:
https://tid-group-jnlm.github.io/WhatsForDinner/

I also added a favicon :-))

## Get it running

You need Node 20, 22 or 24. Check with `node --version`.

```
git clone https://github.com/TID-Group-JNLM/WhatsForDinner.git
cd WhatsForDinner
npm install
npm run dev
```

Then open the link it prints (normally http://localhost:5173/).

## Before your first commit

Check that `git config user.email` shows an email your GitHub account knows. And only ONE email
Otherwise your commits are not linked to you.

## Back4App

We share one Back4App app. The connection is set up in `src/main.jsx`, so you don't have to do anything to use it.

Send me the email you use for Back4App and i will add you so you can see the database in the dashboard.

Important: never put the Master key in the code or in this repo! :-)))

## Cloud Code

Our Cloud Code is in `back4app/cloud/main.js`. To upload it to Back4App:

```
curl https://raw.githubusercontent.com/back4app/parse-cli/back4app/installer.sh | sudo /bin/bash
b4a configure accountkey
cd back4app
b4a new
mv back4app/.parse.* . && rmdir back4app
b4a deploy
```

You get the account key in Back4App under Account Keys. In `b4a new` choose our existing app, call the directory `back4app` and pick (b)lank. The `mv` line moves the files it makes up next to `cloud/`. You only need `b4a new` the first time. Ask me before you deploy, so we don't overwrite each other.
